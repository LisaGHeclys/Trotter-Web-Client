import React, { FC } from "react";
import styled from "styled-components";

export interface FrameSquareProps {
  size: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
  icon?: string;
}

export const FrameSquare: FC<FrameSquareProps> = ({
  size,
  borderColor = "#CCCCCC",
  borderRadius = "10px",
  fontSize = "24px",
  icon
}) => {
  return (
    <FrameSquareContainer
      size={size}
      borderColor={borderColor}
      borderRadius={borderRadius}
      fontSize={fontSize}
      icon={icon}
    ></FrameSquareContainer>
  );
};

const FrameSquareContainer = styled.div<FrameSquareProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 1px solid;
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius};
  font-size: ${(props) => props.fontSize};
  display: flex;
  justify-content: center;
  align-items: center;
  background: white url(${(props) => props.icon}) right top no-repeat;

  &:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`;
