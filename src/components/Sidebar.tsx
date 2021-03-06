import { useState } from "react";
import { useRouter } from "next/router";
import SidebarIcon from "./SidebarIcon";

interface propType {
  selectedKey: number;
}
const Sidebar = ({ selectedKey }: propType): JSX.Element => {
  const router = useRouter();

  const handleSelect = (i: number, url: string) => {
    router.push(url);
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  interface sidebarItem {
    label: string;
    icon: string;
    link: string;
  }
  const items: sidebarItem[] = [{ label: "Home", icon: "home.svg", link: "/" }];
  return (
    <nav className="sidebar hidden md:block ">
      <div className="sidebar-logo__container">
        <img
          className="sidebar-logo div-cursor"
          src="/images/logo.png"
          alt="logo"
          onClick={handleLogoClick}
        />
      </div>
      {items.map((item: sidebarItem, i: number) => (
        <div
          className={`sidebar-item${
            selectedKey === i ? " sidebar-item-active" : ""
          }`}
          key={i}
          onClick={() => {
            handleSelect(i, item.link);
          }}
        >
          <div className="sidebar-item__icon-box">
            <SidebarIcon icon={item.icon} />
          </div>
          <div className="sidebar-item--text">{item.label}</div>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
