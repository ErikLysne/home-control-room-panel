import { combineReducers } from "redux";
import mainMenu from "./mainMenu";
import windows from "./windows";
import lights from "./lights";
import networkInfo from "./networkInfo";
import settings from "./settings";

export default combineReducers({
    mainMenu,
    windows,
    lights,
    networkInfo,
    settings
});
