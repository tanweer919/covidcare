import { useState } from "react";
import Sidebar from "./Sidebar";
import BottomNavbar from "./BottomNavbar";
const Layout = ({
  children,
  selectedKey,
}: {
  children: JSX.Element;
  selectedKey: number;
}): JSX.Element => {
  return (
    <div className="layout">
      <Sidebar selectedKey={selectedKey} />
      <div className="content mb-40">{children}</div>
      <BottomNavbar selectedKey={selectedKey} />
    </div>
  );
};

export default Layout;
