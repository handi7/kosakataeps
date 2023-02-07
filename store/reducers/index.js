import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import wordsReducer from "./wordsReducer";

export default combineReducers({
  words: wordsReducer,
  search: searchReducer,
});
