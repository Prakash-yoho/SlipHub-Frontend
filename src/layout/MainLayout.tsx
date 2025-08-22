import { Outlet } from "react-router-dom";
import Navbar from "../Components/Nav/Navbar";

function MainLayout() {


  return (
    <div className="bg-[#F8F8F8] flex flex-col w-screen h-screen overflow-hidden">
      <Navbar />

      {/* Main Page */}
      <div className="scrollbar-hide">
        <Outlet />
      </div>
    </div>

  );
}

export default MainLayout;
