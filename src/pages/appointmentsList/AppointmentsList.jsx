import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./appointmentsList.css";
import { toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { listUsers } from "../../actions/userActions";
import { listAppointments } from "../../actions/appointmentActions";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  // redux
  const history = useHistory();
  const dispatch = useDispatch();
  const appointmentList = useSelector((state) => state.appointmentList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {
    dispatch(listAppointments());
  }, []);

  useEffect(() => {
    if (appointmentList.appointments) {
      console.log(appointmentList?.appointments);
      setAppointments(appointmentList?.appointments);
    }
  }, [appointmentList]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const verifyAppointment = async (data) => {
    if (window.confirm("Do you confirm this meeting held?")) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_KEY}appointments/${data._id}`,
          data,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        console.log("data=>", response);
        if (response.data.message === "ok") {
          dispatch(listAppointments());
        }
      } catch (error) {
        console.log("error", error);
        const message =
          (await error.response) && error.response.data.message
            ? error.response.data.message
            : error.message;
        toast.error(message);
      }
    }
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="userList withdrwal-list">
          <span className="widgetSmTitle">Appointments</span>
          <table className="widgetLgTable">
            <tr className="widgetLgTr">
              <th className="widgetLgTh">S/N</th>
              <th className="widgetLgTh">Customer</th>
              <th className="widgetLgTh">Expert</th>
              <th className="widgetLgTh">Duration</th>
              <th className="widgetLgTh">Date</th>
              <th className="widgetLgTh">Amount</th>
              <th className="widgetLgTh">Link</th>
              <th className="widgetLgTh">conferenceId</th>
              <th className="widgetLgTh">Status of meet</th>
              <th className="widgetLgTh">confirm it held</th>
            </tr>
            {appointments &&
              appointments.map((data, index) => (
                <tr className="widgetLgTr" key={index}>
                  <td className="widgetLgAmount">{index + 1}</td>
                  <td className="widgetLgAmount">{data?.userName}</td>

                  <td className="widgetLgAmount">{data?.expertName}</td>
                  <td className="widgetLgAmount">{data?.duration}</td>
                  <td className="widgetLgDate">
                    <p>{new Date(data?.time).toDateString()}</p>
                    <p style={{ color: "#20c997" }}>
                      {new Date(data?.time).toLocaleTimeString()}
                    </p>
                  </td>
                  <td className="widgetLgAmount">${data?.amount}</td>
                  <td className="widgetLgAmount">{data?.googleMeetLink}</td>
                  <td className="widgetLgAmount">{data?.conferenceId}</td>
                  <td className="widgetLgStatus">
                    {data?.isComplete ? (
                      <span className="success-table">completed</span>
                    ) : (
                      <span className="error-table">pending</span>
                    )}
                  </td>
                  <td className="widgetLgStatus">
                    {data?.isComplete ? (
                      <Button disabled={true} type="confirmed" />
                    ) : (
                      <button
                        onClick={() => verifyAppointment(data)}
                        type="subit"
                      >
                        yes
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </>
  );
}
