import { CREATE_USER, DELETE_USER, EDIT_USER, GET_SINGLE_USER, GET_USERS } from "./ActionType";

export const createUser = (data) => async (dispatch) => {
  const res = await fetch(`https://poly9-ashok.herokuapp.com/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const user = await res.json();
  dispatch({ type: CREATE_USER, payload: user });
};

export const getUsers = (page) => async (dispatch) => {
  const res = await fetch(`https://poly9-ashok.herokuapp.com/users/get?page=${page}`);
  const users = await res.json();

  dispatch({ type: GET_USERS, payload: users });
};

export const editUser = (data) => async (dispatch) => {
  const res = await fetch(
    `https://poly9-ashok.herokuapp.com/users/edit/${data.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.data),
    }
  );
  const user = await res.json();
  dispatch({ type: EDIT_USER, payload: user });
};

export const deleteUser = (id) => async (dispatch) => {
  const res = await fetch(
    `https://poly9-ashok.herokuapp.com/users/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const user = await res.json();
  dispatch({ type: DELETE_USER, payload: user });
};

export const getSingleUser = (id) => async (dispatch) => {
  const res = await fetch(`https://poly9-ashok.herokuapp.com/users/single/${id}`);
  const user = await res.json();

  dispatch({ type: GET_SINGLE_USER, payload: user });
  
}
