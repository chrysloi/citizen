import { Action } from "../../utils";
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
} from "../types";
import { BASE_URL } from "../../utils";
import axios from "axios";

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
