import { combineReducers } from "redux";
import mainMenu from "./mainMenu";
import lights from "./lights";
import lightsInfo from "./lightsInfo";
import lightsUpdater from "./lightsUpdater";
import networkInfo from "./networkInfo";

export default combineReducers({
    mainMenu,
    lights,
    lightsInfo,
    lightsUpdater,
    networkInfo
});
