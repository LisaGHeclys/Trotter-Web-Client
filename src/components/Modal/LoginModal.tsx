import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";
import { COLORS, FONT } from "../../UI/Colors";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: () => void;
  onLogin: () => void;
}

const LoginModal: FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSignUp,
  onLogin
}) => {
  const handleSignUp = () => {
    onSignUp();
    onClose();
  };
  const handleLogin = () => {
    onLogin();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <ModalContent>
          <TitleContainer>
            <TitleText>Missing a step</TitleText>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </TitleContainer>
          <Separator />
          <ContentContainer>
            <ContentText>
              Please login or sign up to make a travel search
            </ContentText>
            <ContentTextPrecision>
              Don’t worry, if you press the login button your search parameters
              will be saved
            </ContentTextPrecision>
          </ContentContainer>
          <ButtonContainer>
            <ButtonStyle variant="outlined" onClick={handleSignUp}>
              Sign up
            </ButtonStyle>
            <SpacingBetweenButtons />
            <ButtonStyle variant="contained" onClick={handleLogin}>
              Login
            </ButtonStyle>
          </ButtonContainer>
        </ModalContent>
      </DialogContent>
    </Dialog>
  );
};

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

const ContentText = styled.div`
  font-size: 1.33rem;
`;

const ContentTextPrecision = styled.div`
  color: gray;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const ButtonStyle = styled(Button)`
  margin-left: 20px;
`;

const SpacingBetweenButtons = styled.div`
  margin-left: 10px;
`;

export default LoginModal;
