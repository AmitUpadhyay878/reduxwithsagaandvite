import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import RequestApi from '../../request/Request'
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
    addUsertowishlistapi,
    deleteuserapi,
    getsigneluserapi,
    getuserapi,
    loginapi,
    updateuserapi
} from '../actions'

//#region USERS-ALL-GET
function* fetchUser() {
    yield put(setloading())
    const data = yield fetch('http://localhost:3000/users')

    // const data = yield request("POST","/register",{payload},{},false)

    const res = yield data.json()
    yield put(setdata(res))
}
//#endregion

//#region USER-ADD
function* addUser(params) {
    const { payload } = params
    yield put(setloading())
    // const data = yield fetch(`http://192.168.1.3:3000/api/v1/user/signup`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(params.payload)
    // })

    const data = yield RequestApi.post(`user/signup`, payload, {}, false)

    localStorage.setItem('user', JSON.stringify(payload))
    const res = yield data.json()

    yield put(updateuser(payload))
}
//#endregion

//#region USER-GET-BY-ID
function* fetchsingleUser(params) {
    yield put(setloading())
    const data = yield fetch(`http://localhost:3000/users/${params.payload}`)
    const res = yield data.json()
    yield put(setsigaldata(res))
}
//#endregion

//#region  USER-UPDATE
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
//#endregion

//#region  USER-DELETE-BY-ID
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
//#endregion

//#region  USER-LOGIN
function* loginUser(params) {
    const { payload } = params

    yield put(setloading())
    try {
        const data = yield RequestApi.post(`user/login`, payload, {}, false)

        localStorage.setItem('user', JSON.stringify(data?.data))
        localStorage.setItem('userToken', JSON.stringify(data?.meta?.tokenData))
        yield put(userlogin(data))
    } catch (e) {
        console.log(e, 'err')
    }
}
//#endregion

//#region  USER-FAVORITE-LIST
function* favoritetUser(params) {
    let { id, ...rest } = params.payload
    yield put(setloading())
    const data = yield fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...(params.payload.favoriteUser = [
                ...params.payload.favoriteUser,
                id
            ])
        })
    })
    const res = yield data.json()

    yield put(updateuser(params.payload))
}
//#endregion

function* mySaga() {
    yield takeLatest(getuserapi().type, fetchUser)
    yield takeLatest(getsigneluserapi().type, fetchsingleUser)
    yield takeLatest(updateuserapi().type, updateUser)
    yield takeLatest(deleteuserapi().type, deleteUser)
    yield takeLatest(addNewuserapi().type, addUser)
    yield takeLatest(loginapi().type, loginUser)
    yield takeLatest(addUsertowishlistapi().type, favoritetUser)
}

export default mySaga
