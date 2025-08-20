import { Outlet } from "react-router-dom";
import Navbar from "../Components/Nav/Navbar";

function MainLayout() {


  return (
    <div className="bg-[#f5eaea] flex flex-col w-screen h-screen overflow-hidden">
      <Navbar />

      {/* Main Page */}
      <div className="">
        <Outlet />
      </div>
    </div>

  );
}

export default MainLayout;
