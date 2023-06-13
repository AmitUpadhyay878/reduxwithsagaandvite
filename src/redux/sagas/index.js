import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
    deleteuser,
    setdata,
    setloading,
    setsigaldata,
    updateuser
} from '../slices/userSlice'
import {
    deleteuserapi,
    getsigneluserapi,
    getuserapi,
    updateuserapi
} from '../actions'

function* fetchUser() {
    yield put(setloading())
    const data = yield fetch('http://localhost:3000/users')
    const res = yield data.json()
    yield put(setdata(res))
}

function* fetchsingleUser(params) {
    yield put(setloading())
    const data = yield fetch(`http://localhost:3000/users/${params.payload}`)
    const res = yield data.json()
    yield put(setsigaldata(res))
}

function* updateUser(params) {
    console.log(params, 'params')
    let { id, ...rest } = params.payload
    yield put(setloading())
    const data = yield fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
    })
    const res = yield data.json()

    yield put(updateuser(params.payload))
}

function* deleteUser(params) {
    yield put(setloading())
    const data = yield fetch(`http://localhost:3000/users/${params.payload}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const res = yield data.json()
    yield put(deleteuser(params.payload))
}

function* mySaga() {
    yield takeLatest(getuserapi().type, fetchUser)
    yield takeLatest(getsigneluserapi().type, fetchsingleUser)
    yield takeLatest(updateuserapi().type, updateUser)
    yield takeLatest(deleteuserapi().type, deleteUser)
}

export default mySaga
