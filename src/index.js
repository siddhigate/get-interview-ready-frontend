import React from "react";
import ReactDOM from "react-dom/client";
import SidebarLayout from "./layouts/SidebarLayout";

import "./css/style.css";
import GridContainer from "./components/GridContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SidebarLayout title="Hello world">
    <GridContainer>
      <div>One</div>
      <div>One</div>
      <div>One</div>
      <div>One</div>
      <div>One</div>
      <div>One</div>
      <div>One</div>
    </GridContainer>
  </SidebarLayout>
);
