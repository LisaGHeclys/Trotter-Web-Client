import React, { FC } from "react";

export interface InputProps {
  width?: string;
  height?: string;
  borderColor: string;
  icon?: string;
  textPlaceholder: string;
  fontSize?: string;
  borderRadius?: string;
  limitChar: number;
  textAlign: string;
  onChange?: () => void;
}

export const Input: FC<InputProps> = ({
  width = "400px",
  height = "65px",
  borderColor,
  icon,
  textPlaceholder,
  fontSize = "16px",
  borderRadius = "10px",
  limitChar,
  textAlign,
  onChange
}) => {
  return (
    <div>
      <input
        placeholder={textPlaceholder}
        onChange={onChange}
        style={{
          width: width,
          height: height,
          border: borderColor,
          borderRadius: borderRadius,
          fontSize: fontSize,
          textAlign: { textAlign } as unknown as AlignSetting,
          background: `white url(${icon}) right no-repeat`
        }}
        className={""}
      />
    </div>
  );
};
