import { all, takeEvery, put, fork, call, takeLatest } from "redux-saga/effects";
import { AUTH_TOKEN, SIGNIN } from "../constants/Auth";
import { showAuthMessage, authenticated } from "../actions/Auth";

import JwtAuthService from "services/JwtAuthService";

export function* signInWithFBEmail() {
  yield takeLatest(SIGNIN, function* ({ payload }) {
    try {
      const user = yield call(JwtAuthService.login, payload);
      if (user.message) {
        yield put(showAuthMessage(user.message));
      } else {
        localStorage.setItem(AUTH_TOKEN, user.access);
        yield put(authenticated(user.access));
      }
    } catch (err) {
      yield put(showAuthMessage(err));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(signInWithFBEmail)]);
}
