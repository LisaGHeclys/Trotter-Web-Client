import React from "react";
import { Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "./DeleteAccountModal.utils";
import "./DeleteAccountModal.scss";
import handleError from "../../../utils/ToastUtils";

import alertIcon from "../../../assets/profile/alert.svg";
import closeIcon from "../../../assets/profile/Close.svg";

type DeleteAccountModalProps = {
  setShowDelete: (value: boolean) => void;
  showDelete: boolean;
};

const DeleteAccountModal = ({
  setShowDelete,
  showDelete
}: DeleteAccountModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const DeleteAccount = async () => {
    try {
      await deleteUser(localStorage.getItem("jwt") || "");
      localStorage.clear();
      navigate("/");
    } catch (e) {
      console.log(e);
      handleError(e);
    }
  };

  return (
    <div className="DeleteAccount">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showDelete}
        closeAfterTransition
      >
        <div className="DeleteAccountContent">
          <div className="ModalTitle">
            <h1 id="transition-modal-title">
              {t("description.profileDeletePart1")}
            </h1>
            <img className="AlertIcon" src={alertIcon} alt="" />
            <img
              className="CloseButton"
              src={closeIcon}
              alt=""
              onClick={() => setShowDelete(false)}
            />
          </div>
          <hr />
          <h3>
            {t("description.profileDeletePart2")}
            <br />
            {t("description.profileDeletePart3")}
          </h3>
          <div className="DeleteAccountButton">
            <button
              className="CancelButton"
              onClick={() => setShowDelete(false)}
            >
              Cancel
            </button>
            <button className="DeleteButton" onClick={() => DeleteAccount()}>
              DELETE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteAccountModal;
