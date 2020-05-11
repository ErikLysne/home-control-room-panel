import { combineReducers } from "redux";
import mainMenu from "./mainMenu";
import lights from "./lights";
import networkInfo from "./networkInfo";
import settings from "./settings";

export default combineReducers({
    mainMenu,
    lights,
    networkInfo,
    settings
});
