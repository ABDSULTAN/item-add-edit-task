import React from "react";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div style={{ margin: 50 }}>
      <Outlet />
    </div>
  );
};

export default PageLayout;
