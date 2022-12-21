import { GET_CELLS, GET_CELLS_FAILED, GET_CELLS_SUCESS } from "../types";
import { initialState } from "../../utils";

export const cellsReducer = (
  state = { ...initialState, cells: [] },
  { type, payload }
) => {
  switch (type) {
    case GET_CELLS:
      return {
        ...state,
        loading: true,
      };
    case GET_CELLS_SUCESS:
      return {
        ...state,
        loading: false,
        cells: payload,
      };
    case GET_CELLS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
