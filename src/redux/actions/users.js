import { Action, removerToken, storeToken } from "../../utils";
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
} from "../types";
import { BASE_URL } from "../../utils";
import axios from "axios";

export const LoginUser = (creds) => (dispatch) => {
  dispatch(Action(LOGIN));
  try {
    axios
      .post(`${BASE_URL}/users/login`, creds)
      .then((res) => {
        console.log(res.data, "+++++++++++++");
        storeToken("token", res.data.data.token).then(() => {
          console.log("Token stored");
          storeToken("userId", res.data.data.user._id).then(() => {
            console.log("id stored");
            dispatch(Action(LOGIN_SUCESS, res.data.data));
          });
        });
      })
      .catch((err) => {
        console.info(err);
        dispatch(Action(LOGIN_FAILED, err));
      });
  } catch (error) {
    console.error(error);
  }
};

export const Logout = () => (dispatch) => {
  try {
    dispatch(Action(LOGOUT));
    removerToken();
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
