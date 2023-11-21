// ChoiceModal.tsx
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";
import { COLORS, FONT } from "../../UI/Colors";

interface Choice {
  label: string;
  icon: JSX.Element;
}

interface ChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  choices: Choice[];
  onConfirm: (selectedChoices: Choice[]) => void;
}

const ChoiceModal: FC<ChoiceModalProps> = ({
  isOpen,
  onClose,
  choices,
  onConfirm
}) => {
  const [selectedChoices, setSelectedChoices] = useState<Choice[]>([]);
  const { t } = useTranslation();

  const handleChoiceToggle = (choice: Choice) => {
    const isSelected = selectedChoices.some(
      (item) => item.label === choice.label
    );
    if (isSelected) {
      setSelectedChoices(
        selectedChoices.filter((item) => item.label !== choice.label)
      );
    } else {
      setSelectedChoices([...selectedChoices, choice]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedChoices);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <ModalContent>
          <TitleContainer>
            <TitleText>{t("choiceModal.title")}</TitleText>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </TitleContainer>
          <Separator />
          <ContentContainer>
            <ContentText>{t("choiceModal.contentText")}</ContentText>
            <ContentTextPrecision>
              {t("choiceModal.contentTextPrecision")}
            </ContentTextPrecision>
          </ContentContainer>
          <ChoiceContainer>
            {choices.map((choice, index) => (
              <ChoiceItem
                key={index}
                selected={selectedChoices.some(
                  (item) => item.label === choice.label
                )}
                onClick={() => handleChoiceToggle(choice)}
              >
                {choice.icon} {choice.label}
              </ChoiceItem>
            ))}
          </ChoiceContainer>
          <ButtonContainer>
            <ButtonStyle variant="outlined" onClick={onClose}>
              {t("general.skip")}
            </ButtonStyle>
            <SpacingBetweenButtons />
            <ButtonStyle
              variant="contained"
              onClick={handleConfirm}
              disabled={selectedChoices.length === 0}
            >
              {t("general.confirm")}
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

const ChoiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ChoiceItem = styled.div<{ selected: boolean }>`
  flex: 0 0 calc(33.33% - 20px);
  margin: 10px;
  padding: 5px;
  cursor: pointer !important;
  background: ${(props) =>
    props.selected ? `${COLORS.border}` : `${COLORS.white}`};
  border-radius: ${(props) => (props.selected ? "50px" : "0px")};
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

export default ChoiceModal;
