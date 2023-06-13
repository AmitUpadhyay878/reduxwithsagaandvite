import { createSlice, current } from '@reduxjs/toolkit'

const initialState = { value: 0, data: [], isloading: false }

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            console.log({ state: current(state) })
            return { ...state, value: state.value + 1 }
        },
        decrement(state) {
            return { ...state, value: state.value - 1 }
        }
    }
})

export const { increment, decrement, setdata, setloading } =
    counterSlice.actions
export default counterSlice.reducer
