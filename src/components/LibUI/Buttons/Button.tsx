import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import React, { FC } from "react";
import styled from "styled-components";

export interface ButtonProps {
  width?: string;
  height?: string;
  shadow: boolean;
  text: string;
  color?: string;
  textPadding?: string;
  onClick?: () => void;
}

interface ButtonBaseProps {
  width?: string;
  height?: string;
  shadow: boolean;
  color?: string;
}

export const Button: FC<ButtonProps> = ({
  width = "200px",
  height = "75px",
  shadow,
  text,
  color,
  textPadding,
  onClick
}) => {
  //eslint-disable-next-line
  const rippleRef: any = React.useRef<any>(null);
  //eslint-disable-next-line
  const onRippleStart = (e: any) => {
    if (rippleRef.current != null) rippleRef.current.start(e);
  };
  //eslint-disable-next-line
  const onRippleStop = (e: any) => {
    if (rippleRef.current != null) rippleRef.current.stop(e);
  };

  return (
    <ButtonBase
      onClick={onClick}
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
      width={width}
      height={height}
      shadow={shadow}
      color={color}
    >
      <TouchRipple ref={rippleRef} center={false} />
      <ButtonText $textPadding={textPadding}>{text}</ButtonText>
    </ButtonBase>
  );
};

const ButtonBase = styled.button<ButtonBaseProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-shadow: ${(props) =>
    props.shadow ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "none"};
  background-color: ${(props) => props.color};
  position: relative;
  display: inline-block;
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
  border: none;
`;

const ButtonText = styled.span<{ $textPadding?: string }>`
  padding: ${(props) => props.$textPadding};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
