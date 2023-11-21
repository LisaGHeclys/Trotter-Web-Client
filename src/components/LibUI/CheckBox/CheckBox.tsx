import React, { FC } from "react";
import styled from "styled-components";

export interface CheckBoxProps {
  size?: string;
  color?: string;
}

export const CheckBox: FC<CheckBoxProps> = ({ size = "40px", color = "" }) => {
  return (
    <CheckBoxContainer>
      <Checkbox
        dimension={size}
        color={color}
        type="checkbox"
        className={"checkbox"}
      />
    </CheckBoxContainer>
  );
};

const Checkbox = styled.input<{ dimension: string; color: string }>`
  border-radius: 10px;
  width: ${(props) => props.dimension};
  height: ${(props) => props.dimension};
  accent-color: ${(props) => props.color};
  &:hover {
    cursor: pointer;
  }
`;

const CheckBoxContainer = styled.div``;
