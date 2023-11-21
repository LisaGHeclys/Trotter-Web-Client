import React, { FC } from "react";
import styled from "styled-components";

export interface LoaderProps {
  width?: string;
  height?: string;
  hidePage?: boolean;
}

export const Loader: FC<LoaderProps> = ({
  width = "30px",
  height = "30px",
  hidePage = false
}) => {
  return (
    <LoaderContainer>
      {hidePage ? (
        <PageHidder>
          <LoaderSpinner width={width} height={height} />
        </PageHidder>
      ) : (
        <LoaderSpinner width={width} height={height} />
      )}
    </LoaderContainer>
  );
};

const LoaderSpinner = styled.div<LoaderProps>`
  margin: 0 auto;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 5px solid #f3f3f3;
  border-top: 5px solid #213547;
  border-radius: 50%;
  animation: spin 1s infinite linear;
  margin-top: 15px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PageHidder = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);

  ${LoaderSpinner} {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

const LoaderContainer = styled.div``;
