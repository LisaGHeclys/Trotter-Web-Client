import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Tooltip } from "@mui/material";
import { usePopover } from "../../hooks/use-popover";
import { LanguagePopOver } from "./LanguagePopOver";
import flagUk from "../../assets/flags/flag-uk.svg";
import flagEs from "../../assets/flags/flag-es.svg";
import flagFr from "../../assets/flags/flag-fe.png";
type Language = "en" | "fr" | "es";

const languages: Record<Language, string> = {
  en: flagUk,
  fr: flagFr,
  es: flagEs
};

export const LanguageSwitch: FC = () => {
  const { i18n } = useTranslation();
  const popover = usePopover<HTMLButtonElement>();

  const flag = languages[i18n.language as Language];

  return (
    <>
      <Tooltip title="Language">
        <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
          <Box
            sx={{
              mx: 2,
              pt: 1,
              width: 40,
              "& img": {
                width: "100%"
              }
            }}
          >
            <img src={flag} />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopOver
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
