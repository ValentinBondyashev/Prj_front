import { combineReducers } from "redux";

import { auth } from "./auth";
import { skill } from "./skill";
const rootReducer = combineReducers({
    auth,
    skill
});

export default rootReducer;