import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeleteAccountModal from "./DeleteAccountModal/DeleteAccountModal";
import Navbar from "../../components/Navbar/ProfileNavbar/ProfileNavbar";
import "./Profile.scss";

import backArrowIcon from "../../assets/profile/backArrow.svg";
import calendarIcon from "../../assets/profile/calendar.svg";
import deleteIcon from "../../assets/profile/delete.svg";
import destinationIcon from "../../assets/profile/destination.svg";
import filterIcon from "../../assets/profile/Filter.svg";
import groupImage from "../../assets/profile/group.svg";
import savedIcon from "../../assets/profile/saved.svg";
import settingIcon from "../../assets/profile/setting.svg";

const Profile = () => {
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const ProfileData = [
    {
      id: 1,
      name: t("description.profilePart4"),
      image: destinationIcon
    },
    {
      id: 2,
      name: t("description.profilePart5"),
      image: savedIcon
    },
    {
      id: 3,
      name: t("description.profilePart5"),
      image: calendarIcon
    }
  ];

  return (
    <div>
      <Navbar></Navbar>
      <div className="ProfileSection">
        <button onClick={() => navigate("/")}>
          <img src={backArrowIcon} alt="" />
        </button>
        <div className="ProfileContent">
          <Grid className="GridProfileHeader" container rowGap={10}>
            <Grid className="ProfileImageOutLet" item xs={12} md={4}>
              <div className="ProfileImage">
                <img src={groupImage} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className="ActionButton">
                <button>
                  <img src={settingIcon} alt="" />
                </button>
                <button onClick={() => setShowDelete(true)}>
                  <img src={deleteIcon} alt="" />
                </button>
              </div>
              <div className="UserInfo">
                <h3>{t("general.email")}</h3>
                <h3>{t("general.password")}</h3>
              </div>
            </Grid>
          </Grid>
          <div className="Filter" onClick={() => console.log("setting")}>
            <button>
              <img src={filterIcon} alt="" />
            </button>
            <h3>{t("description.profilePart3")}</h3>
          </div>
          <Grid container spacing={4}>
            {ProfileData.map((data) => (
              <Grid item xs={12} md={4} key={data.id}>
                <div className="ProfileItem">
                  <img src={data.image} alt="" />
                  <h3>{data.name}</h3>
                </div>
              </Grid>
            ))}
          </Grid>
          <div className="Logout">
            <button>
              <strong className="text">LOG OUT</strong>
            </button>
          </div>
        </div>
      </div>
      <DeleteAccountModal
        showDelete={showDelete}
        setShowDelete={setShowDelete}
      />
    </div>
  );
};

export default Profile;
