import { combineReducers } from "redux";
import Auth from "./Auth";
import Theme from "./Theme";
import Project from "./Project";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  project: Project,
});

export default reducers;
