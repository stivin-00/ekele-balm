import React, { useState, useEffect } from "react";
import "./withdrawList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { useHistory, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { listWithdrawals } from "../../actions/withdrawalActions";

export default function WithdrawList() {
  const [withdrwals, setWithdrwals] = useState([]);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  // redux
  const history = useHistory();
  const dispatch = useDispatch();
  const withdrawalList = useSelector((state) => state.withdrawalList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    dispatch(listWithdrawals());
  }, []);

  useEffect(() => {
    if (withdrawalList.withdrwals) {
      setWithdrwals(withdrawalList?.withdrwals);
    }
    console.log("withdrawalList", withdrawalList?.withdrwals);
  }, [withdrawalList]);

  const payExpert = async (data) => {
    console.log("pay data=>", data);
    if (window.confirm("Do you confirm you paid the requested amount?")) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_KEY}expert/pay`,
          data,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        console.log("data=>", response);
        if (response.data.message === "ok") {
          dispatch(listWithdrawals());
        }
      } catch (error) {
        console.log("error", error);
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      }
    }
  };

  return (
    <>
      <Topbar />
      <div className="container ">
        <Sidebar />
        <div className="withdrwal-list">
          <span className="widgetSmTitle">Expert Withdrawal Request</span>
          <table className="widgetLgTable">
            <tr className="widgetLgTr">
              <th className="widgetLgTh">S/N</th>
              <th className="widgetLgTh">Expert Name</th>
              <th className="widgetLgTh">Account Name</th>
              <th className="widgetLgTh">Bank Name</th>
              <th className="widgetLgTh">Account Number</th>
              <th className="widgetLgTh">Amount</th>
              <th className="widgetLgTh">Date </th>
              <th className="widgetLgTh">Paid ?</th>
              <th className="widgetLgTh">Actoin ?</th>
            </tr>
            {withdrwals &&
              withdrwals?.map((data, index) => (
                <tr className="widgetLgTr" key={index}>
                  <td className="widgetLgAmount">{index}</td>
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{data?.expertName}</span>
                  </td>
                  <td className="widgetLgExpert">
                    <span className="widgetLgName">{data?.accountName}</span>
                  </td>
                  <td className="widgetLgExpert">
                    <span className="widgetLgName">{data?.bankName}</span>
                  </td>
                  <td className="widgetLgExpert">
                    <span className="widgetLgName">{data?.accountNumber}</span>
                  </td>
                  <td className="widgetLgAmount">${data?.amount}</td>
                  <td className="widgetLgDate">
                    <p>{new Date(data?.createdAt).toDateString()}</p>
                    <p style={{ color: "#20c997" }}>
                      {new Date(data?.createdAt).toLocaleTimeString()}
                    </p>
                  </td>
                  <td
                    className="widgetLgAmount"
                  >
                    {data.isPaid ? (
                      <span className="success-table">Yes</span>
                    ) : (
                      <span className="error-table">No</span>
                    )}
                  </td>

                  <td className="widgetLgStatus">
                    {data?.isPaid ? (
                      <Button disabled={true} type="paid" />
                    ) : (
                      <button onClick={() => payExpert(data)} type="subit">
                        pay
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
