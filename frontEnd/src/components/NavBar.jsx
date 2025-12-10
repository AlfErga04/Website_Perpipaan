import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";

const UserDropdown = ({ onLogout }) => {
  return (
    <div className="absolute right-0 top-10 w-36 bg-white rounded-md shadow-lg p-2 text-black z-50">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md"
      >
        <User size={18} />
        Dashboard
      </Link>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // redirect setelah logout
  };

  return (
    <section className="w-screen bg-neutral-500 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex justify-start md:ml-10 gap-8">
          <img
            src="/logo/PPNS.webp"
            alt="PPNS"
            className="hidden sm:block max-w-18"
          />
          <img
            src="/logo/TeknikPerpipaan.webp"
            alt="Teknik Perpipaan"
            className="hidden lg:block max-w-14"
          />
          <img
            src="/logo/Kabinet.webp"
            alt="Kabinet"
            className="hidden lg:block max-w-14"
          />

          <div className="sm:text-lg md:text-sm lg:text-lg font-semibold text-center content-center">
            Patra Abhyakta - Perpipaan
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`w-full md:w-auto ${isOpen ? "block" : "hidden"
            } md:flex justify-end items-center md:mr-8`}
        >
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-6 text-center justify-center text-xs md:text-sm lg:text-base">
            <li className="hover:text-white hover:bg-[#F66951] transition px-4 py-2 rounded-full lg:text-lg xl:text-sm">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition px-4 py-2 rounded-full lg:text-lg xl:text-sm">
              <Link to="/perpipaan">Perpipaan</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition px-4 py-2 rounded-full lg:text-lg xl:text-sm">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition px-4 py-2 rounded-full lg:text-lg xl:text-sm">
              <Link to="/news">News</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition px-4 py-2 rounded-full lg:text-lg xl:text-sm">
              <Link to="/data-alumni">Data Alumni</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition px-4 py-2 rounded-full lg:text-lg xl:text-sm ">
              <Link to="/merch">Merch</Link>
            </li>

            {/* USER ICON (login / dropdown) */}
            <li className="relative flex items-center">
              {isLoggedIn ? (
                <button
                  className="hover:bg-[#fffefe] transition px-1 py-1 rounded-full flex items-center justify-center"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src="/merch/user_circle.svg"
                    alt="User"
                    className="w-7 h-7 object-contain"
                  />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-white hover:bg-[#F66951] transition px-4 py-2 rounded-full flex items-center justify-center h-9 lg:text-lg xl:text-sm"
                >
                  Login
                </Link>
              )}

              {showDropdown && isLoggedIn && (
                <UserDropdown onLogout={handleLogout} />
              )}
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
