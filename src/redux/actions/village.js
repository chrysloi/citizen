import { Action } from "../../utils";
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
import { BASE_URL } from "../../utils";
import axios from "axios";

export const GetVillages =
  ({ cellId, villageId }) =>
  (dispatch) => {
    try {
      let params = "?";
      if (cellId) {
        params += `cellId=${cellId}&`;
      } else if (villageId) {
        params += `villageId=${villageId}`;
      }
      dispatch(Action(GET_VILLAGES));
      axios
        .get(`${BASE_URL}/village${params}`)
        .then((res) => {
          dispatch(Action(GET_VILLAGES_SUCESS, res.data.data));
        })
        .catch((err) => {
          dispatch(Action(GET_VILLAGES_FAILED, err));
        });
    } catch (error) {
      console.error(error);
    }
  };

export const CreateVillage = (data) => (dispatch) => {
  try {
    dispatch(Action(CREATE_VILLAGE));
    axios
      .post(`${BASE_URL}/village`, data)
      .then((res) => {
        dispatch(Action(CREATE_VILLAGE_SUCESS, res.data.data));
      })
      .catch((err) => {
        dispatch(Action(CREATE_VILLAGE_FAILED, err));
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateVillage = (data) => (dispatch) => {
  try {
    dispatch(Action(UPDATE_VILLAGE));
    axios
      .patch(`${BASE_URL}/village/${data.id}`, data)
      .then((res) => {
        dispatch(Action(UPDATE_VILLAGE_SUCESS, res.data.data));
      })
      .catch((err) => {
        dispatch(Action(UPDATE_VILLAGE_FAILED, err));
      });
  } catch (error) {
    console.error(error);
  }
};
