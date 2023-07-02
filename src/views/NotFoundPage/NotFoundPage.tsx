import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";
import simpleLogo from "../../assets/simpleLogo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./index.scss";
const NotFoundPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const landRef = useRef<any>([]);
  const cloudRef = useRef<any>([]);

  useEffect(() => {
    const animate: any = () => {
      for (let i = 0; i < landRef.current.length; i++) {
        move(landRef.current[i]);
        move(cloudRef.current[i]);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, []);

  const move = (el: HTMLDivElement | null) => {
    if (el) {
      const s = el.style.transform?.split("(")[1]?.split(",");
      const x = s?.[0]?.split("px")[0];
      const y = s?.[1];
      const w = el.style.width?.split("px")[0];

      if (x && y && w) {
        let nx = parseInt(x) - 1;

        if (nx + parseInt(w) < -20) {
          nx = 170;
        }

        el.style.transform = `translate(${nx}px, ${y}`;
      }
    }
  };

  useEffect(() => {
    for (let i = 0; i < landRef.current.length; i++) {
      landRef.current[i].style.transform = `translate(${Math.round(
        Math.random() * 150
      )}px, ${Math.round(Math.random() * 150)}px)`;
      landRef.current[i].style.width = `${
        Math.round(Math.random() * 50) + 50
      }px`;
    }

    for (let i = 0; i < cloudRef.current.length; i++) {
      cloudRef.current[i].style.transform = `translate(${Math.round(
        Math.random() * 150
      )}px, ${Math.round(Math.random() * 150)}px)`;
      cloudRef.current[i].style.width = `${
        Math.round(Math.random() * 25) + 25
      }px`;
    }
  }, []);
  return (
    <div>
      <Grid container id="row" spacing={3} p={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div>
            <a href={"/"}>
              <img src={simpleLogo} alt={"Logo"} className={"photo"} />
            </a>
          </div>
          <Box sx={{ pl: 1 }}>
            {isMobile ? (
              ""
            ) : (
              <Link className={"text"} to={"/"}>
                Trotter
              </Link>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Box sx={{ position: "relative", height: "200px" }}>
            <div className="world">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="land"
                  ref={(el) => (landRef.current[i] = el)}
                ></div>
              ))}
            </div>
            <div className="clouds">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="cloud"
                  ref={(el) => (cloudRef.current[i] = el)}
                ></div>
              ))}
            </div>
          </Box>
        </Grid>
        <Grid className="description-notfound" item xs={12}>
          <h1>{t("description.notFoundPart1")}</h1>
          <p>{t("description.notFoundPart2")}</p>
          <p>{t("description.notFoundPart3")}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFoundPage;
