import React from "react";

const Loader = () => {
    console.log("here")
  return (
    <div className="loader-wrapper">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
