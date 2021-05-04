const TabView = ({children, activeTab} : {children: JSX.Element[]; activeTab: number;}): JSX.Element => {
  return children[activeTab]
};

export default TabView;
