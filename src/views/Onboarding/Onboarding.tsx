import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Onboarding.scss";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Apartment,
  DirectionsWalk,
  EmojiNature,
  Nightlife,
  Storefront,
  TempleBuddhist
} from "@mui/icons-material";

const Onboarding = () => {
  const [stage, setStage] = useState<"welcome" | "selection" | "completed">(
    "welcome"
  );
  const [preferences, setPreferences] = useState<{
    q1: "nature" | "architecture" | null;
    q2: "market" | "historical" | null;
    q3: "nightlife" | "quiet" | null;
  }>({
    q1: null,
    q2: null,
    q3: null
  });
  const navigate = useNavigate();

  return (
    <div className="onboardingBackground">
      <motion.div className="onboardingContent">
        {stage === "welcome" && (
          <>
            <motion.h1
              className="onboardingTitle"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to Trotter!
            </motion.h1>
            <motion.p
              className="onboardingText"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Let&apos;s customize your experience!
            </motion.p>
            <motion.div
              className="onboardingButton"
              onClick={() => setStage("selection")}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1, delay: 1.7 }}
            >
              <Button
                type="button"
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
              >
                Get Started
              </Button>
            </motion.div>
          </>
        )}
        {stage === "completed" &&
          setTimeout(() => {
            navigate("/");
          }, 2500) && (
            <>
              <motion.h1
                className="onboardingTitle"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                You are all done!
              </motion.h1>
              <motion.p
                className="onboardingText"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Let&apos;s start trotting!
              </motion.p>
            </>
          )}
        {stage === "selection" && (
          <>
            <motion.div>
              <motion.h4
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0 }}
              >
                Do you prefer exploring nature or admiring architectural
                landmarks?
              </motion.h4>
              <motion.div className="flexRow">
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={
                      preferences.q1 === "nature" ? "chosenOption" : ""
                    }
                  >
                    <IconButton
                      onClick={() => {
                        setPreferences({
                          ...preferences,
                          q1: preferences.q1 === "nature" ? null : "nature"
                        });
                      }}
                    >
                      <EmojiNature
                        sx={{
                          height: 60,
                          width: 60,
                          color:
                            preferences.q1 === "nature" ? "white" : "lightgray"
                        }}
                      />
                    </IconButton>
                  </motion.div>
                </motion.div>
                <motion.p
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  or
                </motion.p>
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <IconButton
                      onClick={() => {
                        setPreferences({
                          ...preferences,
                          q1:
                            preferences.q1 === "architecture"
                              ? null
                              : "architecture"
                        });
                      }}
                    >
                      <Apartment
                        sx={{
                          height: 60,
                          width: 60,
                          color:
                            preferences.q1 === "architecture"
                              ? "white"
                              : "lightgray"
                        }}
                      />
                    </IconButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div>
              <motion.h4
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                When traveling, are you more interested in vibrant street
                markets or historical buildings?
              </motion.h4>
              <motion.div className="flexRow">
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <IconButton
                      size="large"
                      onClick={() => {
                        setPreferences({
                          ...preferences,
                          q2: preferences.q2 === "market" ? null : "market"
                        });
                      }}
                    >
                      <Storefront
                        sx={{
                          height: 60,
                          width: 60,
                          color:
                            preferences.q2 === "market" ? "white" : "lightgray"
                        }}
                      />
                    </IconButton>
                  </motion.div>
                </motion.div>
                <motion.p
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1.3 }}
                >
                  or
                </motion.p>
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <IconButton
                      onClick={() => {
                        setPreferences({
                          ...preferences,
                          q2:
                            preferences.q2 === "historical"
                              ? null
                              : "historical"
                        });
                      }}
                    >
                      <TempleBuddhist
                        sx={{
                          height: 60,
                          width: 60,
                          color:
                            preferences.q2 === "historical"
                              ? "white"
                              : "lightgray"
                        }}
                      />
                    </IconButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div>
              <motion.h4
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Are you more into lively nightlife or quieter evenings exploring
                the city&apos;s charm?
              </motion.h4>
              <motion.div className="flexRow">
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1.7 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <IconButton
                      onClick={() => {
                        setPreferences({
                          ...preferences,
                          q3:
                            preferences.q3 === "nightlife" ? null : "nightlife"
                        });
                      }}
                    >
                      <Nightlife
                        sx={{
                          height: 60,
                          width: 60,
                          color:
                            preferences.q3 === "nightlife"
                              ? "white"
                              : "lightgray"
                        }}
                      />
                    </IconButton>
                  </motion.div>
                </motion.div>
                <motion.p
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1.9 }}
                >
                  or
                </motion.p>
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 2.1 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <IconButton
                      onClick={() => {
                        setPreferences({
                          ...preferences,
                          q3: preferences.q3 === "quiet" ? null : "quiet"
                        });
                      }}
                    >
                      <DirectionsWalk
                        sx={{
                          height: 60,
                          width: 60,
                          color:
                            preferences.q3 === "quiet" ? "white" : "lightgray"
                        }}
                      />
                    </IconButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div className="flexRow" style={{ paddingTop: "60px" }}>
              <motion.div
                className="onboardingButton"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  sx={{ color: "white", borderColor: "white" }}
                  onClick={() => setStage("completed")}
                >
                  Skip
                </Button>
              </motion.div>
              <motion.div
                className="onboardingButton"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 2.3 }}
              >
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  sx={{ color: "#6290C3", backgroundColor: "white" }}
                  onClick={() => {
                    setStage("completed");
                    localStorage.setItem(
                      "preferences",
                      JSON.stringify(preferences)
                    );
                  }}
                  disabled={
                    !preferences.q1 && !preferences.q2 && !preferences.q3
                  }
                >
                  Submit
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Onboarding;
