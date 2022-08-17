import Axios from "axios";
import { toast } from "react-toastify";
import {
  EXPERT_UPDATE_PROFILE_FAIL,
  EXPERT_UPDATE_PROFILE_REQUEST,
  EXPERT_UPDATE_PROFILE_SUCCESS,
  EXPERT_UPDATE_REQUEST,
  EXPERT_UPDATE_SUCCESS,
  EXPERT_UPDATE_FAIL,
  EXPERT_DELETE_REQUEST,
  EXPERT_DELETE_SUCCESS,
  EXPERT_DELETE_FAIL,
  EXPERT_DETAILS_FAIL,
  EXPERT_DETAILS_REQUEST,
  EXPERT_DETAILS_SUCCESS,
} from "../constants/expertConstants ";
import { EXPERT_SIGNIN_SUCCESS } from "../constants/userConstants";

export const updateExpertProfile = (expert) => async (dispatch, getState) => {
  dispatch({ type: EXPERT_UPDATE_PROFILE_REQUEST, payload: expert });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      ` ${process.env.REACT_APP_API_KEY}expert/profile`,
      expert,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: EXPERT_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: EXPERT_SIGNIN_SUCCESS, payload: data });
    toast.success("✅ profile updated successfully! 😊");
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EXPERT_UPDATE_PROFILE_FAIL, payload: message });
    toast.error("❌ profile update failed 😔", message);
  }
};

export const updateExpert = (expert) => async (dispatch, getState) => {
  dispatch({ type: EXPERT_UPDATE_REQUEST, payload: expert });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_API_KEY}expert/${expert._id}`,
      expert,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: EXPERT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EXPERT_UPDATE_FAIL, payload: message });
  }
};
export const detailsExpert = (expertId) => async (dispatch, getState) => {
  dispatch({ type: EXPERT_DETAILS_REQUEST, payload: expertId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_API_KEY}expert/admin/${expertId}`,
      {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      }
    );

    dispatch({ type: EXPERT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EXPERT_DETAILS_FAIL, payload: message });
  }
};
export const deleteExpert = (expertId) => async (dispatch, getState) => {
  dispatch({ type: EXPERT_DELETE_REQUEST, payload: expertId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(
      `${process.env.REACT_APP_API_KEY}expert/${expertId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: EXPERT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EXPERT_DELETE_FAIL, payload: message });
  }
};
