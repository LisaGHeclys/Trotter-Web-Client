import React, { FC } from "react";
import styled from "styled-components";

export interface FrameRectangleProps {
  width: string;
  height: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
  icon?: string;
}

export const FrameRectangle: FC<FrameRectangleProps> = ({
  width,
  height,
  borderColor = "#CCCCCC",
  borderRadius = "10px",
  fontSize = "24px",
  icon
}) => {
  return (
    <FrameRectangleContainer
      width={width}
      height={height}
      borderColor={borderColor}
      borderRadius={borderRadius}
      fontSize={fontSize}
      icon={icon}
    ></FrameRectangleContainer>
  );
};

const FrameRectangleContainer = styled.div<FrameRectangleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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
