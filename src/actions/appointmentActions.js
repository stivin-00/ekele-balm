import Axios from "axios";
import { toast } from "react-toastify";
import {
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_UPDATE_PROFILE_REQUEST,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_UPDATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
} from "../constants/appointmentConstants";

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: APPOINTMENT_DETAILS_REQUEST, payload: userId });
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

    dispatch({ type: APPOINTMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPOINTMENT_DETAILS_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: APPOINTMENT_UPDATE_PROFILE_REQUEST, payload: user });
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
    dispatch({ type: APPOINTMENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPOINTMENT_UPDATE_FAIL, payload: message });
  }
};
export const listAppointments = () => async (dispatch, getState) => {
  dispatch({ type: APPOINTMENT_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(
      `${process.env.REACT_APP_API_KEY}appointments`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: APPOINTMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPOINTMENT_LIST_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: APPOINTMENT_DELETE_REQUEST, payload: userId });
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
    dispatch({ type: APPOINTMENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPOINTMENT_DELETE_FAIL, payload: message });
  }
};
