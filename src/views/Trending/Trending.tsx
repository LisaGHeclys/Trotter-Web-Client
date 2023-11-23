import React from "react";
import Navbar from "../../components/Navbar/ProfileNavbar/ProfileNavbar";
import { Grid } from "@mui/material";

const Trending = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="ProfileSection">
        <div className="ProfileContent">
          <div className="Filter">
            <h1>TRENDING TRENDS</h1>
          </div>
          <Grid container spacing={4}></Grid>
        </div>
      </div>
    </div>
  );
};

export default Trending;
