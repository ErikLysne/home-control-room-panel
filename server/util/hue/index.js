import hueApi from "node-hue-api";

const hue = hueApi.v3;

export const discoverBridgeIpAddress = async (timeout) => {
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
        () => Error("UPnP search failed")
    );

    const nupnpSearch = hue.discovery.nupnpSearch().then(
        (result) => {
            const ipAddress = parseSearchResult(result);
            if (ipAddress) {
                throw ipAddress;
            }
            return Error("N-UPnP search failed");
        },
        () => Error("N-UPnP search failed")
    );

    return Promise.all([upnpSearch, nupnpSearch]).then(
        () => {
            throw Error("N-UPnP search and N-UPnP search failed");
        },
        (results) => {
            return results;
        }
    );
};
