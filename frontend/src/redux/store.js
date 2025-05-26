// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import postReducer from "./postSlice";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     allpost: postReducer,
//   },
// });


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage by default

import userReducer from "./userSlice";
import postReducer from "./postSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  allpost: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // important for redux-persist
    }),
});

export const persistor = persistStore(store);
