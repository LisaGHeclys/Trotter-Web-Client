import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

interface TwitterShareButtonProps {
  text: string;
  url: string;
  via: string;
}

const FacebookShare: React.FC<TwitterShareButtonProps> = ({ text, url }) => {
  return (
    <div>
      <FacebookShareButton url={url} title={text}>
        <FacebookIcon round={true} size={42}></FacebookIcon>
      </FacebookShareButton>
    </div>
  );
};

export default FacebookShare;
