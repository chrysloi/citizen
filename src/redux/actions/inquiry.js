import axios from "axios";
import { Action, BASE_URL } from "../../utils";
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

export const CreateInquiry = (inquiry) => async (dispatch) => {
  try {
    dispatch(Action(CREATE_INQUIRY));
    axios
      .post(`${BASE_URL}/inquiry`, inquiry)
      .then((res) => {
        dispatch(Action(CREATE_INQUIRY_SUCESS, res.data.data));
      })
      .catch((err) => {
        dispatch(Action(CREATE_INQUIRY_FAILED, err));
      });
  } catch (error) {
    console.error(error);
    dispatch(Action(CREATE_INQUIRY_FAILED, err));
  }
};

export const GetInquiries =
  ({ inquiryId, userId, villageId, cellId, categoryId }) =>
  async (dispatch) => {
    try {
      dispatch(Action(GET_INQUIRIES));
      let query = "?";
      if (inquiryId) {
        query += `inquiryId=${inquiryId}&`;
      } else if (userId) {
        query += `userId=${userId}&`;
      } else if (cellId) {
        query += `cellId=${cellId}&`;
      } else if (villageId) {
        query += `villageId=${villageId}&`;
      } else if (categoryId) {
        query += `categoryId=${categoryId}&`;
      }

      axios
        .get(`${BASE_URL}/inquiry${query}`)
        .then((res) => {
          dispatch(Action(GET_INQUIRIES_SUCESS, res.data.data));
        })
        .catch((err) => {
          dispatch(Action(GET_INQUIRIES_FAILED, err));
        });
    } catch (err) {
      console.error(err);
      dispatch(Action(GET_INQUIRIES_FAILED, err));
    }
  };

export const UpdateInquiry = (inquiry) => async (dispatch) => {
  try {
    dispatch(Action(UPDATE_INQUIRY));
    axios
      .patch(`${BASE_URL}/inquiry/${inquiry._id}`, inquiry)
      .then((res) => {
        dispatch(Action(UPDATE_INQUIRY_SUCESS, res.data.data));
      })
      .catch((err) => {
        dispatch(Action(UPDATE_INQUIRY_FAILED, err));
      });
  } catch (error) {
    console.error(error);
    dispatch(Action(UPDATE_INQUIRY_FAILED, err));
  }
};

export const DeleteInquiry = (inquiryId) => async (dispatch) => {
  try {
    dispatch(Action(DELETE_INQUIRY));
    axios
      .delete(`${BASE_URL}/inquiry/${inquiryId}`)
      .then((res) => {
        dispatch(Action(DELETE_INQUIRY_SUCESS, res.data.data));
      })
      .catch((err) => {
        dispatch(Action(DELETE_INQUIRY_FAILED, err));
      });
  } catch (err) {
    console.error(err);
    dispatch(Action(DELETE_INQUIRY_FAILED, err));
  }
};
