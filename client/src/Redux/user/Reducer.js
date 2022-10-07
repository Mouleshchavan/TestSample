import { CREATE_USER, DELETE_USER, EDIT_USER, GET_SINGLE_USER, GET_USERS } from "./ActionType";

const initialState = {
 users: null,
  isLoading: false,
 singleUser:null
};
export const userReducer = (store = initialState, { type, payload }) => {
  if (type === CREATE_USER) {
    return { ...store, newUser: payload };
  } else if (type === GET_USERS) {
    return { ...store, users: payload };
  } else if (type === EDIT_USER) {
    return { ...store, edit: payload };
  } else if (type === DELETE_USER) {
    return { ...store, deleted: payload };
  }
  else if (type === GET_SINGLE_USER) {
    return { ...store, singleUser: payload };
  }

  return store;
};
