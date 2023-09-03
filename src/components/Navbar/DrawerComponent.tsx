import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import routesList from "../RoutesParams";

const DrawerComponent: FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <div>
      <Drawer
        color="#f3f4f8"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor={"right"}
      >
        <List style={{ marginTop: "10px" }}>
          {routesList.map((route, index: number) => {
            return (
              <ListItem key={index} onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link className={"drawer"} to={route.routes}>
                    {route.name}
                  </Link>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon style={{ color: "#101223" }} />
      </IconButton>
    </div>
  );
};

export default DrawerComponent;
