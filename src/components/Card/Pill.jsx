import React from "react";

const Pill = ({ count, text, color }) => {

  return <p className={`bg-${color}-light`}>{text}</p>;
};

export default Pill;
