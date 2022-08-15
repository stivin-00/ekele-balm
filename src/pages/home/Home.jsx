import React, { useState, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import { listUsers, listExperts } from "../../actions/userActions";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { userData } from "../../dummyData";
import { useHistory, Link, useParams } from "react-router-dom";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { listAppointments } from "../../actions/appointmentActions";
import { listWithdrawals } from "../../actions/withdrawalActions";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [experts, setExperts] = useState([]);
  // redux
  const history = useHistory();
  const dispatch = useDispatch();
  const expertList = useSelector((state) => state.expertList);
  const appointmentList = useSelector((state) => state.appointmentList);
  const withdrawalList = useSelector((state) => state.withdrawalList);
  const userList = useSelector((state) => state.userList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error, loading } = userSignin;

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listExperts());
    dispatch(listAppointments());
    dispatch(listWithdrawals());
  }, [dispatch]);

  useEffect(() => {
    if (expertList.experts) {
      console.log(expertList?.experts);
      setExperts(expertList?.experts);
    }
    if (userList.users) {
      console.log(userList.users);
      setUsers(userList.users);
    }
    if (appointmentList.appointments) {
      console.log("appointment", appointmentList.appointments);
    }
    if (withdrawalList.withdrwals) {
      console.log("withdrawals", withdrawalList.withdrwals);
    }
  }, [expertList, userList, appointmentList, withdrawalList]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <Chart
            data={userData}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <Chart
            data={userData}
            title="Appointments Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>
    </>
  );
}
