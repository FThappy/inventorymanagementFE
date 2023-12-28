import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUser";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistCurrentUserConfig = {
  key: "root",
  version: 1,
  storage,
};


const persistCurrentUser = persistReducer(
  persistCurrentUserConfig,
  currentUserReducer
);


export const store = configureStore({
  reducer: {
    currentUser: persistCurrentUser,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


