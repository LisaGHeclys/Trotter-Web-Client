import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../../UI/Colors";

const OauthCallback: FC = () => {
  useEffect(() => {
    if (!window.opener) return;
    const params = window.location.search;
    window.opener.postMessage(params, window.location.origin);
    window.close();
  });

  return (
    <OAuthWrapper>
      <OAuthTitle>You&apos;re connected !</OAuthTitle>
      <OAuthBreak />
      <OAuthText>
        Welcome back ! This window should close on its own now. If it
        doesn&apos;t, you can close it manually.
      </OAuthText>
    </OAuthWrapper>
  );
};

const OAuthWrapper = styled.div`
  margin-top: 88px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin-bottom: 100px;
`;

const OAuthTitle = styled.h1`
  color: ${COLORS.text};
  font-size: 2.5rem;
  text-align: center;
`;

const OAuthBreak = styled.hr`
  background-color: ${COLORS.grey};
  width: 600px;
  height: 1px;
  border: none;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    width: 300px;
  }
  @media screen and (max-width: 480px) {
    width: 150px;
  }
`;

const OAuthText = styled.p`
  color: ${COLORS.text};
  font-size: 1.2rem;
  text-align: center;
  margin-right: 25%;
  margin-left: 25%;
  margin-top: 50px;
`;

export default OauthCallback;
