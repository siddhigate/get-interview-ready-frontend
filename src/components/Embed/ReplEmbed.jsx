import React from "react";

const ReplEmbed = ({ url }) => {
  return <iframe
    frameBorder="0"
    width="100%"
    style={{ height: "60vh" }}
    src={url}
  ></iframe>;
};

export default ReplEmbed;
