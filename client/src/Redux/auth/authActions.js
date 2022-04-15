import * as actionTypes from "./authActionTypes";
import axios from "axios";

//Register actions
const registerStart = () => ({
  type: actionTypes.REGISTER_START,
});
const registerSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: user,
});
const registerFail = (error) => ({
  type: actionTypes.REGISTER_FAIL,
  payload: error,
});
//Login actions
const loginStart = () => ({
  type: actionTypes.LOGIN_START,
});
const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user,
});
const loginFail = (error) => ({
  type: actionTypes.LOGIN_FAIL,
  payload: error,
});
//Logout actions

const logoutStart = () => ({
  type: actionTypes.LOGOUT_START,
});
const logoutSuccess = (user) => ({
  type: actionTypes.LOGOUT_SUCCESS,
  payload: user,
});
const logoutFail = (error) => ({
  type: actionTypes.LOGOUT_FAIL,
  payload: error,
});

//HELPER METHODS

//Register helper

export const registerInitiate = (user) => {
  return function (dispatch) {
    dispatch(registerStart());

    axios
      .post("/api/register", user)
      .then((user) => {
        dispatch(registerSuccess(user.data));
      })
      .catch((error) => {
        dispatch(registerFail(error));
      });
  };
};

export const loginInitiate = (user) => {
  return function (dispatch) {
    dispatch(loginStart());

    axios
      .post("/api/login", user)
      .then((response) => {
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loginFail(error));
      });
  };
};

export const logoutInitiate = () => {
  return function (dispatch) {
    try {
      dispatch(logoutStart());
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFail(error));
    }
  };
};
