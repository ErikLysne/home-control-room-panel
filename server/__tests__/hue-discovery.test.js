import hueDiscovery from "../src/hue/hue-discovery";
import hueApi from "node-hue-api";

const hue = hueApi.v3;

jest.mock("node-hue-api");

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
                serial: "0017xxxxxxxx",
            },
            version: {
                major: "1",
                minor: "0",
            },
            icons: [
                {
                    mimetype: "image/png",
                    height: "48",
                    width: "48",
                    depth: "24",
                    url: "hue_logo_0.png",
                },
            ],
        },
    ];

    const upnpSearchResultEmptyMock = [];

    const upnpSearchErrorMock = Error("N-UPnP search failed");

    const nupnpSearchResultMock = [
        {
            name: "Philips hue",
            ipaddress: "192.168.0.10",
            modelid: "BSB002",
            swversion: "1935074050",
        },
    ];

    const nupnpSearchResultErrorMock = {
        error: {
            message: "An error message",
            description:
                "Failed to connect and load configuration from the bridge at ip address xxx.xxx.xxx.xxx",
            ipaddress: "xxx.xxx.xxx.xxx",
            id: "xxxxxxxxxxxxxxxx",
        },
    };

    const nupnpSearchErrorMock = Error("N-UPnP search failed");

    it("returns ip address when UPnP search succeeds and N-UPnP search fails", async () => {
        hue.discovery.upnpSearch.mockResolvedValue(upnpSearchResultMock);
        hue.discovery.nupnpSearch.mockRejectedValue(nupnpSearchErrorMock);

        return expect(
            hueDiscovery.discoverHueBridgeIpAddress(10000)
        ).resolves.toEqual("192.168.0.20");
    });

    it("returns ip address when UPnP search fails and N-UPnP search succeeds", async () => {
        hue.discovery.upnpSearch.mockRejectedValue(upnpSearchErrorMock);
        hue.discovery.nupnpSearch.mockResolvedValue(nupnpSearchResultMock);

        return expect(
            hueDiscovery.discoverHueBridgeIpAddress(10000)
        ).resolves.toEqual("192.168.0.10");
    });

    it("throws error when UPnP search fails and N-UPnP search fails", async () => {
        hue.discovery.upnpSearch.mockRejectedValue(upnpSearchErrorMock);
        hue.discovery.nupnpSearch.mockRejectedValue(nupnpSearchErrorMock);

        return expect(
            hueDiscovery.discoverHueBridgeIpAddress(1000)
        ).rejects.toThrow();
    });

    it("returns ip address when UPnP search and N-UPnP search succeeds", async () => {
        hue.discovery.upnpSearch.mockResolvedValue(upnpSearchResultMock);
        hue.discovery.nupnpSearch.mockResolvedValue(nupnpSearchResultMock);

        const ipAddress = await hueDiscovery.discoverHueBridgeIpAddress(1000);

        expect(ipAddress === "192.168.0.10" || ipAddress === "192.168.0.20")
            .toBeTruthy;
    });

    it("throws error if UPnP search times out", async () => {
        hue.discovery.upnpSearch.mockResolvedValue(upnpSearchResultEmptyMock);
        hue.discovery.nupnpSearch.mockRejectedValue(upnpSearchErrorMock);

        return expect(
            hueDiscovery.discoverHueBridgeIpAddress(10000)
        ).rejects.toThrow();
    });
});
