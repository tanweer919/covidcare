import { useRouter } from "next/router";

const AppBar = ({label}: {label:string}) => {
  const router = useRouter()
  const handleBackButtonClick = () => {
    router.push("/");
  };
  return (
    <div className="flex justify-start items-center md:hidden p-4 relative border-b border-gray400">
      <div
        className="bg-gray400 p-2 rounded-2xl absolute"
        onClick={handleBackButtonClick}
      >
        <img
          src="/images/chevron-left.svg"
          alt="chevron-left"
          className="h-8"
        />
      </div>
      <div className="text-3xl flex-grow flex justify-center">
        {label}
      </div>
    </div>
  );
}

export default AppBar;