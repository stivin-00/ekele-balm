import {
    WITHDRAWAL_LIST_FAIL,
    WITHDRAWAL_LIST_REQUEST,
    WITHDRAWAL_LIST_SUCCESS,
  } from '../constants/withdrawalConstants';


export const withdrawalListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case WITHDRAWAL_LIST_REQUEST:
        return { loading: true };
      case WITHDRAWAL_LIST_SUCCESS:
        return { loading: false, withdrwals: action.payload };
      case WITHDRAWAL_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };