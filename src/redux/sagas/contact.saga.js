import { api } from './axiosService.js';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchContacts(action) {
    const qFilter = action.payload
    try {
        const response = yield api.get(`/api/contact`, {params: qFilter});
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

function* fetchContactDetails(action){
    try {
        const responseContact = yield api.get(`/api/contact/${action.payload.id}`);
        yield put({ type: 'SET_SELECTED_CONTACT', payload: responseContact.data[0]});
    }
    catch (error) {
        console.error('fetchContacts failed', action.payload, error);
    }
}

function* deleteContact(action) {
    try{
        
    yield api.delete(`/api/contact/${action.payload}`);
    yield put({ type: 'FETCH_CONTACTS'});
    } catch (error) {
        console.log('DELETE contact failed', error);
    }
}

function* saveChanges(action){
    try{
    yield api.put(`/api/contact`, action.payload);
    } catch (error) {
        console.log('UPDATE contact failed', error);
    }
}

// Add an contact to a job
function* addContactToJob(action) {
    try {
        yield api.post(`/api/contact/job`, action.payload);
        yield put({ type: 'FETCH_SELECTED_CONTACT', payload: { id: action.payload.contactId }});
    }
    catch (error) {
        console.error('addContactToJob failed', error);
    }
}


function* contactSaga () {
    yield takeLatest('FETCH_CONTACTS', fetchContacts);
    yield takeLatest('FETCH_SELECTED_CONTACT', fetchContactDetails);
    yield takeLatest('ADD_CONTACTS', addContacts);
    yield takeLatest('SAVE_CONTACT_CHANGES',saveChanges);
    yield takeLatest('DELETE_CONTACT', deleteContact);
    yield takeLatest('ADD_CONTACT_TO_JOB', addContactToJob);
}

export default contactSaga;