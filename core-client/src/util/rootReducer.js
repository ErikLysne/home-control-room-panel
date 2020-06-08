import { combineReducers } from "redux";
import config from "../ducks/config";
import sidebar from "../ducks/sidebar";
import room from "../ducks/room";

export default combineReducers({
    config,
    sidebar,
    room
});
