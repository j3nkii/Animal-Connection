import { api } from './axiosService.js';
import { put, takeLatest } from "redux-saga/effects";

function* addPhoto(action) {
  try {
    yield api.put("/api/images", action.payload.formData);
    yield put({
      type: "FETCH_SELECTED_ANIMAL",
      payload: { id: action.payload.animal.id },
    });
  } catch (error) {
    console.log("Add photo failed", error);
  }
}

function* addPhotoSaga() {
  yield takeLatest("SEND_FILE", addPhoto);
}

export default addPhotoSaga;
