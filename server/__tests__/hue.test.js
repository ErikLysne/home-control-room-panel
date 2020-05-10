jest.mock("node-hue-api");
jest.mock("fs");

import Hue from "../src/hue";
import hueApi from "node-hue-api";

const hueApiv3 = hueApi.v3;
const hue = new Hue();

describe("discoverHueBridgeIpAddress", () => {
    const upnpSearchResultMock = [
        {
            name: "Philips hue (192.168.0.20)",
            manufacturer: "Royal Philips Electronics",
            ipaddress: "192.168.0.20",
            model: {
                number: "BSB002",
                description: "Philips hue Personal Wireless Lighting",
                name: "Philips hue bridge 2015",
                serial: "0017xxxxxxxx"
            },
            version: {
                major: "1",
                minor: "0"
            },
            icons: [
                {
                    mimetype: "image/png",
                    height: "48",
                    width: "48",
                    depth: "24",
                    url: "hue_logo_0.png"
                }
            ]
        }
    ];

    const upnpSearchResultEmptyMock = [];

    const upnpSearchErrorMock = Error("N-UPnP search failed");

    const nupnpSearchResultMock = [
        {
            name: "Philips hue",
            ipaddress: "192.168.0.10",
            modelid: "BSB002",
            swversion: "1935074050"
        }
    ];

    const nupnpSearchResultErrorMock = {
        error: {
            message: "An error message",
            description:
                "Failed to connect and load configuration from the bridge at ip address xxx.xxx.xxx.xxx",
            ipaddress: "xxx.xxx.xxx.xxx",
            id: "xxxxxxxxxxxxxxxx"
        }
    };

    const nupnpSearchErrorMock = Error("N-UPnP search failed");

    it("returns ip address when UPnP search succeeds and N-UPnP search fails", async () => {
        hueApiv3.discovery.upnpSearch.mockResolvedValue(upnpSearchResultMock);
        hueApiv3.discovery.nupnpSearch.mockRejectedValue(nupnpSearchErrorMock);

        return expect(hue.discoverBridgeIpAddress(10000)).resolves.toEqual(
            "192.168.0.20"
        );
    });

    it("returns ip address when UPnP search fails and N-UPnP search succeeds", async () => {
        hueApiv3.discovery.upnpSearch.mockRejectedValue(upnpSearchErrorMock);
        hueApiv3.discovery.nupnpSearch.mockResolvedValue(nupnpSearchResultMock);

        return expect(hue.discoverBridgeIpAddress(10000)).resolves.toEqual(
            "192.168.0.10"
        );
    });

    it("throws error when UPnP search fails and N-UPnP search fails", async () => {
        hueApiv3.discovery.upnpSearch.mockRejectedValue(upnpSearchErrorMock);
        hueApiv3.discovery.nupnpSearch.mockRejectedValue(nupnpSearchErrorMock);

        return expect(hue.discoverBridgeIpAddress(1000)).rejects.toThrow();
    });

    it("returns ip address when UPnP search and N-UPnP search succeeds", async () => {
        hueApiv3.discovery.upnpSearch.mockResolvedValue(upnpSearchResultMock);
        hueApiv3.discovery.nupnpSearch.mockResolvedValue(nupnpSearchResultMock);

        const ipAddress = await hue.discoverBridgeIpAddress(1000);

        expect(ipAddress === "192.168.0.10" || ipAddress === "192.168.0.20")
            .toBeTruthy;
    });

    it("throws error if UPnP search times out", async () => {
        hueApiv3.discovery.upnpSearch.mockResolvedValue(
            upnpSearchResultEmptyMock
        );
        hueApiv3.discovery.nupnpSearch.mockRejectedValue(upnpSearchErrorMock);

        return expect(hue.discoverBridgeIpAddress(10000)).rejects.toThrow();
    });
});

describe("parseUserFileContent", () => {
    const filePath = "/path/to/userfile";
    const validUserFileContent = [
        "username: test-user-name",
        "entertainmentAPIKey: test-entertainment-api-key"
    ];

    const invalidUserFileContent = [
        "username: test-user-name",
        "entertainmentAPIKey-is-missing"
    ];

    it("parses username and entertainment API key with valid input", () => {
        expect(
            Hue.parseUserFileContent(filePath, validUserFileContent)
        ).toEqual({
            username: "test-user-name",
            entertainmentAPIKey: "test-entertainment-api-key"
        });
    });

    it("throws error if file content is invalid", () => {
        expect(() =>
            Hue.parseUserFileContent(filePath, invalidUserFileContent)
        ).toThrow();
    });
});
