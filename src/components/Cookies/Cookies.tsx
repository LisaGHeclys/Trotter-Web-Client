import React, { FC } from "react";
import Drawer from "@mui/material/Drawer";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import styled from "styled-components";
import { COLORS, FONT } from "../../UI/Colors";
import { CookieSharp } from "@mui/icons-material";

type CookiesProps = {
  open: boolean;
  //eslint-disable-next-line
  onClose: any;
};

const Cookies: FC<CookiesProps> = ({ open, onClose }) => {
  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="bottom"
        open={open}
        onClose={() => onClose()}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <CookieSharp />
            </ListItemIcon>
            <ListItemText
              primary="Cookie Notice"
              secondary="Welcome to Trotter! To ensure the best possible experience, we use necessary cookies that are essential for the functionality of the site.
            These cookies do not collect personnal information and are automatically enabled.
            By continuing to browse, you agree to our use of cookies. Thanks for visiting !"
            />
            <AcceptButton onClick={() => onClose()}>Close</AcceptButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

const AcceptButton = styled.button`
  color: ${COLORS.text};
  background-color: ${COLORS.blue};
  font-family: ${FONT};
  cursor: pointer;
  border: none;
  width: 140px;
  height: 48px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
  margin: 10px 10px 10px 50px;

  &:hover {
    background-color: ${COLORS.blueGreen};
    color: ${COLORS.bg};
    transition-duration: 0.4s;
  }

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 40px;
    font-size: 15px;
    margin: 10px 0px 10px 10px;
  }
`;

export default Cookies;
