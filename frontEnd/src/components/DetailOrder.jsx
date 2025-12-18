import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const DetailOrder = ({ OrderData, onComplete }) => {
  console.log("OrderData:", OrderData);

  const formatDate = (d) => {
    if (!d) return '—'
    try {
      return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(d))
    } catch (e) {
      return d
    }
  }

  // price id atau apalah gustiii
  const [merchData, setMerchData] = useState("")
  const [thankYou, setThankYou] = useState(false)
  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/merch/${OrderData.id_item}`);
        setMerchData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMerch();
  }, [OrderData.id_item])

  console.log("Order Data : ", OrderData.id_item)
  console.log("Merch Data : ", merchData)
  return (
    <div className="flex flex-row justify-between gap-x-4">
      {/* Left */}
      <div className="flex flex-col w-full">
        {/* Top */}
        <div className="flex flex-col bg-[#1B1B1B] rounded-xl p-4 shadow-[1px_5px_7px_0_rgba(246,105,81,0.10)] mb-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#f6695133] hover:scale-[1.01] active:scale-[0.99]">
          <h2 className="text-xl font-semibold mb-2">Data Order</h2>
          <div className="flex flex-row justify-between">
            <p>Order ID :</p>
            <p>#{OrderData.id_order}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Tanggal Pemesanan :</p>
            <p>{formatDate(OrderData.order_date)}</p>
          </div>
        </div>
        {/* Bottom */}
        <div className="flex flex-col bg-[#1B1B1B] rounded-xl p-4 shadow-[1px_5px_7px_0_rgba(246,105,81,0.10)] transition-all duration-300 hover:shadow-lg hover:shadow-[#f6695133] hover:scale-[1.01] active:scale-[0.99]">
          <h2 className="text-xl font-semibold mb-2">Order Kamu</h2>
          <div className="flex flex-row gap-x-3 flex-basis-1/2">
            <div className="overflow-hidden rounded">
              {merchData ? <img
                src={import.meta.env.VITE_API_URL + "/storage/" + merchData.image}
                alt=""
                className="object-cover w-28 h-28 rounded transition-transform duration-300 hover:scale-110"
              /> : ""}

            </div>

            <div>
              <p className="font-extrabold text-lg">{merchData.name}</p>
              <p className="font-light">Jumlah : {OrderData.quantity}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="w-full">
        <div className="flex flex-col bg-[#1B1B1B] rounded-xl p-4 shadow-[1px_5px_7px_0_rgba(246,105,81,0.10)] gap-y-5 transition-all duration-300 hover:shadow-lg hover:shadow-[#f6695133] hover:scale-[1.01] active:scale-[0.99]">
          <h2 className="text-xl font-bold text-[#f37c64] underline underline-offset-12 mb-2">
            Order Summary
          </h2>
          <div className="flex flex-row justify-between">
            <div className="">
              <p>Harga/Item : </p>
              <p className="font-extralight text-slate-200 text-sm">
                Paket {OrderData.name}
              </p>
            </div>
            <p>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(Number(merchData.price))} x {OrderData.quantity}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Status Pesanan :</p>
            <div>
              {(() => {
                const statusColorg = {
                  "Order Dikonfirmasi": "bg-[#DB5F4A]",
                  "Order Dibuat": "bg-[#F66951]",
                  "Order Dipacking": "bg-[#C15A23]",
                  "Order Siap Diambil": "bg-[#57ad42]",
                  "Order Ditolak": "bg-[#FF0505]",
                }
                const normalized = (OrderData.order_status || '').toString().toLowerCase();
                const key = Object.keys(statusColorg).find(k => k.toLowerCase().includes(normalized));
                const cls = statusColorg[key] || 'bg-gray-500'
                const label = key || (OrderData.order_status ? OrderData.order_status : 'Unknown')
                return (
                  <div className={`${cls} px-3 py-1 rounded-full text-sm text-white`}>{label}</div>
                )
              })()}
            </div>
          </div>

          {/* Complete button (same behavior as Dashboard) */}
          <div className="flex items-center justify-between">
            <div />
            {(() => {
              const statusColorg = {
                "Order Dikonfirmasi": "bg-[#DB5F4A]",
                "Order Dibuat": "bg-[#F66951]",
                "Order Dipacking": "bg-[#C15A23]",
                "Order Siap Diambil": "bg-[#57ad42]",
                "Order Ditolak": "bg-[#FF0505]",
                "Order Selesai": "bg-[#3b82f6]",
              }
              const normalized = (OrderData.order_status || '').toString().toLowerCase();
              const selectedLabel = Object.keys(statusColorg).find(k => k.toLowerCase().includes(normalized)) || OrderData.order_status
              const isCompletable = selectedLabel === 'Order Siap Diambil'

              const completeOrder = async () => {
                if (!isCompletable) return
                try {
                  const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/orders/${OrderData.id}/complete`, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                  })
                  // inform parent if provided
                  if (typeof onComplete === 'function') onComplete(res.data)
                  setThankYou(true)
                  setTimeout(() => setThankYou(false), 3000)
                } catch (err) {
                  console.error(err)
                  alert(err.response?.data?.message || 'Gagal menyelesaikan pesanan')
                }
              }

              return (
                <div className="flex items-center gap-4">
                  {/* <button
                    onClick={completeOrder}
                    disabled={!isCompletable}
                    className={`px-7 py-2 text-white rounded-full font-light ${isCompletable ? 'bg-[#F66951]' : 'bg-[#F66951] opacity-60 cursor-not-allowed'}`}
                  >
                    Selesaikan Pesanan
                  </button> */}
                  {thankYou && <div className="text-green-300 font-semibold">Terima Kasih telah berbelanja</div>}
                </div>
              )
            })()}
          </div>

          <hr className="border-[#F66951]" />

          {OrderData?.order_status && OrderData?.admin_note && (OrderData.order_status.toString().toLowerCase().includes('ditolak')) && (
            <div className="mt-4 p-4 bg-[#2a0b0b] rounded-xl border border-[#FF0505] text-red-200">
              <h3 className="font-semibold text-lg text-[#FFB3B3] mb-2">Pesan dari Admin (Penolakan)</h3>
              <p className="text-sm">{OrderData.admin_note}</p>
            </div>
          )}

          <div className="flex flex-row justify-between">
            <p className="font-bold text-lg">Total Pembayaran :</p>
            <p className="font-bold text-2xl text-[#F66951]">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(Number(merchData.price) * Number(OrderData.quantity))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
