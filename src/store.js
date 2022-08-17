import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { addMeetingDetailsReducer } from "./reducers/meetingReducer";
import { earningDetailsReducer } from "./reducers/earningReducer";
import {
  expertUpdateProfileReducer,
  expertDetailsReducer,
  expertUpdateReducer,
  expertDeleteReducer,
} from "./reducers/expertReducers ";
import { appointmentListReducer } from "./reducers/appointmentReducer";
import { withdrawalListReducer } from "./reducers/withdrawalReducer";

import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  expertListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : null,
  },
  addMeetingDetails: {
    addMeetingInfo: localStorage.getItem("meetingInfo")
      ? JSON.parse(localStorage.getItem("meetingInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Pay Now",
  },
};
const reducer = combineReducers({
  cart: cartReducer,
  addMeetingDetails: addMeetingDetailsReducer,
  earningDetails: earningDetailsReducer,
  appointmentList: appointmentListReducer,
  withdrawalList: withdrawalListReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  expertUpdateProfile: expertUpdateProfileReducer,
  userList: userListReducer,
  expertList: expertListReducer,
  expertDetails: expertDetailsReducer,
  expertDelete: expertDeleteReducer,
  expertUpdate: expertUpdateReducer,
  userDelete: userDeleteReducer,
  userAddressMap: userAddressMapReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
