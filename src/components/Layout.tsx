import { useState } from "react";
import Sidebar from "./Sidebar";
import BottomNavbar from "./BottomNavbar";
const Layout = ({
  children,
  selectedKey,
  displayBottomNavbar=true
}: {
  children: JSX.Element;
  selectedKey: number;
  displayBottomNavbar?: boolean
}): JSX.Element => {
  return (
    <div className="layout">
      <Sidebar selectedKey={selectedKey} />
      <div className="content">{children}</div>
      {displayBottomNavbar && <BottomNavbar selectedKey={selectedKey} />}
    </div>
  );
};

export default Layout;
