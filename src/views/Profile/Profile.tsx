import React, { SetStateAction, useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
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
import { Avatar, Button } from "antd";
import ModificableInput from "../../components/ModificableInput";
import { useSelector } from "react-redux";
import { getSavedTrips } from "../../reducers/trips.reducers";
import { useGetTrips } from "../../hooks/useGetTrips";
import { SaveAltRounded } from "@mui/icons-material";

type UserSettings = {
  username: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
};

const Profile = () => {
  const trips = useSelector(getSavedTrips);
  const [getTripsStatus, getTrips] = useGetTrips();

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    username: "roger",
    email: "roger.salengro@gmail.com",
    birthDate: "10/02/1970",
    phoneNumber: "+33641823207"
  });
  const originalUserSettings: UserSettings = {
    username: "roger",
    email: "roger.salengro@gmail.com",
    birthDate: "10/02/1970",
    phoneNumber: "+33641823207"
  };

  const navigate = useNavigate();
  const { t } = useTranslation();

  const hasSettingsChanged = () =>
    userSettings.birthDate !== originalUserSettings.birthDate ||
    userSettings.email !== originalUserSettings.email ||
    userSettings.username !== originalUserSettings.username ||
    userSettings.phoneNumber !== originalUserSettings.phoneNumber;

  const handleChange =
    (key: keyof UserSettings) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserSettings((prev) => ({ ...prev, [key]: event.target.value }));
    };

  useEffect(() => {
    if (!trips.length) {
      getTrips();
    }
  }, []);

  return (
    <WithHeader>
      <>
        <div className="profileLayout">
          <div className="userSettings profileCard">
            <div className="userInfos">
              <div className="avatarContainer">
                <Avatar
                  className="avatar"
                  src={`https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${localStorage.getItem(
                    "jwt"
                  )}`}
                />
              </div>
              <ModificableInput
                value={userSettings.username}
                onChange={handleChange("username")}
                label="Username"
              />
              <ModificableInput
                value={userSettings.email}
                onChange={handleChange("email")}
                label="EMail"
              />
              <ModificableInput
                value={userSettings.birthDate}
                onChange={handleChange("birthDate")}
                label="Birthdate"
              />
              <ModificableInput
                value={userSettings.phoneNumber}
                onChange={handleChange("phoneNumber")}
                label="Phone number"
              />
            </div>
            <hr />
            <div className="interestsSettings"></div>
            <hr />
            <div className="actionButtons">
              <Button type="primary" disabled={!hasSettingsChanged()}>
                {t("profile.saveChanges")}
              </Button>
              <Button danger>{t("profile.changePassword")}</Button>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setShowDelete(true);
                }}
              >
                {t("profile.deleteAccount")}
              </Button>
            </div>
          </div>
          <div className="savedTripsList profileCard">
            <h3>{t("profile.savedTrips")}</h3>
            {getTripsStatus.loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <>
                {trips.length ? (
                  <div>
                    {trips.map((trip, i) => (
                      <div key={i}>{trip.cityName}</div>
                    ))}
                  </div>
                ) : (
                  <div className="emptyTripList">
                    <SaveAltRounded
                      sx={{ height: 100, width: 100, color: "lightgray" }}
                    />
                    <p>{t("profile.findYourSavedTripsHere")}</p>
                  </div>
                )}
              </>
            )}
          </div>
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
