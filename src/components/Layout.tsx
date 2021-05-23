import { useState } from "react";
import Sidebar from "./Sidebar";
import BottomNavbar from "./BottomNavbar";
import { ToastContainer } from "react-toastify";
const Layout = ({
  children,
  selectedKey,
  displayBottomNavbar = true,
}: {
  children: JSX.Element;
  selectedKey: number;
  displayBottomNavbar?: boolean;
}): JSX.Element => {
  return (
    <div className="layout">
      <Sidebar selectedKey={selectedKey} />
      <div className="content">{children}</div>
      {displayBottomNavbar && <BottomNavbar selectedKey={selectedKey} />}
      <ToastContainer style={{ fontSize: "1.6rem" }} />
    </div>
  );
};

export default Layout;
