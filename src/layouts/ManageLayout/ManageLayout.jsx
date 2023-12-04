import React from "react";
import { Outlet } from "react-router";
import ManageHeader from "@/components/ManageHeader";

function ManageLayout() {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <ManageHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default ManageLayout;
