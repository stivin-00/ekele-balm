import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./appointmentsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
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
  useEffect(() => {
    dispatch(listAppointments());
  }, []);

  useEffect(() => {
    if (appointmentList.appointments) {
      setAppointments(appointmentList?.appointments);
    }
  }, [appointmentList]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="userList withdrwal-list">
          <span className="widgetSmTitle">Appointments</span>
          <table className="widgetLgTable">
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Customer</th>
              <th className="widgetLgTh">Expert</th>
              <th className="widgetLgTh">Duration</th>
              <th className="widgetLgTh">Date</th>
              <th className="widgetLgTh">Amount</th>
              <th className="widgetLgTh">Link</th>
              <th className="widgetLgTh">Status</th>
            </tr>
            {appointments &&
              appointments.map((data, index) => (
                <tr className="widgetLgTr" key={index}>
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
                  <td
                    className="widgetLgStatus"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {data?.isComplete ? (
                      <span className="success-table">completed</span>
                    ) : (
                      <span className="error-table">pending</span>
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
