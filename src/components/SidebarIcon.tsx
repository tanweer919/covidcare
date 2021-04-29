const SidebarIcon = ({ icon }: { icon: string }): JSX.Element => {
  return <img src={`/images/${icon}`} className={`sidebar-item__icon`} />;
};

export default SidebarIcon;
