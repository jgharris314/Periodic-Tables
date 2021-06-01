import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid layout">
      <div className="row">
        <div className=" side-bar">
          <Menu />
          </div>
        </div>
        <div className="row">
          <Routes />
        </div>
      </div>
    
  );
}

export default Layout;
