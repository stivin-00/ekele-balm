import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import "./widgetLg.css";
import { Visibility } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

export default function WidgetLg() {
  const [appointments, setAppointments] = useState([]);
  // redux
  const history = useHistory();
  const dispatch = useDispatch();
  const appointmentList = useSelector((state) => state.appointmentList);

  useEffect(() => {
    if (appointmentList.appointments) {
      setAppointments(appointmentList?.appointments);
    }
  }, [appointmentList]);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Appointments</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Expert</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {appointments &&
          appointments.map((data, index) => (
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{data?.userName}</span>
              </td>
              <td className="widgetLgExpert">
                <span className="widgetLgName">{data?.expertName}</span>
              </td>
              <td className="widgetLgDate">
                <p>{new Date(data?.time).toDateString()}</p>
                <p style={{ color: "#20c997" }}>
                  {new Date(data?.time).toLocaleTimeString()}
                </p>
              </td>
              <td className="widgetLgAmount">${data?.amount}</td>
              <td className="widgetLgStatus">
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
  );
}
