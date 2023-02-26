import axios from "axios";
import { API_URL } from "../../constants";
import { GET_WORDS, LOADING } from "../types";

export const getKamus = async (dispatch, word) => {
  try {
    if (!word) return dispatch({ type: LOADING, payload: false });
    dispatch({ type: LOADING, payload: true });
    const res = await axios.get(`${API_URL}/word/?key=${word}`);
    dispatch({ type: GET_WORDS, payload: res.data.data });
  } catch (error) {}
};

export const getAntonim = async (dispatch, word) => {
  try {
    if (!word) return dispatch({ type: LOADING, payload: false });
    dispatch({ type: LOADING, payload: true });
    const res = await axios.get(`${API_URL}/antonym/?key=${word}`);
    dispatch({ type: GET_WORDS, payload: res.data.data });
  } catch (error) {}
};

export const getSinonim = async (dispatch, word) => {
  try {
    if (!word) return dispatch({ type: LOADING, payload: false });
    dispatch({ type: LOADING, payload: true });
    const res = await axios.get(`${API_URL}/synonym/?key=${word}`);
    dispatch({ type: GET_WORDS, payload: res.data.data });
  } catch (error) {}
};
