import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./featuredInfo.css";
import axios from "axios";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  const [loading, setLoading] = useState(false);
  const [infos, setInfos] = useState({});

  // redux
  const history = useHistory();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const fetchAccount = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}admin/infos`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log("infos=>", data);
      setInfos(data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error("❌  error!", message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchAccount();
    }
  }, [userInfo]);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{infos?.users}</span>
          <span className="featuredMoneyRate">
            <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">hello</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Experts</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{infos?.experts}</span>
          <span className="featuredMoneyRate">
            <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">how are doing</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Appointments</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{infos?.appointments}</span>
          <span className="featuredMoneyRate">
            <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">new numbers</span>
      </div>
    </div>
  );
}
