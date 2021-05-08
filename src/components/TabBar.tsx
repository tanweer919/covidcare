import Tab from "./Tab";
import { TabInterface } from "../interfaces/interface";
const TabBar = ({
  tabs,
  activeTab,
}: {
  tabs: TabInterface[];
  activeTab: number;
}): JSX.Element => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-b border-primary">
      {tabs.map((tab, i) => (
        <Tab label={tab.label} isActive={i === activeTab} onClick={tab.onClick} key={i}/>
      ))}
    </div>
  );
};

export default TabBar;
