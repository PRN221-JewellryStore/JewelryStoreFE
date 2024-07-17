import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./feature/account/AccountSlice";

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("accountState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("accountState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

// Load state from localStorage
const preloadedState = loadState();

const rootReducer = combineReducers({
  account: accountReducer,
});
 
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState ? { account: preloadedState.account } : undefined,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState({
    account: store.getState().account,
  });
});

