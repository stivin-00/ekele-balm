import {
    APPOINTMENT_LIST_FAIL,
    APPOINTMENT_LIST_REQUEST,
    APPOINTMENT_LIST_SUCCESS,
  } from '../constants/appointmentConstants';


export const appointmentListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case APPOINTMENT_LIST_REQUEST:
        return { loading: true };
      case APPOINTMENT_LIST_SUCCESS:
        return { loading: false, appointments: action.payload };
      case APPOINTMENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };