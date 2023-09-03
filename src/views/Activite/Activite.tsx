import React, { FC, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ModalCreation from "./Modal/ModalCreation";
import "./Activite.scss";

const Activite: FC = () => {
  const [showCreation, setShowCreation] = useState<boolean>(false);

  return (
    <div>
      <Navbar></Navbar>
      <div className="ActiviteSection">
        <button onClick={() => setShowCreation(true)}>
          Creation dactivité
        </button>
      </div>
      <ModalCreation
        setShowCreation={setShowCreation}
        showCreation={showCreation}
      />
    </div>
  );
};

export default Activite;
