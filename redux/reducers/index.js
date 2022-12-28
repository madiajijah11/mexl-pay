import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

const persistConfig = {
  key: "auth",
  storage,
};

const reducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  profile: profileReducer,
});

export default reducer;
