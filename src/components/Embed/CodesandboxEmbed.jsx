import React from "react";

const CodesandboxEmbed = ({ url }) => {
  return (
    <iframe
      src={url}
      frameBorder="0"
      style={{ width: "100%", minHeight: "60vh" }}
    ></iframe>
  );
};

export default CodesandboxEmbed;
