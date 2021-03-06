import hueApi from "node-hue-api";
import cliProgress from "cli-progress";
import chalkAnimation from "chalk-animation";
import fs from "fs";
import readline from "readline";

class Hue {
    constructor() {
        this.hue = hueApi.v3;
        this.hueUser = null;
        this.GroupLightState = this.hue.model.lightStates.GroupLightState;
        this.bridgeIpAddress = "";
    }

    async discoverBridgeIpAddress(timeout) {
        const parseSearchResult = (result) => {
            if (typeof result !== "undefined" && result.length > 0) {
                if (result[0].hasOwnProperty("ipaddress")) {
                    return result[0].ipaddress;
                }
            }
            return null;
        };

        const upnpSearch = this.hue.discovery.upnpSearch(timeout).then(
            (result) => {
                const ipAddress = parseSearchResult(result);
                if (ipAddress) {
                    throw ipAddress;
                }
                return Error("UPnP search failed");
            },
            (error) => Error("UPnP search failed")
        );
        const nupnpSearch = this.hue.discovery.nupnpSearch().then(
            (result) => {
                const ipAddress = parseSearchResult(result);
                if (ipAddress) {
                    throw ipAddress;
                }
                return Error("N-UPnP search failed");
            },
            (error) => Error("N-UPnP search failed")
        );

        return Promise.all([upnpSearch, nupnpSearch]).then(
            (errors) => {
                throw Error("N-UPnP search and N-UPnP search failed");
            },
            (results) => {
                this.bridgeIpAddress = results;
                return results;
            }
        );
    }

    async createUser(ipAddress, appName, deviceName) {
        const unauthenticatedUser = await this.hue.api
            .createLocal(ipAddress)
            .connect();

        const timeLimit = 30; // seconds
        console.log("\n\n");
        const pressLinkPrompt = chalkAnimation.rainbow(
            "Press the link button on the Hue Bridge now.\n"
        );
        const progressBar = new cliProgress.SingleBar(
            {
                format: "[{bar}] Time left: {eta}s",
                clearOnComplete: true,
                hideCursor: true
            },
            cliProgress.Presets.shades_classic
        );
        progressBar.start(timeLimit, 0);

        let elapsedTime = 0;

        const cleanup = () => {
            progressBar.stop();
            pressLinkPrompt.stop();
            console.log("\n");
        };

        return new Promise((resolve, reject) => {
            setInterval(() => {
                if (elapsedTime === timeLimit) {
                    reject(
                        Error("Link button not pressed within the time limit")
                    );
                }
                progressBar.increment();
                elapsedTime++;

                unauthenticatedUser.users.createUser(appName, deviceName).then(
                    (user) => {
                        resolve(user);
                    },
                    () => {}
                );
            }, 1000);
        }).then(
            (user) => {
                cleanup();
                console.log("\n\nNew user created".green);
                console.log("Username: " + user.username);
                console.log("PSK for Entertainment API: " + user.clientkey);
                return user;
            },
            (error) => {
                cleanup();
                console.log("\n\nLink button was not pressed".red);
                if (error) {
                    throw error;
                }
            }
        );
    }

    async getUserFromFile() {
        const filePath = __dirname + "\\.hue.config";

        return new Promise((resolve, reject) => {
            fs.access(filePath, fs.F_OK, async (error) => {
                if (!error) {
                    const readInterface = readline.createInterface({
                        input: fs.createReadStream(filePath),
                        output: process.stdout,
                        terminal: false,
                        crlfDelay: Infinity
                    });

                    const fileContent = [];
                    for await (const line of readInterface) {
                        fileContent.push(line);
                    }

                    readInterface.close();
                    readInterface.removeAllListeners();
                    try {
                        const user = Hue.parseUserFileContent(
                            filePath,
                            fileContent
                        );
                        resolve(user);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(Error("File " + filePath + " does not exist"));
                }
            });
        });
    }

    async createUserFile(user) {
        const { username, clientkey } = user;

        const filePath = __dirname + "\\.hue.config";
        const fileContent =
            "Username: " +
            username +
            "\n" +
            "EntertainmentAPIKey: " +
            clientkey;

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, fileContent, (error) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }

    static parseUserFileContent(filePath, fileContent) {
        if (fileContent.length == 2) {
            const usernameParsed = fileContent[0].split(" ");
            const entertainmentAPIKeyParsed = fileContent[1].split(" ");

            if (
                usernameParsed.length == 2 &&
                entertainmentAPIKeyParsed.length == 2
            ) {
                return {
                    username: usernameParsed[1],
                    entertainmentAPIKey: entertainmentAPIKeyParsed[1]
                };
            }
        }

        throw Error("File " + filePath + " is invalid");
    }

    async linkWithHueBridge(appName, deviceName) {
        let ipAddress;
        try {
            ipAddress = await this.discoverBridgeIpAddress(10000);
            console.log(
                ("Found Hue bridge at IP address: " + ipAddress + "\n").green
            );
        } catch (error) {
            throw Error(
                "Failed to locate Hue bridge IP address by UPnP/N-UPnP search"
            );
        }

        let user;
        try {
            user = await this.getUserFromFile();
            console.log("Hue user data retreived from config file");
        } catch (error) {
            console.log("No valid hue.config file found - creating new user");
            try {
                user = await this.createUser(ipAddress, appName, deviceName);
                try {
                    await this.createUserFile(user);
                } catch (error) {
                    throw error;
                }
            } catch (error) {
                throw Error(
                    "Failed to create or locate valid user data - Hue functions will not work"
                );
            }
        }

        return new Promise(async (resolve, reject) => {
            try {
                const hueUser = await this.hue.api
                    .createLocal(ipAddress)
                    .connect(user.username);
                this.hueUser = hueUser;
                resolve(hueUser);
            } catch (error) {
                reject(error);
            }
        });
    }

    async testBridgeConnection() {
        return new Promise((resolve) => {
            this.hueUser.configuration
                .getConfiguration()
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                });
        });
    }

    async getGroups() {
        return new Promise((resolve, reject) => {
            const hueGroups = [];
            this.hueUser.groups
                .getAll()
                .then((groups) => {
                    groups.forEach((group) => {
                        // Ignore the Group 0 instance
                        if (group._data["id"] !== 0) {
                            hueGroups.push(group._data);
                        }
                    });
                    resolve(hueGroups);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    async getGroupState(groupName) {
        return new Promise((resolve, reject) => {
            this.hueUser.groups
                .getGroupByName(groupName)
                .then((group) => {
                    resolve(group[0]._data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    async setGroupState(groupId, state) {
        const newState = new this.GroupLightState();
        state.on !== undefined && newState.on(state.on);
        state.bri !== undefined && newState.bri(state.bri);
        state.hue !== undefined && newState.hue(state.hue);
        state.sat !== undefined && newState.sat(state.sat);
        state.effect !== undefined && newState.effect(state.effect);
        state.ct !== undefined && newState.ct(state.ct);
        state.alert !== undefined && newState.alert(state.alert);

        return new Promise((resolve, reject) => {
            this.hueUser.groups
                .setGroupState(groupId, newState)
                .then(() => resolve(newState._state))
                .catch((error) => reject(error));
        });
    }
}

export default Hue;
