import React from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

interface TwitterShareButtonProps {
  text: string;
  url: string;
  via: string;
}

const TwitterShare: React.FC<TwitterShareButtonProps> = ({
  text,
  url,
  via
}) => {
  return (
    <div>
      <TwitterShareButton url={url} title={text} via={via}>
        <TwitterIcon round={true} size={42}></TwitterIcon>
      </TwitterShareButton>
    </div>
  );
};

export default TwitterShare;
