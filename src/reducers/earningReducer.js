export const earningDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case "EARNING_DETAILS_REQUEST":
        return { loading: true };
      case "EARNING_DETAILS_SUCCESS":
        return { loading: false, data: action.payload };
      case "EARNING_DETAILS_FAIL":
        return { loading: false, error: action.payload };
      case "CLEAR_EARNING_DETAILS":
        return {};
      default:
        return state;
    }
  };