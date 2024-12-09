import { Provider } from "react-redux";
import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
// Import your global CSS file
import "../global.css";

import cartReducer from "../slices/cartSlice";
import ordersReducer from "../slices/ordersSlice";
import userReducer from "../slices/userSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { Slot } from "expo-router";
import { PersistGate } from "redux-persist/integration/react";

// config redux persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// combine reducer
const reducer = combineReducers({
  orders: ordersReducer,
  // cart: cartReducer,
  user: userReducer,
});

// set redux persist with reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// config redux persist store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default function IndexLayout() {
  return (
    // Add store to project
    <Provider store={store}>
      {/* Add redux persist to project */}
      <PersistGate persistor={persistor} loading={null}>
        <Slot />
      </PersistGate>
    </Provider>
  );
}
