import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Navbar/yohologo.png';
import NotificationIcon from '../../assets/Navbar/notification.png';
import { FONTS } from '../../constants/uiconstants';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center  text-white px-4 py-3 pr-8">
      <img src={Logo} alt="Logo" className="w-[100px]" />
      <div className="flex items-center gap-8">
        
        <nav className="flex items-center gap-3 p-[1px] bg-[#4A7079] rounded-lg *:p-2 *:px-6 *:border *:border-transparent">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-semibold px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-[#4A7079] border border-[#4A7079] shadow-[0px_10px_44px_0px_#4A707926_inset] font-bold'
                  : 'text-white hover:bg-white hover:text-[#4A7079] hover:shadow-[0px_10px_44px_0px_#4A707926_inset]'
              }`
            }
            style={{...FONTS.Nav}}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/hrProfiles"
            className={({ isActive }) =>
              `font-semibold px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-[#4A7079] border border-[#4A7079] shadow-[0px_10px_44px_0px_#4A707926_inset]'
                  : 'text-white hover:bg-white hover:text-[#4A7079] hover:shadow-[0px_10px_44px_0px_#4A707926_inset]'
              }`
            }
            style={{...FONTS.Nav}}
          >
            HR
          </NavLink>
          <NavLink
            to="/employee"
            className={({ isActive }) =>
              `font-semibold px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-[#4A7079] border border-[#4A7079] shadow-[0px_10px_44px_0px_#4A707926_inset]'
                  : 'text-white hover:bg-white hover:text-[#4A7079] hover:shadow-[0px_10px_44px_0px_#4A707926_inset]'
              }`
            }
            style={{...FONTS.Nav}}
          >
            Employee
          </NavLink>
          <NavLink
            to="/department"
            className={({ isActive }) =>
              `font-semibold px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-[#4A7079] border border-[#4A7079] shadow-[0px_10px_44px_0px_#4A707926_inset]'
                  : 'text-white hover:bg-white hover:text-[#4A7079] hover:shadow-[0px_10px_44px_0px_#4A707926_inset]'
              }`
            }
            style={{...FONTS.Nav}}
          >
            Department
          </NavLink>
        </nav>

        {/* Notification Icons */}
        <section className="flex items-center gap-6">
          <div className="flex items-center justify-center cursor-pointer bg-[#4A7079] p-3 rounded-full">
            <img src={NotificationIcon} alt="Notification" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-center cursor-pointer bg-[#4A7079] p-3 rounded-full">
            <img src={NotificationIcon} alt="Notification" className="w-5 h-5" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navbar;