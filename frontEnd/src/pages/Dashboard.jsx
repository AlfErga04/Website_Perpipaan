import { FaUser, FaHistory, FaEdit, FaArrowLeft } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import OrderData from "../data/OrderData";
import OrderCard from "../components/OrderCard";
import DetailOrder from "../components/DetailOrder";

export default function AccountDashboard() {
  const [activeMenu, setActiveMenu] = useState("account");
  const [isOrderDetail, setIsOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
                ${activeMenu === "account"
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
                ${activeMenu === "order"
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
            {activeMenu === "order" && !isOrderDetail && (
              <div id="order">
                <button
                  onClick={() => setActiveMenu("account")}
                  className="flex items-center gap-2 text-gray-300 mb-6 hover:underline"
                >
                  <FaArrowLeft /> Back to My Account
                </button>

                <h1 className="text-3xl font-bold text-[#E56F56] mb-4">
                  MY ORDER
                </h1>

                {!OrderData.length ? (
                  <p className="text-gray-300">You have no orders yet.</p>
                ) : (
                  OrderData.map((order) => (
                    <OrderCard key={order.id} orderDetail={order} setIsOrderDetail={setIsOrderDetail} onSelect={(data) => { setSelectedOrder(data) }} />
                  ))
                )}
              </div>
            )}

            {/* ======= ORDER DETAIL SECTION ======= */}
            {isOrderDetail && selectedOrder && (
              <div>
                <button
                  onClick={() => setIsOrderDetail(false)}
                  className="flex items-center gap-2 text-gray-300 mb-6 hover:underline"
                >
                  <FaArrowLeft /> Back to My Orders
                </button>

                <div className="flex flex-row justify-between items-center mb-3">
                  <h1 className="text-3xl font-bold text-[#E56F56] mb-4">
                    ORDER DETAIL
                  </h1>
                  <button className="px-7 py-2 bg-[#F66951] text-white rounded-full font-light">Selesaikan Pesanan</button>
                </div>

                <div>
                  <DetailOrder orderData={selectedOrder} />
                </div>

                <div className="mt-12 p-4 bg-[#1a1a1a] rounded-xl border border-[0.5px] border-[#E56F56] text-slate-50 transition-all duration-300 hover:shadow-lg hover:shadow-[#f6695133] hover:scale-[1.01] active:scale-[0.99]">
                  <p>Note :</p>
                  <p>Barang yang sudah dibeli tidak dapat direfund atau dikembalikan</p>
                  <p>Setelah status barang "Siap Diambil", Silahkan diambil pada <span className="font-bold text-[#E56F56]">Gedung HIMA</span> kita</p>
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


