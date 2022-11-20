import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
interface savedListState {
    savedList: string[]
}

const initialState: savedListState = {
    savedList: [],
}



export const savedListSlice = createSlice({
    name:"saved",
    initialState,
    reducers : {
        changeSave:(state, payload:PayloadAction<string>) => {
           if(!!state.savedList.find((i:string)=> i === payload.payload)){
               state.savedList = state.savedList.filter(i=> i!== payload.payload)
               return
           }
            state.savedList.push(payload.payload)
        },

    }
})

export const { changeSave} = savedListSlice.actions
export default savedListSlice.reducer