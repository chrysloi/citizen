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
  RESET,
} from "../types";
import { initialState } from "../../utils";

export const loginUserReducer = (
  state = { ...initialState, user: {}, isLoggedIn: false },
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
        isLoggedIn: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const RegisterUserReducer = (
  state = { ...initialState, user: {}, isRegistered: false },
  { type, payload }
) => {
  switch (type) {
    case CREATE_USER:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_SUCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        isRegistered: true,
      };
    case CREATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case RESET:
      return {
        ...state,
        loading: false,
        user: {},
        isRegistered: false,
      };
    default:
      return state;
  }
};

export const logoutUserReducer = (
  state = { ...initialState, message: "", loggedOut: false },
  { type, payload }
) => {
  switch (type) {
    case LOGOUT:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedOut: true,
        message: "Logged out",
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
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
