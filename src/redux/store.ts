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
import distributor from "./distributor";

const persistCurrentUserConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistSuplierConfig = {
  key: "suplier",
  version: 1,
  storage,
};

const persistCurrentUser = persistReducer(
  persistCurrentUserConfig,
  currentUserReducer
);
const persistSuplier = persistReducer(
  persistSuplierConfig,
  distributor
);


export const store = configureStore({
  reducer: {
    currentUser: persistCurrentUser,
    suplier : persistSuplier
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


