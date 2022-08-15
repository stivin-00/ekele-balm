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
  EXPERT_UPDATE_PROFILE_RESET,
  EXPERT_DETAILS_RESET,
  EXPERT_UPDATE_RESET,
  EXPERT_DELETE_RESET,
} from "../constants/expertConstants ";

export const expertUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPERT_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case EXPERT_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case EXPERT_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case EXPERT_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
export const expertDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case EXPERT_DETAILS_REQUEST:
      return { loading: true };
    case EXPERT_DETAILS_SUCCESS:
      return { loading: false, expert: action.payload };
    case EXPERT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case EXPERT_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
export const expertUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPERT_UPDATE_REQUEST:
      return { loading: true };
    case EXPERT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case EXPERT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EXPERT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const expertDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPERT_DELETE_REQUEST:
      return { loading: true };
    case EXPERT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EXPERT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case EXPERT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
