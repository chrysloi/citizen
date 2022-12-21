import { Action } from "../../utils";
import { GET_CELLS, GET_CELLS_SUCESS, GET_CELLS_FAILED } from "../types";
import { BASE_URL } from "../../utils";
import axios from "axios";

export const GetCells = () => (dispatch) => {
  dispatch(Action(GET_CELLS));
  axios
    .get(`${BASE_URL}/cell`)
    .then((res) => {
      dispatch(Action(GET_CELLS_SUCESS, res.data.data));
    })
    .catch((err) => {
      dispatch(Action(GET_CELLS_FAILED, err));
    });
};
