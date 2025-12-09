import { Link, NavLink } from "react-router-dom";
import { Mail, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <section className="w-screen bg-neutral-500 p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Logo */}
        <div className="">
          <div className="flex flex-row md:ml-10 gap-8">
            <img
              src="/logo/PPNS.webp"
              alt="PPNS"
              className="hidden md:block max-w-18"
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
          </div>

          <div className=" hidden sm:block text-sm md:text-xl lg:text-2xl  font-semibold content-center ml-2 md:ml-12 mt-2 md:mt-8">
            Patra Abhyakta - <br /> Perpipaan
          </div>
        </div>

        {/* Navigation */}
        <div className="">
          <ul className="flex flex-row gap-2 md:gap-4 lg:gap-8 text-center md:text-center text-xs md:text-sm lg:text-base mt-4 md:mt-8">
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/perpipaan">Perpipaan</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>

          <ul className="flex flex-row gap-2 md:gap-4 lg:gap-8 text-center md:text-center text-xs md:text-sm lg:text-base mt-4">
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/news">News</Link>
            </li>
            <li className="hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-4 py-2 rounded-full">
              <Link to="/data-alumni">Data Alumni</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <div className="flex flex-col mt-4 md:mt-8 mr-2 sm:mr-8 ">
            <a
              href="mailto:himateknikperpipaan2007@gmail.com"
              target="_blank"
              className="flex flex-row px-4 py-2 hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer rounded-full gap-2 truncate items-center"
            >
              <Mail className="max-w-8" />
              <span className="text-xs md:text-sm lg:text-base text-center break-all">
                himateknikperpipaan2007@gmail.com
              </span>
            </a>

            <a
              href="https://www.instagram.com/perpipaan_ppns?igsh=cWZoMGgwbnJyYmJm"
              target="_blank"
              className="flex flex-row px-4 py-2 hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer rounded-full gap-2 truncate items-center"
            >
              <Instagram className="max-w-8" />
              <span className="text-xs md:text-sm lg:text-base text-center break-all">
                perpipaan_ppns
              </span>
            </a>

            <a
              href="https://youtu.be/Jr41J6egc2Y?si=DzyPKtcrV5ebNsXww"
              target="_blank"
              className="flex flex-row px-4 py-2 hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer rounded-full gap-2 truncate items-center"
            >
              <Youtube className="max-w-8" />
              <span className="text-xs md:text-sm lg:text-base text-center break-all">
                PipingTv
              </span>
            </a>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 mt-12 mb-3 w-9/10 mx-auto" />

      {/* Copyright */}
      <div className="flex justify-center text-center text-xs md:text-sm ">
        Copyright © 2025 Himpunan Mahasiswa Teknik Perpipaan. All Rights
        Reserved
      </div>
    </section>
  );
};
export default Footer;
