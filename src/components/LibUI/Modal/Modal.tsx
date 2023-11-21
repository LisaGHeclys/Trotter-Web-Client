import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
//import DialogContent from "@mui/material/DialogContent";
import { ModalsButton, Button } from "../index";
import styled from "styled-components";

export interface ModalProps {
  setShow: (value: boolean) => void;
  onConfirm?: () => void;
  show: boolean;
  width?: string;
  height?: string;
  header: string;
  text: string;
  textConfirm: string;
  textCancel?: string;
}

export const TrotterModal: FC<ModalProps> = ({
  setShow,
  show,
  onConfirm,
  width = "600px",
  height = "400px",
  header,
  text,
  textConfirm,
  textCancel = "Cancel"
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    setShow(false);
  };

  return (
    <Dialog open={show} maxWidth={false}>
      <ModalContent $width={width} $height={height}>
        <ModalTitle>
          <ModalTitleText id="transition-modal-title">{header}</ModalTitleText>
        </ModalTitle>
        <ModalHorizontalLine />
        <ModalContentContainer>
          <ModalText>{text}</ModalText>
          <ButtonsContainer>
            <ModalsButton
              shadow={false}
              onClick={() => setShow(false)}
              text={textCancel}
              width={"150px"}
              height={"50px"}
            />
            <Button
              color={"#95B0B4"}
              shadow={false}
              onClick={handleConfirm}
              text={textConfirm}
              width={"150px"}
              height={"50px"}
            />
          </ButtonsContainer>
        </ModalContentContainer>
      </ModalContent>
    </Dialog>
  );
};

const ModalContent = styled.div<{ $width?: string; $height?: string }>`
  height: ${(props) => props.$height};
  width: ${(props) => props.$width};
  margin: auto;
  padding: 30px;
  background-color: white;
  border-radius: 30px;
`;

const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ModalTitleText = styled.div`
  display: block;
  font-size: 2em;
  font-weight: bold;
`;

const ModalHorizontalLine = styled.hr`
  border-top: 3px solid black;
  opacity: 0.1;
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%; //Suis devenu fou j'ai choisis de mettre un pourcentage
`;

const ModalText = styled.div`
  font-size: 1.5em;
  margin: 10px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  Button {
    font-size: 20px;
    border-radius: 10px;
    margin: 10px;
    font-weight: 550;
  }
`;
