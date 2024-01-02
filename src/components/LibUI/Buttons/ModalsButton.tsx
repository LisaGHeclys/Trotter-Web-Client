import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import React, { FC } from "react";
import styled from "styled-components";

export interface ModalsButtonProps {
  width?: string;
  height?: string;
  shadow: boolean;
  text: string;
  textPadding?: string;
  onClick?: () => void;
}

interface ModalsButtonBaseProps {
  width?: string;
  height?: string;
  shadow: boolean;
  color?: string;
}

export const ModalsButton: FC<ModalsButtonProps> = ({
  width = "200px",
  height = "75px",
  shadow,
  text,
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
    <ModalsButtonBase
      onClick={onClick}
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
      width={width}
      height={height}
      shadow={shadow}
    >
      <TouchRipple ref={rippleRef} center={false} />
      <ModalsButtonText $textPadding={textPadding}>{text}</ModalsButtonText>
    </ModalsButtonBase>
  );
};

const ModalsButtonBase = styled.button<ModalsButtonBaseProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-shadow: ${(props) =>
    props.shadow ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "none"};
  background-color: white;
  border: 2px solid #000000;
  position: relative;
  display: inline-block;
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
`;

const ModalsButtonText = styled.span<{ $textPadding?: string }>`
  padding: ${(props) => props.$textPadding};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
