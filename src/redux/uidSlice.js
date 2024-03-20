import {createSlice} from '@reduxjs/toolkit'


export const uidSlice = createSlice({name: 'uid', initialState: {value: null},
    reducers: {
        setUID: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setUID} = uidSlice.actions

export default uidSlice.reducer