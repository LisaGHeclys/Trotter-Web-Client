import React, { FC } from "react";
import { useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from "@mui/material";
import flagUk from "../../assets/flags/flag-uk.svg";
import flagEs from "../../assets/flags/flag-es.svg";
import flagFr from "../../assets/flags/flag-fe.png";
type Language = "en" | "fr" | "es";

type LanguageOptions = {
  [key in Language]: {
    icon: string;
    label: string;
  };
};

const languageOptions: LanguageOptions = {
  en: {
    icon: flagUk,
    label: "English"
  },
  fr: {
    icon: flagFr,
    label: "French"
  },
  es: {
    icon: flagEs,
    label: "Spanish"
  }
};

interface LanguagePopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const LanguagePopOver: FC<LanguagePopoverProps> = (props) => {
  const { anchorEl, onClose, open = false, ...other } = props;
  const { i18n, t } = useTranslation();

  const handleChange = useCallback(
    async (language: Language): Promise<void> => {
      onClose?.();
      await i18n.changeLanguage(language);
      localStorage.setItem("language", language);
    },
    [onClose, i18n, t]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom"
      }}
      disableScrollLock
      transformOrigin={{
        horizontal: "right",
        vertical: "top"
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 220 } }}
      {...other}
    >
      {(Object.keys(languageOptions) as Language[]).map((language) => {
        const option = languageOptions[language];

        return (
          <MenuItem onClick={() => handleChange(language)} key={language}>
            <ListItemIcon>
              <Box
                sx={{
                  width: 28,
                  "& img": {
                    width: "100%"
                  }
                }}
              >
                <img alt={option.label} src={option.icon} />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2">{option.label}</Typography>
              }
            />
          </MenuItem>
        );
      })}
    </Popover>
  );
};

LanguagePopOver.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
