import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Action, BASE_URL, getValueForToken } from "../../utils";
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

export const CreateComment =
  ({ inquiryId, data }) =>
  async (dispatch) => {
    try {
      dispatch(Action(CREATE_COMMENT));
      axios({
        method: "post",
        url: `${BASE_URL}/comments/${inquiryId}`,
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
        data: data,
      })
        .then((res) => {
          dispatch(Action(CREATE_COMMENT_SUCESS, res.data.data));
        })
        .catch((err) => {
          dispatch(Action(CREATE_COMMENT_FAILED, err));
        });
    } catch (error) {
      console.error(error);
      dispatch(Action(CREATE_COMMENT_FAILED, err));
    }
  };

export const GetComments =
  ({ inquiryId }) =>
  async (dispatch) => {
    try {
      dispatch(Action(GET_COMMENTS));
      axios
        .get(`${BASE_URL}/comments/${inquiryId}`)
        .then((res) => {
          dispatch(Action(GET_COMMENTS_SUCESS, res.data.data));
        })
        .catch((err) => {
          dispatch(Action(GET_COMMENTS_FAILED, err));
        });
    } catch (error) {
      console.error(error);
      dispatch(Action(GET_COMMENTS_FAILED, err));
    }
  };
