import "./index.scss";
import React, { FC, useEffect } from "react";

const OauthCallback: FC = () => {
  useEffect(() => {
    //Check if the window has an opener, this way it prevent the code from running on the main window
    if (!window.opener) return;

    //Get the params from the URL
    const params = window.location.search;

    //Send the params to the opening window
    window.opener.postMessage(params, window.location.origin);

    //Close this window
    window.close();
  });

  return (
    <>
      <div className="containerOauthCallback">
        <h1>You&apos;re connected !</h1>
        <hr />
        <p>
          Welcome back ! This window should close on its own now. If it
          doesn&apos;t, you can close it manually.
        </p>
      </div>
    </>
  );
};

export default OauthCallback;
