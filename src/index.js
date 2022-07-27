import React from "react";
import ReactDOM from "react-dom/client";
import SidebarLayout from "./layouts/SidebarLayout";

import './css/style.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SidebarLayout title="Hello world">Hey</SidebarLayout>);
