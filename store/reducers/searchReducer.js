import { SEARCH_TYPE, SEARCH_WORD } from "../types";

const initialState = {
  word: "",
  type: "kamus",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_WORD:
      return {
        ...state,
        word: action.payload,
      };

    case SEARCH_TYPE:
      return {
        ...state,
        type: action.payload,
      };

    default:
      return state;
  }
};

export default searchReducer;
