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
import { initialState } from "../../utils";

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
