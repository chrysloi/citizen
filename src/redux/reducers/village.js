import {
  GET_VILLAGES,
  GET_VILLAGES_SUCESS,
  GET_VILLAGES_FAILED,
  CREATE_VILLAGE,
  CREATE_VILLAGE_SUCESS,
  CREATE_VILLAGE_FAILED,
  UPDATE_VILLAGE,
  UPDATE_VILLAGE_SUCESS,
  UPDATE_VILLAGE_FAILED,
} from "../types";
import { initialState } from "../../utils";

export const villagesReducer = (
  state = { ...initialState, villages: [], message: "" },
  { type, payload }
) => {
  switch (type) {
    case GET_VILLAGES:
      return {
        ...state,
        loading: true,
      };
    case GET_VILLAGES_SUCESS:
      return {
        ...state,
        loading: false,
        villages: payload,
      };
    case GET_VILLAGES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CREATE_VILLAGE:
      return {
        ...state,
        loading: true,
      };
    case CREATE_VILLAGE_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Created successfully",
      };
    case CREATE_VILLAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UPDATE_VILLAGE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_VILLAGE_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Updated successfully",
      };
    case UPDATE_VILLAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
