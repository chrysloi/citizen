import { combineReducers } from "redux";
import { categoriesReducer } from "./category";
import { cellsReducer } from "./cells";
import { inquiriesReducer } from "./inquiry";
import {
  loginUserReducer,
  logoutUserReducer,
  RegisterUserReducer,
  usersReducer,
} from "./users";
import { villagesReducer } from "./village";
import { commentsReducer } from "./comments";

export default combineReducers({
  users: usersReducer,
  cells: cellsReducer,
  villages: villagesReducer,
  register: RegisterUserReducer,
  login: loginUserReducer,
  logout: logoutUserReducer,
  categories: categoriesReducer,
  inquiries: inquiriesReducer,
  comments: commentsReducer,
});
