const config = "config/";

export const GET_REQUEST_SENT = config + "GET_REQUEST_SENT";
export const GET_REQUEST_SUCCEEDED = config + "GET_REQUEST_SUCCEEDED";
export const GET_REQUEST_FAILED = config + "GET_REQUEST_FAILED";
export const PUT_REQUEST_SENT = config + "PUT_REQUEST_SENT";
export const PUT_REQUEST_SUCCEEDED = config + "PUT_REQUEST_SUCCEEDED";
export const PUT_REQUEST_FAILED = config + "PUT_REQUEST_FAILED";

const server = config + "server/";
export const SERVER_IP_ADDRESS_UPDATED = server + "SERVER_IP_ADDRESS_UPDATED";
export const SERVER_PORT_UPDATED = server + "SERVER_PORT_UPDATED";

const philipsHue = config + "philipsHue/";
const bridge = philipsHue + "bridge/";
export const BRIDGE_IP_ADDRESS_UPDATED = bridge + "BRIDGE_IP_ADDRESS_UPDATED";
export const BRIDGE_IP_ADDRESS_REQUEST_SENT =
    bridge + "BRIDGE_IP_ADDRESS_REQUEST_SENT";
export const BRIDGE_IP_ADDRESS_REQUEST_SUCCEEDED =
    bridge + "BRIDGE_IP_ADDRESS_REQUEST_SUCCEEDED";
export const BRIDGE_IP_ADDRESS_REQUEST_FAILED =
    bridge + "BRIDGE_IP_ADDRESS_REQUEST_FAILED";
export const USERNAME_UPDATED = bridge + "USERNAME_UPDATED";
export const CLIENTKEY_UPDATED = bridge + "CLIENTKEY_UPDATED";
export const CREATE_USER_REQUEST_SENT = bridge + "CREATE_USER_REQUEST_SENT";
export const CREATE_USER_REQUEST_SUCCEEDED =
    bridge + "CREATE_USER_REQUEST_SUCCEEDED";
export const CREATE_USER_REQUEST_FAILED = bridge + "CREATE_USER_REQUEST_FAILED";
export const CREATE_USER_FINISHED = bridge + "CREATE_USER_FINISHED";
