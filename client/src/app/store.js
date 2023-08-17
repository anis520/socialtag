import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";

//create sotre
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
  devTools: true,
});

export default store;
