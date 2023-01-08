import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_FAILED,
  CREATE_CATEGORY_SUCESS,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAILED,
  DELETE_CATEGORY_SUCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_SUCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAILED,
  UPDATE_CATEGORY_SUCESS,
} from "../types";
import { initialState } from "../../utils";

export const categoriesReducer = (
  state = { ...initialState, categories: [], message: "", isCreated: false },
  { type, payload }
) => {
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_SUCESS:
      return {
        ...state,
        loading: false,
        categories: payload,
      };
    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CREATE_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATEGORY_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Created successfully",
        isCreated: true,
      };
    case CREATE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CATEGORY_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Updated successfully",
      };
    case UPDATE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATEGORY_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Updated successfully",
      };
    case DELETE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
