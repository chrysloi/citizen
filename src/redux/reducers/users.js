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
import { initialState } from "../../utils";

export const loginUserReducer = (
  state = { ...initialState, user: {} },
  { type, payload }
) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        user: {},
      };
    default:
      return state;
  }
};

export const usersReducer = (
  state = { ...initialState, users: [] },
  { type, payload }
) => {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
