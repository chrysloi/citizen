import {
  GET_INQUIRIES,
  GET_INQUIRIES_SUCESS,
  GET_INQUIRIES_FAILED,
  CREATE_INQUIRY,
  CREATE_INQUIRY_SUCESS,
  CREATE_INQUIRY_FAILED,
  UPDATE_INQUIRY,
  UPDATE_INQUIRY_SUCESS,
  UPDATE_INQUIRY_FAILED,
  DELETE_INQUIRY,
  DELETE_INQUIRY_SUCESS,
  DELETE_INQUIRY_FAILED,
} from "../types";
import { initialState } from "../../utils";

export const inquiriesReducer = (
  state = { ...initialState, inquiries: [], message: "" },
  { type, payload }
) => {
  switch (type) {
    case GET_INQUIRIES:
      return {
        ...state,
        loading: true,
      };
    case GET_INQUIRIES_SUCESS:
      return {
        ...state,
        loading: false,
        inquiries: payload,
      };
    case GET_INQUIRIES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UPDATE_INQUIRY:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_INQUIRY_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Updated successfully",
      };
    case UPDATE_INQUIRY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case DELETE_INQUIRY:
      return {
        ...state,
        loading: true,
      };
    case DELETE_INQUIRY_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Deleted successfully",
      };
    case DELETE_INQUIRY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const createInquiryReducer = (
  state = { ...initialState, inquiry: {}, message: "" },
  { type, payload }
) => {
  switch (type) {
    case CREATE_INQUIRY:
      return {
        ...state,
        loading: true,
      };
    case CREATE_INQUIRY_SUCESS:
      return {
        ...state,
        loading: false,
        message: "Created successfully",
        inquiry: payload,
      };
    case CREATE_INQUIRY_FAILED:
      return {
        ...state,
        loading: false,
        inquiry: {},
        error: payload,
      };

    default:
      return state;
  }
};
