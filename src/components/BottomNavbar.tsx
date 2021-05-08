import { useRouter } from "next/router";

const BottomNavbar = ({selectedKey}: {selectedKey:number}): JSX.Element => {
  const router = useRouter();

  const handleSelect = (url: string) => {
    router.push(url);
  };
  interface bottomNavbarItem {
    label: string;
    icon: string;
    link: string;
  }
  const items: bottomNavbarItem[] = [
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
    <nav id="bottom-navigation" className="block md:hidden bottomNavbar bg-white">
      <div className="tabs">
        {items.map((item, i) => (
          <div
            className={`tab${
              selectedKey === i ? " tab-active" : ""
            }`}
            onClick={() => {
              handleSelect(item.link);
            }}
            key={i}
          >
            <div>
              <img src={`/images/${item.icon}`} className="tab--icon" alt={item.label} />
            </div>
            <span className="">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
