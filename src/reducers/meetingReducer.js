export const addMeetingDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "MEETING_DETAILS_REQUEST":
      return { loading: true };
    case "MEETING_DETAILS_SUCCESS":
      return { loading: false, addMeetingInfo: action.payload };
    case "MEETING_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "CLEAR_MEETING_DETAILS":
      return {};
    default:
      return state;
  }
};
