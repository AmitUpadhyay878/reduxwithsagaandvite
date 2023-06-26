import { createAction } from '@reduxjs/toolkit'

export const getuserapi = createAction('USER_FETCH_REQUESTED')
export const getsigneluserapi = createAction('USER_FETCH_SINGLEUSER')
export const updateuserapi = createAction('USER_UPDATE')
export const deleteuserapi = createAction('USER_DELETE')
export const addNewuserapi = createAction('USER_ADD')
export const loginapi = createAction('USER_LOGIN')
export const addUsertowishlistapi = createAction('ADD_USER_FAVORITE')
export const removeUserfromwishlistapi = createAction('REMOVE_USER_FAVORITE')
