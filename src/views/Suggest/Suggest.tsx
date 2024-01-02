import React, { ChangeEvent, FC, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { useTranslation } from "react-i18next";
import { COLORS, FONT } from "../../UI/Colors";
import styled from "styled-components";
import { Input, Button } from "../../components/LibUI";
import toast, { Toaster } from "react-hot-toast";

const SuggestPage: FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coords, setCoords] = useState<string>("");
  const [error, setError] = useState<string>("");
  const regexExp = /^((-?|\+?)?\d+(\.\d+)?),\s*((-?|\+?)?\d+(\.\d+)?)$/gi;

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

  const ErrorHandler = () => {
    if (name === "" || description === "" || coords === "") {
      setError(t("suggest.fieldsError") || "");
      return false;
    }
    if (regexExp.test(coords) === false) {
      setError(t("suggest.coordinatesError") || "");
      return false;
    }
    setError("");
  };

  const handleSubmit = () => {
    if (ErrorHandler() === false) {
      return;
    }
    createSuggestion();
  };

  const createSuggestion = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URI}/suggest`,
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data: {
          name: name,
          description: description,
          place: coords
        }
      });
      if (response.status === 200) {
        toast.success(t("suggest.success") || "");
      }
    } catch (e) {
      toast.error(t("suggest.error") || "");
    }
  };

  return (
    <div>
      <Toaster />
      <SuggestWrapper container p={0} m={0} rowGap={10}>
        <Grid item p={0} m={0} xs={12}>
          <Navbar />
        </Grid>
      </SuggestWrapper>
      <FormComponentWrapper>
        <h1>{t("suggest.title")}</h1>
        <Form>
          <Input
            borderColor="#d9d9d9"
            textPlaceholder={t("suggest.name")}
            limitChar={0}
            textAlign="left"
            onChange={handleNameChange}
          />
          <Space />
          <Input
            borderColor="#d9d9d9"
            textPlaceholder={t("suggest.description")}
            limitChar={0}
            textAlign="left"
            onChange={handleDescriptionChange}
          />
          <Space />
          <Input
            borderColor="#d9d9d9"
            textPlaceholder={t("suggest.coordinates")}
            limitChar={0}
            textAlign="left"
            onChange={handleCoordsChange}
          />
          <Space />
          <ErrorText>{error}</ErrorText>
          <Button
            text={t("suggest.submit")}
            color={"#6290C3"}
            shadow={true}
            onClick={handleSubmit}
          />
        </Form>
      </FormComponentWrapper>
    </div>
  );
};

const SuggestWrapper = styled(Grid)`
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
  flex-direction: column;
  font-weight: bold;
  font-size: 30px;
  font-family: ${FONT};
  color: ${COLORS.text};
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;

export default SuggestPage;
