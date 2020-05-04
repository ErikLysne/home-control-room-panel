import hueApi from "node-hue-api";
import colors from "colors";
import cliProgress from "cli-progress";
import chalkAnimation from "chalk-animation";
import fs from "fs";
import readline from "readline";

const hue = hueApi.v3;

exports.discoverHueBridgeIpAddress = function (timeout) {
    const parseSearchResult = (result) => {
        if (typeof result !== "undefined" && result.length > 0) {
            if (result[0].hasOwnProperty("ipaddress")) {
                return result[0].ipaddress;
            }
        }
        return null;
    };

    const upnpSearch = hue.discovery.upnpSearch(timeout).then(
        (result) => {
            const ipAddress = parseSearchResult(result);
            if (ipAddress) {
                throw ipAddress;
            }
            return Error("UPnP search failed");
        },
        (error) => Error("UPnP search failed")
    );
    const nupnpSearch = hue.discovery.nupnpSearch().then(
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
        (results) => results
    );
};

function getUsernameFromFile() {
    const filepath = __dirname + "\\.huedata";

    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.F_OK, (error) => {
            if (!error) {
                const readInterface = readline.createInterface({
                    input: fs.createReadStream(filepath),
                    output: process.stdout,
                    terminal: false,
                });

                readInterface.on("line", (line) => {
                    readInterface.close();
                    readInterface.removeAllListeners();

                    const parsedLine = line.split(" ");
                    if (parsedLine.length !== 2) {
                        reject(Error("File " + filepath + " is corrupted"));
                    }

                    resolve(parsedLine[1]);
                });
            } else {
                reject(Error("File " + filepath + " does not exist"));
            }
        });
    });
}

exports.createHueUser = async function (ipAddress, appName, deviceName) {
    const unauthenticatedUser = await hue.api.createLocal(ipAddress).connect();

    const timeLimit = 30; // seconds
    console.log("\n\n");
    const pressLinkPrompt = chalkAnimation.rainbow(
        "Press the link button on the Hue Bridge now.\n"
    );
    const progressBar = new cliProgress.SingleBar(
        {
            format: "[{bar}] Time left: {eta}s",
            clearOnComplete: true,
            hideCursor: true,
        },
        cliProgress.Presets.shades_classic
    );
    progressBar.start(timeLimit, 0);

    let elapsedTime = 0;
    let timer;

    const cleanup = () => {
        progressBar.stop();
        pressLinkPrompt.stop();
        console.log("\n");
    };

    return new Promise((resolve, reject) => {
        timer = setInterval(() => {
            if (elapsedTime === timeLimit) {
                reject(Error("Link button not pressed within the time limit"));
            }
            progressBar.increment();
            elapsedTime++;

            const createdUser = unauthenticatedUser.users
                .createUser(appName, deviceName)
                .then(
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
};

exports.linkWithHueBridge = async function () {
    //const username = await getUsernameFromFile();
    const ipAddress = await discoverHueBridgeIpAddress(10000);
    createHueUser(ipAddress, "HomeControl", "Desktop").then(
        (user) => console.log(user),
        (error) => {
            console.log(error);
        }
    );
};
