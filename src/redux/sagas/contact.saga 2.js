import { api } from './axiosService.js';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchContacts() {
    try {
        const response = yield api.get(`/api/contact`);
        yield put({ type: 'SET_CONTACTS', payload: response.data });
    }
    catch (error) {
        console.error('fetchContacts failed', error);
    }
}

function* addContacts(action) {
    try {
        yield api.post(`/api/contact`, action.payload);
        yield put({ type: 'FETCH_CONTACTS',});
    }
    catch (error) {
        console.error('fetchContacts failed', error);
    }
}

function* contactSaga () {
    yield takeLatest('FETCH_CONTACTS', fetchContacts);
    yield takeLatest('ADD_CONTACTS', addContacts);


}

export default contactSaga;