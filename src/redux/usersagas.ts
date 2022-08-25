import * as types from "./actionTypes";
import {
  all,
  call,
  delay,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  createUserApi,
  deleteUserApi,
  filterUserApi,
  loadUsersApi,
  searchUserApi,
  sortUserApi,
  updateUserApi,
} from "./api";
import {
  createUserError,
  createUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  filterUserError,
  filterUserSuccess,
  loadUsersError,
  loadUsersSuccess,
  searchUserError,
  searchUserSuccess,
  sortUserError,
  sortUserStart,
  sortUserSuccess,
  updateUserError,
  updateUserSuccess,
} from "./actions";

export function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

export function* onCreateUserStartAsync(action) {
  try {
    const response = yield call(createUserApi, action.payload);
    if (response.status === 201) {
      yield put(createUserSuccess());
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

export function* onDeleteUserStartAsync(action) {
  try {
    const response = yield call(deleteUserApi, action.payload);
    if (response.status === 200) {
      yield put(deleteUserSuccess(action.payload));
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

export function* onUpdateUserStartAsync(action) {
  try {
    const response = yield call(
      updateUserApi,
      action.payload.id,
      action.payload.userInfo
    );
    if (response.status === 200) {
      yield put(updateUserSuccess());
    }
  } catch (error) {
    yield put(updateUserError(error.response.data));
  }
}

export function* onSearchUserStartAsync(action) {
  try {
    const response = yield call(searchUserApi, action.payload);
    if (response.status === 200) {
      yield put(searchUserSuccess(response.data));
    }
  } catch (error) {
    yield put(searchUserError(error.response.data));
  }
}

export function* onFilterUserStartAsync(action) {
  try {
    const response = yield call(filterUserApi, action.payload);
    if (response.status === 200) {
      yield put(filterUserSuccess(response.data));
    }
  } catch (error) {
    yield put(filterUserError(error.response.data));
  }
}

export function* onSortUserStartAsync(action) {
  try {
    const response = yield call(sortUserApi, action.payload);
    if (response.status === 200) {
      yield put(sortUserSuccess(response.data));
    }
  } catch (error) {
    yield put(sortUserError(error.response.data));
  }
}

export function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

export function* onDeleteUser() {
  yield takeLatest(types.DELETE_USER_START, onDeleteUserStartAsync);
}

export function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

export function* onSearchUser() {
  yield takeLatest(types.SEARCH_USER_START, onSearchUserStartAsync);
}

export function* onFilterUser() {
  yield takeLatest(types.FILTER_USER_START, onFilterUserStartAsync);
}

export function* onSortUser() {
  yield takeLatest(types.SORT_USER_START, onSortUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
  fork(onSearchUser),
  fork(onFilterUser),
  fork(onSortUser),
];
export default function* rootSaga() {
  yield all([...userSagas]);
}
