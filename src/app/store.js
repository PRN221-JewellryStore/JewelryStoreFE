import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./feature/account/AccountSlice";
import { cartReducer } from "./feature/cart/CartSlice";

// Function to load token from localStorage or sessionStorage
const loadToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    const token = loadToken();
    if (token) {
      state.account = { ...state.account, token }; // Add token to account state
    }
    return state;
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

// Load state from localStorage
const preloadedState = loadState();

const rootReducer = combineReducers({
  account: accountReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState ? { account: preloadedState.account, cart: preloadedState.cart } : undefined,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState({
    account: store.getState().account,
    cart: store.getState().cart,
  });
});
