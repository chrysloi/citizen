import * as SecureStore from "expo-secure-store";
import { Action, storeToken } from "../../utils";
import {
  GET_USERS,
  GET_USERS_SUCESS,
  GET_USERS_FAILED,
  CREATE_USER,
  CREATE_USER_SUCESS,
  CREATE_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCESS,
  UPDATE_USER_FAILED,
  LOGIN,
  LOGIN_SUCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REGISTER,
  REGISTER_SUCESS,
  REGISTER_FAILED,
  RESET,
  RESET_LOGIN,
} from "../types";
import { BASE_URL } from "../../utils";
import axios from "axios";

export const LoginUser = (creds) => (dispatch) => {
  dispatch(Action(LOGIN));
  try {
    axios
      .post(`${BASE_URL}/users/login`, creds)
      .then((res) => {
        storeToken("token", res.data.data.token).then(() => {
          storeToken("userId", res.data.data.user._id).then(() => {
            dispatch(Action(LOGIN_SUCESS, res.data.data));
          });
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch(Action(LOGIN_FAILED, err.response.data.error));
      });
  } catch (error) {
    console.error(error);
  }
};

export const resetLogin = () => (dispatch) => {
  dispatch(Action(RESET_LOGIN, "Reset Login success"));
};

export const RegisterUser = (creds) => (dispatch) => {
  dispatch(Action(CREATE_USER));
  try {
    axios
      .post(`${BASE_URL}/users/createuser`, creds)
      .then((res) => {
        dispatch(Action(CREATE_USER_SUCESS, res.data.data));
      })
      .catch((err) => {
        console.info(err);
        dispatch(Action(CREATE_USER_FAILED, err.response.data.error));
      });
  } catch (error) {
    console.error(error);
  }
};

export const resetRegister = () => (dispatch) => {
  dispatch(Action(RESET, "Reset register success"));
};

export const Logout = () => (dispatch) => {
  try {
    dispatch(Action(LOGOUT));
    SecureStore.deleteItemAsync("token")
      .then(() => {
        dispatch(Action(LOGOUT_SUCCESS));
      })
      .catch((err) => {
        dispatch(Action(LOGOUT_FAILED));
      });
  } catch (error) {
    console.error(error);
  }
};

export const GetUsers = ({ userId }) => {
  return (dispatch) => {
    try {
      let params = "?";
      if (userId) {
        params += `userId=${userId}&`;
      }
      dispatch(Action(GET_USERS));
      axios
        .get(`${BASE_URL}/users${params}`)
        .then((res) => {
          dispatch(Action(GET_USERS_SUCESS, res.data.data));
        })
        .catch((err) => {
          dispatch(Action(GET_USERS_FAILED, err));
        });
    } catch (error) {
      console.error(error);
    }
  };
};

export const UpdateUser = (user) => {
  return (dispatch) => {
    try {
      dispatch(Action(UPDATE_USER));
      axios
        .patch(`${BASE_URL}/users/updateuser?userId=${user._id}`, user)
        .then((res) => {
          dispatch(Action(UPDATE_USER_SUCESS, res.data.data));
        })
        .catch((err) => {
          dispatch(Action(UPDATE_USER_FAILED, err));
        });
    } catch (error) {
      console.error(error);
    }
  };
};
