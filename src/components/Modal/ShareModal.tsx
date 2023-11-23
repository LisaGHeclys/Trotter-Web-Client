import React, { FC, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";

import TwitterShare from "../../components/Share/TwitterShareButton";
import WhatsappShare from "../../components/Share/WhatsappShareButton";
import FacebookShare from "../../components/Share/FacebookShareButton";

import styled from "styled-components";
import { COLORS, FONT } from "../../UI/Colors";
import handleError from "../../utils/ToastUtils";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [buttonText, setButtonText] = useState("Copy");
  const params = {
    text: "Explore with me this amazing travel",
    url: "https://client.trotterapp.fr/map",
    via: "Trotter"
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(params.url);
      setButtonText("Copied!");
    } catch (e) {
      handleError(2);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose();
        setButtonText("Copy");
      }}
    >
      <DialogContent>
        <ModalContent>
          <TitleContainer>
            <TitleText>Missing a step</TitleText>
            <CloseButton
              onClick={() => {
                onClose();
                setButtonText("Copy");
              }}
            >
              <CloseIcon />
            </CloseButton>
          </TitleContainer>
          <Separator />
          <ContentContainer>
            <StyledBox>
              <input
                type="text"
                value={params.url}
                readOnly
                style={{ width: "80%" }}
              />
              <button onClick={handleCopy} style={{ width: "50px" }}>
                {buttonText}
              </button>
            </StyledBox>
            <StyledDiv>
              <TwitterShare {...params} />
              <WhatsappShare {...params} />
              <FacebookShare {...params} />
            </StyledDiv>
          </ContentContainer>
        </ModalContent>
      </DialogContent>
    </Dialog>
  );
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
const StyledBox = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${FONT};
  background-color: ${COLORS.white};
  color: ${COLORS.black};
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.div`
  align-self: flex-end;
  cursor: pointer;
  font-size: 1.5rem;
`;

const TitleText = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
`;

const Separator = styled.hr`
  width: 100%;
  margin: 10px 0 16px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

const ContentContainer = styled.div`
  align-items: center;
  text-align: center;
  margin-bottom: 28px;
`;

export default ShareModal;
