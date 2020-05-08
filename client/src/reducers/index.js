import { combineReducers } from "redux";
import mainMenu from "./mainMenu";
import lights from "./lights";
import lightsUpdater from "./lightsUpdater";

export default combineReducers({
    mainMenu,
    lights,
    lightsUpdater
});
