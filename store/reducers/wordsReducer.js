import { GET_WORDS, LOADING, SAMPLE_ERROR } from "../types";

const initialState = {
  words: [],
  loading: true,
};

const wordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
        words: action.payload,
        loading: false,
      };

    case LOADING:
      return { words: [], loading: action.payload };

    case SAMPLE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default wordsReducer;
