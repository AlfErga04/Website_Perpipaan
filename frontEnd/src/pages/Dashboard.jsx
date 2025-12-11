import { FaUser, FaHistory, FaEdit, FaArrowLeft } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function AccountDashboard() {
  const [activeMenu, setActiveMenu] = useState("account");
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="top-0 text-white">
        <NavBar />
      </div>

      <div className="min-h-screen bg-[#151515] text-white p-10 items-start w-full">
        <div className="max-w-[75%] m-auto flex flex-col lg:flex-row gap-2 lg:gap-14">
          {/* Sidebar */}
          <div className="bg-[#1a1a1a] border border-[#E56F56] rounded-xl p-6 shadow-xl flex flex-col items-center h-fit lg:w-60">
            <FaUser className="text-[#E56F56]" size={80} />

            {/* My Account */}
            <button
              onClick={() => setActiveMenu("account")}
              className={`flex items-center gap-3 w-full mt-6 py-3 rounded-lg justify-center font-semibold transition
                ${
                  activeMenu === "account"
                    ? "bg-[#E56F56] text-white cursor-default"
                    : "border border-[#E56F56] text-gray-300 hover:bg-[#e56e5682] hover:text-white"
                }
              `}>
              <FaUser /> My Account
            </button>

            {/* My Order */}
            <button
              onClick={() => setActiveMenu("order")}
              className={`flex items-center gap-3 w-full mt-4 py-3 rounded-lg justify-center transition
                ${
                  activeMenu === "order"
                    ? "bg-[#E56F56] text-white cursor-default"
                    : "border border-[#E56F56] text-gray-300 hover:bg-[#e56e5682] hover:text-white"
                }
              `}>
              <FaHistory /> My Order
            </button>
          </div>

          {/* CONTENT AREA */}
          <div className="w-full max-w-7xl">
            {/* ======= MY ACCOUNT SECTION ======= */}
            {activeMenu === "account" && (
              <>
                <h2 className="mt-4 text-xl font-semibold">
                  Hallo, {user?.name}
                </h2>
                <h1 className="text-3xl font-bold text-[#E56F56] mb-10">
                  MY ACCOUNT
                </h1>

                {/* Change Photo */}
                <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-xl flex flex-col items-center">
                  <FaUser className="text-[#E56F56]" size={140} />

                  <button
                    className="mt-6 border border-[#E56F56] rounded-full px-8 py-3 font-semibold hover:bg-[#222] transition"
                    onClick={() => alert("Coming soon")}>
                    Ganti Photo Kamu
                  </button>

                  <p className="mt-4 text-center text-sm text-gray-300">
                    File support : JPG, JPEG, PNG
                    <br />
                    <span className="text-gray-500 pointer-events-none">
                      Untuk saat ini, fitur ini belum tersedia.
                    </span>
                  </p>
                </div>

                {/* Account Details */}
                <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-xl relative mt-6">
                  <button className="absolute right-6 top-6 flex items-center gap-2 text-[#E56F56] font-semibold hover:opacity-80">
                    <FaEdit /> Edit Profile
                  </button>

                  <h2 className="text-xl font-semibold text-[#E56F56] mb-6">
                    Account Details
                  </h2>

                  <div className="space-y-4 text-sm">
                    <Detail label="Username" value={user?.name} />
                    <Detail label="NIM" value={user?.nim} />
                    <Detail label="Email" value={user?.email} />
                    <Detail label="Gender" value={user?.gender} />
                  </div>
                </div>
              </>
            )}

            {/* ======= MY ORDER SECTION ======= */}
            {activeMenu === "order" && (
              <div className="p-4 text-sm font-semibold">
                <div className="flex flex-row gap-x-2">
                  <FaArrowLeft className="mt-0.5 sm:mt-1 w-3 h-3" />
                  <div className="">My Order</div>
                </div>
                <div className="flex flex-col gap-x-2 mt-2 sm:mt-4">
                  <div className="text-lg sm:text-4xl text-[#E56F56] text-uppercase">
                    ORDER DETAIL
                  </div>
                  <div className="mt-4 bg-[#1a1a1a] p-6 rounded-lg">
                    {/* Status - Waiting Confirmation */}
                    <div className="text-[#FDC46F] font-semibold text-sm sm:text-lg text-uppercase">
                      Waiting Confirmation
                    </div>
                    <div className="justify-between text flex flex-row mt-4">
                      <div className="text-white font-light text-xs">
                        Order ID
                      </div>
                      <div className="text-white font-light text-xs">
                        #448230076
                      </div>
                    </div>
                    <div className="justify-between text flex flex-row mt-2">
                      <div className="text-white font-light text-xs">
                        Purchase Date
                      </div>
                      <div className="text-white font-light text-xs">
                        03 September 2024, 10.12
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#1a1a1a] p-6 rounded-lg">
                    {/* Status - Order Delivered*/}
                    <div className="text-[#17AA1A] font-semibold text-sm sm:text-lg text-uppercase">
                      Order Delivered
                    </div>
                    <div className="justify-between text flex flex-row mt-4">
                      <div className="text-white font-light text-xs">
                        Order ID
                      </div>
                      <div className="text-white font-light text-xs">
                        #448230076
                      </div>
                    </div>
                    <div className="justify-between text flex flex-row mt-2">
                      <div className="text-white font-light text-xs">
                        Purchase Date
                      </div>
                      <div className="text-white font-light text-xs">
                        03 September 2024, 10.12
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#1a1a1a] p-6 rounded-lg">
                    {/* Status - Order Cancelled*/}
                    <div className="text-red-600 font-semibold text-sm sm:text-lg text-uppercase">
                      Order Cancelled
                    </div>
                    <div className="justify-between text flex flex-row mt-4">
                      <div className="text-white font-light text-xs">
                        Order ID
                      </div>
                      <div className="text-white font-light text-xs">
                        #448230076
                      </div>
                    </div>
                    <div className="justify-between text flex flex-row mt-2">
                      <div className="text-white font-light text-xs">
                        Purchase Date
                      </div>
                      <div className="text-white font-light text-xs">
                        03 September 2024, 10.12
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#1a1a1a] p-6 rounded-lg">
                    {/* Status - Order Processed*/}
                    <div className="text-blue-600 font-semibold text-sm sm:text-lg text-uppercase">
                      Order Processed
                    </div>
                    <div className="justify-between text flex flex-row mt-4">
                      <div className="text-white font-light text-xs">
                        Order ID
                      </div>
                      <div className="text-white font-light text-xs">
                        #448230076
                      </div>
                    </div>
                    <div className="justify-between text flex flex-row mt-2">
                      <div className="text-white font-light text-xs">
                        Purchase Date
                      </div>
                      <div className="text-white font-light text-xs">
                        03 September 2024, 10.12
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#1a1a1a] p-6 rounded-lg">
                    {/* User Order */}
                    <div className="text-white font-semibold text-sm sm:text-lg text-uppercase">
                      Your Order
                    </div>
                    <div className="flex sm:flex-row flex-col mt-4 justify-between items-center">
                      {/* Kotak putih di kiri */}
                      <div
                        className="md:w-48 md:h-48 w-24 h-24 bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/merch/placeholder.webp')",
                        }}></div>

                      {/* Section teks di kanan */}
                      <div className="flex flex-col text-xs font-light text-white text-right gap-y-2">
                        <div>Table</div>
                        <div>TerraNest Dining Table</div>
                        <div>Qty: 1</div>
                        <div>1 x Rp 1.115.000</div>
                      </div>
                    </div>
                    <div className="text-white font-semibold text-sm sm:text-lg text-uppercase mt-12">
                      Shipping Info
                    </div>
                    <div className="text-white font-light text-sm sm:text-base text-uppercase mt-4">
                      Courier{" "}
                      <span className="ml-0 sm:ml-12">
                        :{" "}
                        <span className="ml-0 sm:ml-12">
                          JNE Express - Regular
                        </span>
                      </span>
                    </div>
                    <div className="text-white font-light text-sm sm:text-base text-uppercase mt-1">
                      <div className="flex flex-row text-xs ml-0 sm:ml-[10.2rem] text-[#9E9E9E]">
                        <div className="underline">JN67910720</div>
                        <IoCopyOutline className="mt-0.5 ml-1" />
                      </div>
                    </div>
                    <div className="text-white font-light text-sm sm:text-base text-uppercase mt-4">
                      Address <span className="ml-0 sm:ml-11">:</span>
                      <div className="w-fit max-w-md ml-0 sm:ml-40 sm:-translate-y-6 -translate-y-0">
                        Jl. Mawar Merah No. 10, RT 03/RW 05, Menteng, Jakarta
                        Pusat, DKI Jakarta 10310
                      </div>
                    </div>
                    <div className="text-white font-light text-sm sm:text-base text-uppercase mt-4">
                      <div className="flex flex-row text-xs ml-0 sm:ml-[10.2rem]"></div>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#1a1a1a] p-6 rounded-lg">
                    {/* Status */}
                    <div className="text-[#FDC46F] font-semibold text-sm sm:text-lg text-uppercase">
                      Order Summary
                    </div>

                    {/* Harga per item */}
                    <div className="justify-between flex flex-row mt-4">
                      <div className="text-white font-light text-xs">
                        Harga / Item
                      </div>
                      <div className="text-white font-light text-xs">
                        Rp 115.000
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="justify-between flex flex-row mt-2">
                      <div className="text-white font-light text-xs">
                        Quantity
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="w-6 h-6 flex items-center justify-center text-white border border-white rounded hover:bg-white hover:text-black transition">
                          -
                        </button>

                        <div className="text-white font-light text-xs">1</div>

                        <button className="w-6 h-6 flex items-center justify-center text-white border border-white rounded hover:bg-white hover:text-black transition">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="justify-between flex flex-row mt-2">
                      <div className="text-white font-light text-xs">
                        Total Harga
                      </div>
                      <div className="text-white font-light text-xs">
                        Rp 115.000
                      </div>
                    </div>
                    <div className="flex flex-row max-w-md gap-x-4 mx-auto ">
                      <button className="mt-6 bg-[#E56F56] w-full p-4 rounded-full font-semibold hover:bg-[#e56e5682] transition">
                        Back
                      </button>
                      <button className="mt-6 bg-[#E56F56] w-full p-4 rounded-full font-semibold hover:bg-[#e56e5682] transition">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div className="grid grid-cols-3 text-gray-300">
      <span>{label}</span>
      <span className="text-center">:</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
