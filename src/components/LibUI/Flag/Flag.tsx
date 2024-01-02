import React, { FC } from "react";

export interface FlagProps {
  country: string;
  width?: string;
  height?: string;
  alt: string;
}

export const Flag: FC<FlagProps> = ({
  country,
  width = "40",
  height = "35",
  alt
}) => {
  return (
    <div>
      <img
        src={`https://cdn.countryflags.com/thumbs/${country}/flag-400.png`}
        width={width}
        height={height}
        alt={alt}
      />
    </div>
  );
};
