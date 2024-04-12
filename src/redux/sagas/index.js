import { all } from "redux-saga/effects";
import Auth from "./Auth";
import Project from "./Project";

export default function* rootSaga(getState) {
  yield all([Auth(), Project()]);
}
