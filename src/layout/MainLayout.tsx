import { Outlet } from "react-router-dom";
import Navbar from "../Components/Nav/Navbar";
import { useState, useEffect, useRef } from "react";
import { COLORS } from "../constants/uiconstants";

function MainLayout() {
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  return (
    <div className="bg-[#F8F8F8] flex flex-col w-screen h-screen">
      <div ref={navRef} className="w-full fixed top-0 left-0 z-50" style={{background:COLORS.background}}>
        <Navbar />
      </div>

      <div
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{ paddingTop: navHeight }}
      >
        <div className="px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
