import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./expert.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { listExperts } from "../../actions/userActions";

export default function ExpertList() {
  const [experts, setExperts] = useState([]);
  // redux
  const history = useHistory();
  const dispatch = useDispatch();
  const expertList = useSelector((state) => state.expertList);

  useEffect(() => {
    dispatch(listExperts());
  }, [dispatch]);

  useEffect(() => {
    if (expertList.experts) {
      console.log(expertList?.experts)
      setExperts(expertList?.experts);
    }
  }, [expertList]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="userList withdrwal-list">
          <span className="widgetSmTitle">Experts</span>
          <table className="widgetLgTable">
            <tr className="widgetLgTr">
              <th className="widgetLgTh">S/N</th>
              <th className="widgetLgTh">Expert Name</th>
              <th className="widgetLgTh">Email</th>
              <th className="widgetLgTh">Phone</th>
              <th className="widgetLgTh">Gender</th>
              <th className="widgetLgTh">Timezone</th>
              <th className="widgetLgTh">State</th>
              <th className="widgetLgTh">Country</th>
              <th className="widgetLgTh">Account Status</th>
              <th className="widgetLgTh">Edit</th>
            </tr>
            {experts &&
              experts?.map((data, index) => (
                <tr className="widgetLgTr" key={index}>
                  <td className="widgetLgAmount">{index + 1}</td>
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
                          <span className="widgetSmUserTitle">
                            {data?.specialization}
                          </span>
                        </div>
                      </li>
                    </span>
                  </td>
                  <td className="widgetLgAmount">{data?.email}</td>
                  <td className="widgetLgAmount">{data?.phone}</td>
                  <td className="widgetLgAmount">{data?.gender}</td>
                  <td className="widgetLgAmount">{data?.timezone?.value}</td>
                  <td className="widgetLgAmount">{data?.state}</td>
                  <td className="widgetLgAmount">{data?.country}</td>
                  <td
                    className="widgetLgAmount"
                  >
                    {data.isVerified ? (
                      <span className="success-table">Verified</span>
                    ) : (
                      <span className="error-table">Pending</span>
                    )}
                  </td>
                  <td className="widgetLgAmount"><Link to={`/expert/${data?._id}`}>edit</Link></td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </>
  );
}
