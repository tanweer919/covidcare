import { useState } from "react";
import Sidebar from "./Sidebar";
const Layout = ({
  children,
  selectedKey,
}: {
  children: JSX.Element;
  selectedKey: number;
}): JSX.Element => {

  return (
    <div className="layout">
      <Sidebar
        selectedKey={selectedKey}
      />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
