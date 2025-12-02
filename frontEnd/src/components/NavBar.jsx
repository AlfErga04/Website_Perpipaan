import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

          {/* Hamburger Button (Mobile Only) */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`w-full md:w-auto ${
            isOpen ? "block" : "hidden"
          } md:flex justify-end items-center md:mr-8`}
        >
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-6 text-center justify-center text-xs md:text-sm lg:text-base">
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/perpipaan">Perpipaan</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/news">News</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/data-alumni">Data Alumni</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
