import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
    deleteuser,
    setdata,
    setloading,
    setsigaldata,
    updateuser,
    userlogin
} from '../slices/userSlice'
import {
    addNewuserapi,
    deleteuserapi,
    getsigneluserapi,
    getuserapi,
    loginapi,
    updateuserapi
} from '../actions'

function* fetchUser() {
    yield put(setloading())
    const data = yield fetch('http://localhost:3000/users')

    // const data = yield request("POST","/register",{payload},{},false)

    const res = yield data.json()
    yield put(setdata(res))
}

function* addUser(params) {
    yield put(setloading())
    const data = yield fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params.payload)
    })

    localStorage.setItem('user', JSON.stringify(params.payload))
    const res = yield data.json()

    yield put(updateuser(params.payload))
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
function* loginUser(params) {
    console.log(params, 'params')
    yield put(setloading())
    // &password=${params.password}
    const data = yield fetch(
        `http://localhost:3000/users?email=${params.payload.email}`
    )
    const res = yield data.json()
    yield put(userlogin(params.payload))
}

function* mySaga() {
    yield takeLatest(getuserapi().type, fetchUser)
    yield takeLatest(getsigneluserapi().type, fetchsingleUser)
    yield takeLatest(updateuserapi().type, updateUser)
    yield takeLatest(deleteuserapi().type, deleteUser)
    yield takeLatest(addNewuserapi().type, addUser)
    yield takeLatest(loginapi().type, loginUser)
}

export default mySaga
