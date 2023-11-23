import React from "react";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

interface TwitterShareButtonProps {
  text: string;
  url: string;
  via: string;
}

const WhatsappShare: React.FC<TwitterShareButtonProps> = ({ text, url }) => {
  return (
    <div>
      <WhatsappShareButton url={url} title={text}>
        <WhatsappIcon round={true} size={42}></WhatsappIcon>
      </WhatsappShareButton>
    </div>
  );
};

export default WhatsappShare;
