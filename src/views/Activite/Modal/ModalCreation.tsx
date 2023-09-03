import React from "react";
import { Modal } from "@mui/material";
import "./ModalCreation.scss";

import closeIcon from "../../../assets/shared/Close.svg";

type DeleteAccountModalProps = {
  setShowCreation: (value: boolean) => void;
  showCreation: boolean;
};

const ModalCreation = ({
  setShowCreation,
  showCreation
}: DeleteAccountModalProps) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showCreation}
        closeAfterTransition
      >
        <div className="ModalContent">
          <img
            className="CloseButton"
            src={closeIcon}
            alt=""
            onClick={() => setShowCreation(false)}
          />
          <div className="Form">
            <input type="text" placeholder="Nom de l'activité"></input>
            <input type="text" placeholder="Description"></input>
            <input type="text" placeholder="Place"></input>
            <input type="text" placeholder="Tags"></input>
            <input type="number" placeholder="Maximum de participants"></input>
            <input type="date" placeholder="Ouverture des inscriptions"></input>
            <input type="date" placeholder="Fermeture des inscriptions"></input>
            <input type="date" placeholder="Début de l'activité"></input>
            <input type="date" placeholder="Fin de l'activité"></input>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCreation;
