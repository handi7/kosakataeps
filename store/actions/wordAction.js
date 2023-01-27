import axios from "axios";
import { GET_WORDS, LOADING, SAMPLE_ERROR } from "../types";

export const getKamus = async (dispatch, word) => {
  try {
    if (!word) return dispatch({ type: LOADING, payload: false });
    dispatch({ type: LOADING, payload: true });
    const res = await axios.get(`/api/getKamus/${word}`);
    dispatch({ type: GET_WORDS, payload: res.data });
  } catch (error) {}
};

export const getAntonim = async (dispatch, word) => {
  try {
    if (!word) return dispatch({ type: LOADING, payload: false });
    dispatch({ type: LOADING, payload: true });
    const res = await axios.get(`/api/getAntonim/${word}`);
    dispatch({ type: GET_WORDS, payload: res.data });
  } catch (error) {}
};

export const getSinonim = async (dispatch, word) => {
  try {
    if (!word) return dispatch({ type: LOADING, payload: false });
    dispatch({ type: LOADING, payload: true });
    const res = await axios.get(`/api/getSinonim/${word}`);
    dispatch({ type: GET_WORDS, payload: res.data });
  } catch (error) {}
};
