import {configureStore} from "@reduxjs/toolkit";
import{jobApi} from "./jobApi";
import savedListReducer from "./slices/savedListSlice";

export default configureStore({
    reducer:{
        [jobApi.reducerPath]: jobApi.reducer,
        saved: savedListReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jobApi.middleware),
})