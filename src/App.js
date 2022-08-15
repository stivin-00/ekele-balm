import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ExpertList from "./pages/expertList/ExpertList";
import Expert from "./pages/expert/Expert";
import NewProduct from "./pages/newProduct/NewProduct";
import Auth from "./pages/auth/Auth";
import Signin from "./pages/signin/Signin";
import WithdrawList from "./pages/withdralList/WithdrawList";
import AppointmentsList from "./pages/appointmentsList/AppointmentsList";
// import Signing from "./pages/signin/Signin";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path="/" component={Auth}></Route>
        <Route
          exact
          path="/auth/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY0ZTA2ZTQyZDU1OGJkNzg5NWI4NDEiLCJuYW1lIjoiQmFsbSBBSSIsImVtYWlsIjoiYmFsbXRlY2hub2xvZ2llc0BnbWFpbC5jb20iLCJpc0V4cGVydCI6ZmFsc2UsImlhdCI6MTY2MDIyMTAyMiwiZXhwIjoxNjg2MTQxMDIyfQ.DCgm_0eTyhUjoaWYZVOdNgbXOhQ-1eabA7kBlGrypvs/:emailId"
          component={Signin}
        ></Route>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/users" exact component={UserList}></PrivateRoute>
        <PrivateRoute
          path="/user/:userId"
          exact
          component={User}
        ></PrivateRoute>
        <PrivateRoute
          path="/appointments"
          exact
          component={AppointmentsList}
        ></PrivateRoute>
        <PrivateRoute
          path="/experts"
          exact
          component={ExpertList}
        ></PrivateRoute>
        <PrivateRoute
          path="/expert/:expertId"
          exact
          component={Expert}
        ></PrivateRoute>
        <PrivateRoute
          path="/withdrawals/:withdrawalId"
          exact
          component={Expert}
        ></PrivateRoute>
        <PrivateRoute
          path="/withdrawals"
          exact
          component={WithdrawList}
        ></PrivateRoute>
        <PrivateRoute
          path="/newexpert"
          exact
          component={NewProduct}
        ></PrivateRoute>
      </Switch>
      {/* </div> */}
    </Router>
  );
}

export default App;
