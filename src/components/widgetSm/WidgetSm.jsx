import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

export default function WidgetSm() {
  const [experts, setExperts] = useState([]);
  // redux
  const history = useHistory();
  const dispatch = useDispatch();
  const expertList = useSelector((state) => state.expertList);

  useEffect(() => {
    if (expertList.experts) {
      setExperts(expertList?.experts);
    }
  }, [expertList]);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Experts</span>
      <ul className="widgetSmList">
      {experts && experts?.map((data, index)=>(
        <li className="widgetSmListItem" key={index}>
          <img
            src={data?.profileImg?.url || "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{data?.name}</span>
            <span className="widgetSmUserTitle">{data?.specialization}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      ))}
      
        
      </ul>
    </div>
  );
}
