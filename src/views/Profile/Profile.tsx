import React, { SetStateAction, useState } from "react";
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
import WithHeader from "../../Layout/WithHeader";
import { Avatar } from "antd";
import ModificableInput from "../../components/ModificableInput";

const Profile = () => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("roger");
  const [email, setEmail] = useState<string>("roger.salengro@gmail.com");
  const [birthDate, setBirthDate] = useState<string>("10/02/1970");
  const [phoneNumber, setPhoneNumber] = useState<string>("+33641893207");

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange =
    (setState: React.Dispatch<SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };

  return (
    <WithHeader>
      <>
        <div className="profileLayout">
          <div className="userSettings profileCard">
            <div className="userInfos">
              <div className="avatarContainer">
                <Avatar
                  size={{ xl: 100 }}
                  src={`https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${localStorage.getItem(
                    "jwt"
                  )}`}
                />
              </div>
              <ModificableInput
                value={username}
                onChange={handleChange(setUsername)}
                label="Username"
              />
              <ModificableInput
                value={email}
                onChange={handleChange(setEmail)}
                label="EMail"
              />
              <ModificableInput
                value={birthDate}
                onChange={handleChange(setBirthDate)}
                label="Birthdate"
              />
              <ModificableInput
                value={phoneNumber}
                onChange={handleChange(setPhoneNumber)}
                label="Phone number"
              />
            </div>
            <hr />
            <div className="interestsSettings"></div>
            <hr />
            <div className="actionButtons"></div>
          </div>
          <div className="savedTripsList profileCard"></div>
        </div>
        <DeleteAccountModal
          showDelete={showDelete}
          setShowDelete={setShowDelete}
        />
      </>
    </WithHeader>
  );
};

export default Profile;
