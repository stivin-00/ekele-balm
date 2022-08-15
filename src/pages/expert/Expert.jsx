import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./expert.css";
import {
  CalendarToday,
  LocationSearching,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";

import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { detailsExpert, updateExpert } from "../../actions/expertActions";

export default function Product() {
  const [expert, setExpert] = useState({});
  const [dob, setDob] = useState("");
  // redux
  const history = useHistory();
  const dispatch = useDispatch();
  const expertDetails = useSelector((state) => state.expertDetails);
  const expertUpdate = useSelector((state) => state.expertUpdate);

  let { expertId } = useParams();

  useEffect(() => {
    if (expertId) {
      dispatch(detailsExpert(expertId));
    }
  }, [dispatch, expertId]);

  useEffect(() => {
    console.log("expert==>", expertDetails.expert);
    if (expertDetails.expert) {
      setExpert(expertDetails?.expert);
    }
  }, [expertDetails]);

  useEffect(() => {
    if (expert.dateOfBirth) {
      let date = new Date(
        expert?.dateOfBirth?.year,
        expert?.dateOfBirth?.month + 1,
        expert?.dateOfBirth?.day
      ).toLocaleDateString();
      console.log(date);
      setDob(date);
    }
  }, [expert]);
  const verifyExpert = async () => {
    let data = {
      _id: expert._id,
      isVerified: !expert.isVerified,
      accountStatus: "active",
    };
    if (
      window.confirm(
        "Do you really want to change the verification status of this expert"
      )
    ) {
      await dispatch(updateExpert(data));
      dispatch(detailsExpert(expertId));
    }
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="expert">
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={
                    expert?.profileImg?.url ||
                    "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  }
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{expert?.name}</span>
                  <span className="userShowUserTitle">
                    {expert?.specialization}
                  </span>
                </div>
              </div>
              <div className="userShowInfo">
                <span className="userShowIcon">Verified:</span>
                {expert?.isVerified ? (
                  <span className="userShowInfoTitle success">Yes</span>
                ) : (
                  <span className="userShowInfoTitle error">No</span>
                )}
              </div>
              <div className="userShowInfo">
                <span className="userShowIcon">Languages:</span>
                <span className="userShowInfoTitle">
                  {expert?.language &&
                    expert.language.map((lan, index) => (
                      <span
                        key={index}
                        style={{
                          padding: "1px",
                          margin: "3px",
                          backgroundColor: "#e5faf2",
                        }}
                      >
                        {lan?.key}
                      </span>
                    ))}
                </span>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{expert?.email}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">{dob}</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{expert?.phone}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {expert?.address1} {expert?.address2} {expert?.city}{" "}
                    {expert?.state} {expert?.country}
                  </span>
                </div>
                <span className="userShowTitle">Charges</span>
                <div className="userShowInfo">
                  <span className="userShowIcon">40 mins:</span>
                  <span className="userShowInfoTitle">${expert?.fortyMin}</span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowIcon">60 mins:</span>
                  <span className="userShowInfoTitle">${expert?.sixtyMin}</span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowIcon">80 mins:</span>
                  <span className="userShowInfoTitle">${expert?.eigtyMin}</span>
                </div>
                <span className="userShowTitle">Linces Details</span>
                <div className="userShowInfo">
                  <span className="userShowIcon">ID Card</span>
                  <span className="userShowInfoTitle">
                    <a
                      href={expert?.idCard?.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="userUpdateImg"
                        src={expert?.idCard?.url}
                        alt="idcard"
                      />
                    </a>
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowIcon">Lincense</span>
                  <span className="userShowInfoTitle">
                    <a
                      href={expert?.license?.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="userUpdateImg"
                        src={expert?.license?.url}
                        alt="idcard"
                      />
                    </a>
                  </span>
                </div>
                <span className="userShowTitle">Social Links</span>
                <div className="userShowInfo">
                  <span className="userShowIcon">Linkedin Url:</span>
                  <a
                    href={expert?.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="userShowInfoTitle">
                      {expert?.linkedinUrl ? "go to linkedin" : "not avaliable"}
                    </span>
                  </a>
                </div>
                <div className="userShowInfo">
                  <span className="userShowIcon">Instagram Url:</span>
                  <a
                    href={expert?.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="userShowInfoTitle">
                      {expert?.instagramUrl
                        ? "go to instagram"
                        : "not avaliable"}
                    </span>
                  </a>
                </div>
                <div className="userShowInfo">
                  <span className="userShowIcon">Twitter Url</span>
                  <a href={expert?.twitterUrl} target="_blank" rel="noreferrer">
                    <span className="userShowInfoTitle">
                      {expert?.twitterUrl ? "go to twitter" : "not avaliable"}
                    </span>
                  </a>
                </div>
                <span className="userShowTitle">Next of Kin</span>
                <div className="userShowInfo">
                  <span className="userShowIcon">name:</span>
                  <span className="userShowInfoTitle">
                    {expert?.nextOfKinName}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowIcon">email:</span>
                  <span className="userShowInfoTitle">
                    {expert?.nextOfKinEmail}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowIcon">phone:</span>
                  <span className="userShowInfoTitle">
                    {expert?.nextOfKinPhone}
                  </span>
                </div>
                <div className="userShowInfo">
                  <span className="userShowIcon">relation:</span>
                  <span className="userShowInfoTitle">
                    {expert?.nextOfKinRelation}
                  </span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Total Earned ($)</label>
                    <input
                      type="text"
                      disabled={true}
                      placeholder={expert?.account?.total}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Pending ($)</label>
                    <input
                      type="text"
                      disabled={true}
                      placeholder={expert?.account?.pending}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Withdrawn ($)</label>
                    <input
                      type="text"
                      disabled={true}
                      placeholder={expert?.account?.withdrawn}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Balance ($)</label>
                    <input
                      type="text"
                      disabled={true}
                      placeholder={expert?.account?.balance}
                      className="userUpdateInput"
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      className="userUpdateImg"
                      src={expert?.profileImg?.url}
                      alt=""
                    />
                    <input
                      type="file"
                      disabled
                      id="file"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </form>
              <div
                style={{
                  display: "flex",
                  width: "80%",
                  justifyContent: "space-between",
                  padding: "1rem",
                  margin: "1rem",
                }}
              >
                <button className="userUpdateButton" onClick={verifyExpert}>
                  {expertUpdate.loading
                    ? "LOADING..."
                    : "change verifcation status"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
