import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key : "root",
    storage,
}

const reducered = combineReducers({
    
})

const persistedReducer = persistReducer(persistConfig, reducered)

const store = configureStore({
   reducer: {
    auth : authSlice,
    post : postSlice,
   }
});

export default store;