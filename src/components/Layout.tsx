import { useState } from "react";
import Sidebar from "./Sidebar";
const Layout = ({
  children,
  selectedKey,
}: {
  children: JSX.Element;
  selectedKey: number;
}): JSX.Element => {
  const [sidebarExpanded, setExpanded] = useState(true);

  return (
    <div className="layout">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setExpanded={setExpanded}
        selectedKey={selectedKey}
      />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
