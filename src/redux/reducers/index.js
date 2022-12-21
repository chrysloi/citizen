import { combineReducers } from "redux";
import { cellsReducer } from "./cells";
import { usersReducer } from "./users";
import { villagesReducer } from "./village";

export default combineReducers({
  users: usersReducer,
  cells: cellsReducer,
  villages: villagesReducer,
});
