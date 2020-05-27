import { combineReducers } from "redux";
import menu from "../ducks/menu";
import windows from "../ducks/windows";
import lights from "../ducks/lights";
import network from "../ducks/network";
import config from "../ducks/config";

export default combineReducers({
    menu,
    windows,
    lights,
    network,
    config
});
