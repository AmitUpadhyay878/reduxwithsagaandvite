import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    data: [],
    isloading: false,
    singleData: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment(state) {
            console.log({ state: current(state) })
            return { ...state, value: state.value + 1 }
        },
        decrement(state) {
            return { ...state, value: state.value - 1 }
        },
        setloading: (state, action) => {
            return { ...state, isloading: true }
        },

        //#region User-Listing
        setdata: (state, action) => {
            return { ...state, data: action.payload, isloading: false }
        },
        //#endregion

        //#region  Get-User-By-Id
        setsigaldata: (state, action) => {
            return { ...state, singleData: action.payload }
        },
        //#endregion

        //#region  Update-user-By-Id
        updateuser: (state, action) => {
            let da = current(state)
            return {
                ...state,
                data: da.data.map((rr, i) => {
                    if (rr.id === action.payload.id) {
                        return action.payload
                    } else {
                        return rr
                    }
                })
            }
        },
        //#endregion

        //#region Add-New-User
        adduser: (state, action) => {
            let da = current(state)
            return {
                ...state,
                data: action.payload
            }
        },
        //#endregion

        //#region Delete-user-By-Id
        deleteuser: (state, action) => {
            let da = current(state)
            return {
                ...state,
                data: da.data.filter((user) => user.id !== action.payload)
            }
        },
        //#endregion

        //#region Login-User
        userlogin: (state, action) => {
            const da = current(state)
            return {
                ...state,
                data: da.data.filter(
                    (user) =>
                        user.email === action.payload.email &&
                        user.password === action.payload.password
                )
            }
        },
        //#endregion

        //#region Add-User-In-Favorite-list-By-Id
        userfavorite: (state, action) => {
            let da = current(state)
            return {
                ...state,
                data: da.data.map((rr, i) => {
                    if (rr.id === action.payload.id) {
                        return action.payload
                    } else {
                        return rr
                    }
                })
            }
        }
        //#endregion
    },

    extraReducers: (builder) => {
        builder.addCase('logout', (state, action) => {
            return { value: 0, data: [], isloading: false }
        })
    }
})

export const {
    increment,
    decrement,
    setdata,
    setsigaldata,
    updateuser,
    deleteuser,
    setloading,
    userlogin,
    userfavorite
} = userSlice.actions
export default userSlice.reducer
