import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { listUsers } from "../../actions/userActions";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  // redux
  const history = useHistory();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    if (userList.users) {
      setUsers(userList?.users);
    }
  }, [userList]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="userList withdrwal-list">
        <span className="widgetSmTitle">Users</span>
          <table className="widgetLgTable">
            <tr className="widgetLgTr">
              <th className="widgetLgTh">S/N</th>
              <th className="widgetLgTh">User Name</th>
              <th className="widgetLgTh">Email</th>
              <th className="widgetLgTh">Phone</th>
              <th className="widgetLgTh">Gender</th>
              <th className="widgetLgTh">State</th>
              <th className="widgetLgTh">Country</th>
            </tr>
            {users &&
              users?.map((data, index) => (
                <tr className="widgetLgTr" key={index}>
                  <td className="widgetLgAmount">{index}</td>
                  <td className="widgetLgUser">
                    <span className="widgetLgName">
                      <li className="widgetSmListItem" key={index}>
                        <img
                          src={
                            data?.profileImg?.url ||
                            data?.profileImg ||
                            "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                          }
                          alt=""
                          className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                          <span className="widgetSmUsername">{data?.name}</span>
                        </div>
                      </li>
                    </span>
                  </td>
                  <td className="widgetLgAmount">{data?.email}</td>
                  <td className="widgetLgAmount">{data?.phone}</td>
                  <td className="widgetLgAmount">{data?.gender}</td>
                  <td className="widgetLgAmount">{data?.state}</td>
                  <td className="widgetLgAmount">{data?.country}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </>
  );
}
