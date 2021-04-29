import { useState } from "react";
import { useRouter } from "next/router";
import SidebarIcon from "./SidebarIcon";

interface propType {
  sidebarExpanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  selectedKey: number
}
const Sidebar = ({ sidebarExpanded, setExpanded, selectedKey }: propType): JSX.Element => {
  const router = useRouter();
  const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setExpanded(!sidebarExpanded);
  };

  const handleSelect = (i: number, url: string) => {
    router.push(url);
  };

  interface sidebarItem {
    label: string;
    icon: string;
    link: string;
  }
  const items: sidebarItem[] = [
    { label: "Home", icon: "home.svg", link: "/" },
    { label: "Care", icon: "care.svg", link: "/care" },
    {
      label: "Chat",
      icon: "chat.svg",
      link: "/chat",
    },
    { label: "Feeds", icon: "newspaper.svg", link: "/news" },
  ];
  return (
    <nav className={`sidebar${sidebarExpanded ? " sidebar-expanded" : ""}`}>
      <div className="sidebar-menu-button__container" onClick={handleChange}>
        <div className="sidebar-menu-button">
          <div
            className={`icon-dash${sidebarExpanded ? " icon-dash-first" : ""}`}
          ></div>
          <div className="icon-dash "></div>
          <div
            className={`icon-dash${sidebarExpanded ? " icon-dash-last" : ""}`}
          ></div>
        </div>
      </div>
      {items.map((item: sidebarItem, i: number) => (
        <div
          className={`sidebar-item${
            selectedKey === i ? " sidebar-item-active" : ""
          }`}
          key={i}
          onClick={() => {
            handleSelect(i, item["link"]);
          }}
        >
          <div className="sidebar-item__icon-box">
            <SidebarIcon icon={item["icon"]} />
          </div>
          <div className="sidebar-item--text">{item["label"]}</div>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
