import { combineReducers } from "redux";
import { categoriesReducer } from "./category";
import { cellsReducer } from "./cells";
import { inquiriesReducer } from "./inquiry";
import { loginUserReducer, usersReducer } from "./users";
import { villagesReducer } from "./village";

export default combineReducers({
  users: usersReducer,
  cells: cellsReducer,
  villages: villagesReducer,
  login: loginUserReducer,
  categories: categoriesReducer,
  inquiries: inquiriesReducer,
});
