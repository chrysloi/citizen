import axios from "axios";
import { Action, BASE_URL } from "../../utils";
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

export const CreateCategory = (category) => async (dispatch) => {
  try {
    dispatch(Action(CREATE_CATEGORY));
    axios
      .post(`${BASE_URL}/category`, category)
      .then((res) => {
        dispatch(Action(CREATE_CATEGORY_SUCESS, res.data.data));
      })
      .catch((err) => {
        dispatch(Action(CREATE_CATEGORY_FAILED, err));
      });
  } catch (error) {
    console.error(error);
    dispatch(Action(CREATE_CATEGORY_FAILED, err));
  }
};

export const GetCategories =
  ({ categoryId }) =>
  async (dispatch) => {
    try {
      dispatch(Action(GET_CATEGORIES));
      let params = "?";
      if (categoryId) {
        params += `categoryId=${categoryId}`;
      }
      axios
        .get(`${BASE_URL}/category${params}`)
        .then((res) => {
          dispatch(Action(GET_CATEGORIES_SUCESS, res.data.data));
        })
        .catch((err) => {
          dispatch(Action(GET_CATEGORIES_FAILED, err));
        });
    } catch (error) {
      console.error(error);
      dispatch(Action(GET_CATEGORIES_FAILED, err));
    }
  };

export const UpdateCategory = (category) => async (dispatch) => {
  try {
    dispatch(Action(UPDATE_CATEGORY));
    axios
      .patch(`${BASE_URL}/category/${category.id}`, category)
      .then((res) => {
        dispatch(Action(UPDATE_CATEGORY_SUCESS, res.data.data));
      })
      .catch((err) => {
        dispatch(Action(UPDATE_CATEGORY_FAILED, err));
      });
  } catch (error) {
    console.error(error);
    dispatch(Action(UPDATE_CATEGORY_FAILED, err));
  }
};

export const DeleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch(Action(DELETE_CATEGORY));
    axios
      .delete(`${BASE_URL}/category/${categoryId}`)
      .then((res) => {
        dispatch(Action(DELETE_CATEGORY_SUCESS, res.data.data));
      })
      .catch((err) => {
        dispatch(Action(DELETE_CATEGORY_FAILED, err));
      });
  } catch (error) {
    console.error(error);
    dispatch(Action(DELETE_CATEGORY_FAILED, err));
  }
};
