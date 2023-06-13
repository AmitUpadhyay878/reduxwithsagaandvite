import { createSlice, current } from '@reduxjs/toolkit'

const initialState = { value: 0, data: [], isloading: false, singleData: null }

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
        setdata: (state, action) => {
            return { ...state, data: action.payload, isloading: false }
        },
        setsigaldata: (state, action) => {
            return { ...state, singleData: action.payload }
        },
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
        deleteuser: (state, action) => {
            let da = current(state)
            return {
                ...state,
                data: da.data.filter((user) => user.id !== action.payload)
            }
        }
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
    setloading
} = userSlice.actions
export default userSlice.reducer
