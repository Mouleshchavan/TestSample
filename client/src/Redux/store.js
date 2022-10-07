import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./user/Reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
