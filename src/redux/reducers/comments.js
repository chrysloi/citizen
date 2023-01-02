import { initialState } from "../../utils";
import {
  GET_COMMENTS,
  GET_COMMENTS_SUCESS,
  GET_COMMENTS_FAILED,
  CREATE_COMMENT,
  CREATE_COMMENT_SUCESS,
  CREATE_COMMENT_FAILED,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCESS,
  UPDATE_COMMENT_FAILED,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCESS,
  DELETE_COMMENT_FAILED,
} from "../types";

export const commentsReducer = (
  state = { ...initialState, comments: [], message: {} },
  { type, payload }
) => {
  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        loading: true,
      };
    case GET_COMMENTS_SUCESS:
      return {
        ...state,
        loading: false,
        comments: payload,
      };
    case GET_COMMENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CREATE_COMMENT:
      return {
        ...state,
        loading: true,
      };
    case CREATE_COMMENT_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Comment created successfully",
      };
    case CREATE_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UPDATE_COMMENT:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_COMMENT_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Comment updated successfully",
      };
    case UPDATE_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COMMENT_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Comment deleted successfully",
      };
    case DELETE_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
