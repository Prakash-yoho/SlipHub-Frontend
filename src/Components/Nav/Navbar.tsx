import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Navbar/yohologo.png';
import NotificationIcon from '../../assets/Navbar/notification-bing.png';
import ProfileIcon from '../../assets/Navbar/Mask group.png';
import { COLORS, FONTS } from '../../constants/uiconstants';
import { ClearLocalStorage, GetLocalStorage } from '../../utils/localstorage';

const Navbar: React.FC = () => {

  const [confirmLogout, setConfirmLogout] = useState(false)

  const role = GetLocalStorage('role')

  const logout = () => {
    ClearLocalStorage()
    window.location.reload()
  }

  return (
    <div className="flex justify-between items-center text-white px-4 py-3 pr-8 
      flex-wrap gap-4 md:gap-0">

      {/* LOGO */}
      <img 
        src={Logo} 
        alt="Logo" 
        className="w-[80px] sm:w-[90px] md:w-[100px]" 
      />

      {/* MAIN RIGHT SECTION */}
      <div className="flex items-center gap-4 md:gap-8 flex-wrap justify-end w-full md:w-auto">

        {/* NAV LINKS */}
        <nav className="
          flex items-center gap-2 sm:gap-3
          p-[1px] bg-[#4A7079] rounded-lg 
          *:p-2 *:px-4 sm:*:px-6 *:border *:border-transparent 
          flex-wrap
        ">
          {(role === "admin" || role === "hr") &&
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold px-3 py-1 rounded-lg transition-colors ${isActive
                  ? 'bg-white text-[#4A7079] border border-[#4A7079] shadow-[0px_10px_44px_0px_#4A707926_inset] font-bold'
                  : 'text-white hover:bg-white hover:text-[#4A7079] hover:shadow-[0px_10px_44px_0px_#4A707926_inset]'
                }`
              }
              style={{ ...FONTS.Nav }}
            >
              Dashboard
            </NavLink>
          }

          {role === "admin" &&
            <NavLink
              to="/department"
              className={({ isActive }) =>
                `font-semibold px-3 py-1 rounded-lg transition-colors ${isActive
                  ? 'bg-white text-[#4A7079] border border-[#4A7079] shadow-[0px_10px_44px_0px_#4A707926_inset]'
                  : 'text-white hover:bg-white hover:text-[#4A7079] hover:shadow-[0px_10px_44px_0px_#4A707926_inset]'
                }`
              }
              style={{ ...FONTS.Nav }}
            >
              Department
            </NavLink>
          }

          {role === "admin" &&
            <NavLink
              to="/hrProfiles"
              className={({ isActive }) =>
                `font-semibold px-3 py-1 rounded-lg transition-colors ${isActive
                  ? 'bg-white text-[#4A7079] border border-[#4A7079] shadow-[0px_10px_44px_0px_#4A707926_inset]'
                  : 'text-white hover:bg-white hover:text-[#4A7079] hover:shadow-[0px_10px_44px_0px_#4A707926_inset]'
                }`
              }
              style={{ ...FONTS.Nav }}
            >
              HR
            </NavLink>
          }

          {(role === "hr" || role === "admin") &&
            <NavLink
              to="/employee"
              className={({ isActive }) =>
                `font-semibold px-3 py-1 rounded-lg transition-colors ${isActive
                  ? 'bg-white text-[#4A7079] border border-[#4A7079] shadow-[0px_10px_44px_0px_#4A707926_inset]'
                  : 'text-white hover:bg-white hover:text-[#4A7079] hover:shadow-[0px_10px_44px_0px_#4A707926_inset]'
                }`
              }
              style={{ ...FONTS.Nav }}
            >
              Employee
            </NavLink>
          }

          {role === "hr" &&
            <NavLink
              to="/payroll"
              className={({ isActive }) =>
                `font-semibold px-3 py-1 rounded-lg transition-colors ${isActive
                  ? 'bg-white text-[#4A7079] border border-[#4A7079] shadow-[0px_10px_44px_0px_#4A707926_inset]'
                  : 'text-white hover:bg-white hover:text-[#4A7079] hover:shadow-[0px_10px_44px_0px_#4A707926_inset]'
                }`
              }
              style={{ ...FONTS.Nav }}
            >
              Payroll
            </NavLink>
          }
        </nav>

        {/* ICONS + LOGOUT */}
        <section className="flex items-center gap-4 sm:gap-6">

          {/* Notification */}
          <div className="flex items-center justify-center cursor-pointer 
            bg-[#4A7079] p-2 rounded-full">
            <img src={NotificationIcon} alt="Notification" className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer bg-[#5A5A5A] p-2 rounded-full">
            <img src={ProfileIcon} alt="Profile" className="w-6 h-6 sm:w-7 sm:h-7" />

            <button 
              className="px-2 sm:px-3 cursor-pointer text-sm sm:text-base" 
              onClick={() => setConfirmLogout(true)}
            >
              Logout
            </button>
          </div>
        </section>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {confirmLogout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-[90%] sm:w-[400px]">
            <h2 style={{ ...FONTS.card_name, color: COLORS.primary }}>
              Confirm Logout
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Are you sure, By clicking Logout you will be redirect to Login Page
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setConfirmLogout(false)}
                className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 cursor-pointer"
                style={{ ...FONTS.view_btn }}
              >
                Cancel
              </button>

              <button
                onClick={logout}
                className="px-4 py-1 rounded-md bg-[#ec1c1c] text-white cursor-pointer"
                style={{ ...FONTS.view_btn }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
