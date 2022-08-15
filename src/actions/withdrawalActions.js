import Axios from "axios";
import { toast } from "react-toastify";
import {
  WITHDRAWAL_DETAILS_FAIL,
  WITHDRAWAL_DETAILS_REQUEST,
  WITHDRAWAL_DETAILS_SUCCESS,
  WITHDRAWAL_UPDATE_PROFILE_REQUEST,
  WITHDRAWAL_LIST_REQUEST,
  WITHDRAWAL_LIST_SUCCESS,
  WITHDRAWAL_LIST_FAIL,
  WITHDRAWAL_DELETE_REQUEST,
  WITHDRAWAL_DELETE_SUCCESS,
  WITHDRAWAL_DELETE_FAIL,
  WITHDRAWAL_UPDATE_SUCCESS,
  WITHDRAWAL_UPDATE_FAIL,
} from "../constants/withdrawalConstants";

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: WITHDRAWAL_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `https://jumstore-store.herokuapp.com/api/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      }
    );

    dispatch({ type: WITHDRAWAL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WITHDRAWAL_DETAILS_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: WITHDRAWAL_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `https://jumstore-store.herokuapp.com/api/users/${user._id}`,
      user,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: WITHDRAWAL_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WITHDRAWAL_UPDATE_FAIL, payload: message });
  }
};
export const listWithdrawals = () => async (dispatch, getState) => {
  dispatch({ type: WITHDRAWAL_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(
      `${process.env.REACT_APP_API_KEY}withdraw/all`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: WITHDRAWAL_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WITHDRAWAL_LIST_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: WITHDRAWAL_DELETE_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(
      `https://jumstore-store.herokuapp.com/api/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: WITHDRAWAL_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WITHDRAWAL_DELETE_FAIL, payload: message });
  }
};
