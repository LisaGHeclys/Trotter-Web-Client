//<input type="text" placeholder="Nom de l'activité"></input>
//<input type="text" placeholder="Description"></input>
//<input type="text" placeholder="Place"></input>
//<input type="text" placeholder="Tags"></input>
//<input type="number" placeholder="Maximum de participants"></input>
//<input type="date" placeholder="Ouverture des inscriptions"></input>
//<input type="date" placeholder="Fermeture des inscriptions"></input>
//<input type="date" placeholder="Début de l'activité"></input>
// <input type="date" placeholder="Fin de l'activité"></input>
import React, { ChangeEvent, FC, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { useTranslation } from "react-i18next";
import { COLORS, FONT } from "../../UI/Colors";
import styled from "styled-components";
import { Input, Button } from "../../components/LibUI";
import { toast } from "sonner";

const EventPage: FC = () => {
  const regexExp = /^((-?|\+?)?\d+(\.\d+)?),\s*((-?|\+?)?\d+(\.\d+)?)$/gi;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coords, setCoords] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<number>(0);
  const [openingDate, setOpeningDate] = useState<string>("");
  const [closingDate, setClosingDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { t } = useTranslation();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCoordsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCoords(e.target.value.replace(/ /g, ""));
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const handleMaxParticipantsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxParticipants(parseInt(e.target.value));
  };

  const handleOpeningDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpeningDate(e.target.value);
  };

  const handleClosingDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClosingDate(e.target.value);
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const ErrorHandler = () => {
    if (
      name === "" ||
      description === "" ||
      coords === "" ||
      tags === "" ||
      openingDate === "" ||
      closingDate === "" ||
      startDate === "" ||
      endDate === ""
    ) {
      setError(t("event.fieldsError") || "");
      return false;
    }
    if (maxParticipants < 0) {
      setError(t("event.maxParticipantsError") || "");
      return false;
    }
    if (regexExp.test(coords) === false) {
      setError(t("event.coordinatesError") || "");
      return false;
    }
    if (
      isNaN(Date.parse(openingDate)) ||
      isNaN(Date.parse(closingDate)) ||
      isNaN(Date.parse(startDate)) ||
      isNaN(Date.parse(endDate))
    ) {
      setError(t("event.dateError") || "");
      return false;
    }
    if (
      Date.parse(openingDate) < Date.now() ||
      Date.parse(closingDate) < Date.now() ||
      Date.parse(startDate) < Date.now() ||
      Date.parse(endDate) < Date.now()
    ) {
      setError(t("event.dateLogicError") || "");
      return false;
    }
    setError("");
  };

  const handleSubmit = () => {
    if (ErrorHandler() === false) {
      return;
    }
    createEvent();
  };

  const createEvent = async () => {
    const promise = axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URI}/event`,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      data: {
        name: name,
        description: description,
        place: coords,
        maxParticipants: maxParticipants,
        tags: tags.split(","),
        openingDate: openingDate,
        closingDate: closingDate,
        startDate: startDate,
        endDate: endDate
      }
    });
    toast.promise(promise, {
      success: t("event.success"),
      error: t("event.error"),
      loading: t("event.loading")
    });
    await promise;
  };

  return (
    <div>
      <EventWrapper container p={0} m={0} rowGap={10}>
        <Grid item p={0} m={0} xs={12}>
          <Navbar />
        </Grid>
      </EventWrapper>
      <FormComponentWrapper>
        <h1>{t("event.title")}</h1>
        <Space />
        <Input
          borderColor="#d9d9d9"
          textPlaceholder={t("event.name")}
          limitChar={0}
          textAlign="left"
          onChange={handleNameChange}
        />
        <Space />
        <Form>
          <LeftColumn>
            <InfoText> {t("event.description")} </InfoText>
            <Input
              borderColor="#d9d9d9"
              textPlaceholder={t("event.description")}
              limitChar={0}
              textAlign="left"
              onChange={handleDescriptionChange}
            />
            <InfoText> {t("event.maxParticipants")} </InfoText>
            <Input
              borderColor="#d9d9d9"
              textPlaceholder={t("event.maxParticipants")}
              limitChar={0}
              textAlign="left"
              onChange={handleMaxParticipantsChange}
            />
            <InfoText> {t("event.openingDate")} </InfoText>
            <Input
              borderColor="#d9d9d9"
              textPlaceholder={t("event.openingDate")}
              limitChar={0}
              textAlign="left"
              onChange={handleOpeningDateChange}
            />
            <InfoText> {t("event.startDate")} </InfoText>
            <Input
              borderColor="#d9d9d9"
              textPlaceholder={t("event.startDate")}
              limitChar={0}
              textAlign="left"
              onChange={handleStartDateChange}
            />
          </LeftColumn>
          <RightColumn>
            <InfoText> {t("event.coordinates")} </InfoText>
            <Input
              borderColor="#d9d9d9"
              textPlaceholder={t("event.coordinates")}
              limitChar={0}
              textAlign="left"
              onChange={handleCoordsChange}
            />
            <InfoText> {t("event.tags")} </InfoText>
            <Input
              borderColor="#d9d9d9"
              textPlaceholder={t("event.tags")}
              limitChar={0}
              textAlign="left"
              onChange={handleTagsChange}
            />
            <InfoText> {t("event.closingDate")} </InfoText>
            <Input
              borderColor="#d9d9d9"
              textPlaceholder={t("event.closingDate")}
              limitChar={0}
              textAlign="left"
              onChange={handleClosingDateChange}
            />
            <InfoText> {t("event.endDate")} </InfoText>
            <Input
              borderColor="#d9d9d9"
              textPlaceholder={t("event.endDate")}
              limitChar={0}
              textAlign="left"
              onChange={handleEndDateChange}
            />
          </RightColumn>
        </Form>
        <Space />
        <ErrorText>{error}</ErrorText>
        <Button
          text={t("event.submit")}
          color={"#6290C3"}
          shadow={true}
          onClick={handleSubmit}
        />
        <Space />
      </FormComponentWrapper>
    </div>
  );
};

const EventWrapper = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin-top: 100px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const Space = styled.div`
  height: 15px;
  width: 100%;
`;

const Form = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  font-weight: bold;
  font-size: 30px;
  font-family: ${FONT};
  color: ${COLORS.text};
  justify-content: center;
  align-items: center;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;

const InfoText = styled.div`
  align-self: flex-start;
  margin-left: 10px;
  font-size: 12px;
  color: ${COLORS.text};
`;

export default EventPage;
