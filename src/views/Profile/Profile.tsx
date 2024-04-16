import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeleteAccountModal from "./DeleteAccountModal/DeleteAccountModal";
import "./Profile.scss";

import WithHeader from "../../Layout/WithHeader";
import { Avatar, Button } from "antd";
import ModificableInput from "../../components/ModificableInput";
import { useSelector } from "react-redux";
import { getSavedTrips } from "../../reducers/trips.reducers";
import { useGetTrips } from "../../hooks/useGetTrips";
import { SaveAltRounded } from "@mui/icons-material";
import MapPreview from "./MapPreview";
import { format } from "date-fns";
import { User, getUser } from "../../reducers/auth.reducers";
import { useEditUser } from "../../hooks/useEditUser";

const Profile = () => {
  const trips = useSelector(getSavedTrips);
  const originalUser = useSelector(getUser);
  const [getTripsStatus, getTrips] = useGetTrips();

  const [editUserStatus, editUser] = useEditUser();

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [user, setUser] = useState(originalUser);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleChange =
    (key: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({ ...prev, [key]: event.target.value }));
    };

  useEffect(() => {
    // get trips anyway, loss is not that big
    getTrips();
  }, []);

  useEffect(() => {
    setUser(originalUser);
  }, [originalUser]);

  return (
    <WithHeader>
      <>
        <div className="profileLayout">
          {user && (
            <div className="user profileCard">
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
                  value={user.username}
                  onChange={handleChange("username")}
                  label="Username"
                  editable
                />
                <ModificableInput
                  value={user.email}
                  onChange={handleChange("email")}
                  label="EMail"
                />
                {/* <ModificableInput
                  value={user.birthDate}
                  onChange={handleChange("birthDate")}
                  label="Birthdate"
                />
                <ModificableInput
                  value={user.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  label="Phone number"
                /> */}
              </div>
              <hr />
              <div className="interestsSettings"></div>
              <hr />
              <div className="actionButtons">
                <Button
                  type="primary"
                  disabled={
                    !(
                      user.birthDate !== originalUser.birthDate ||
                      user.email !== originalUser.email ||
                      user.username !== originalUser.username ||
                      user.phoneNumber !== originalUser.phoneNumber
                    )
                  }
                  loading={editUserStatus.loading}
                  onClick={() => editUser(user)}
                >
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
          )}
          <div className="savedTripsList profileCard">
            <h3>{t("profile.savedTrips")}</h3>
            {getTripsStatus.loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <>
                {trips.length ? (
                  <div className="tripsGrid">
                    {trips.map((trip, i) => {
                      const startDate = new Date(0).setUTCSeconds(
                        trip.startDate / 1000
                      );
                      const endDate = new Date(0).setUTCSeconds(
                        trip.endDate / 1000
                      );
                      return (
                        <div className="previewContainer" key={i}>
                          <div
                            className="tripInfo"
                            onClick={() => {
                              navigate(`/map?id=${trip.id}`);
                            }}
                          >
                            <span>{trip.cityName}</span>
                            <span>
                              {format(startDate, "dd MMM") +
                                " ➤ " +
                                format(endDate, "dd MMM")}
                            </span>
                            <span>{}</span>
                          </div>
                          <MapPreview trip={trip} />
                        </div>
                      );
                    })}
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
