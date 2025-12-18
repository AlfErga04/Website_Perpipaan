import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

// TF I FORGOR ABOUT INTERFACE LMAO

const OrderCard = ({
  orderDetail,
  onSelect,
  setIsOrderDetail,
  onComplete,
}) => {

  // price id atau apalah gustiii
  const [merchData, setMerchData] = useState(null)
  const statusColorg = {
    "Order Dikonfirmasi": "bg-[#DB5F4A]",
    "Order Dibuat": "bg-[#F66951]",
    "Order Dipacking": "bg-[#C15A23]",
    "Order Siap Diambil": "bg-[#57ad42]",
    "Order Selesai": "bg-[#3b82f6]",
    "Order Ditolak": "bg-[#FF0505]",
  };

  const formatDate = (d) => {
    if (!d) return '—'
    try {
      return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(d))
    } catch (e) {
      return d
    }
  }

  // determine friendly label and color
  const normalizedStatus = (orderDetail.order_status || '').toString().toLowerCase()
  const statusKey = Object.keys(statusColorg).find((k) => k.toLowerCase().includes(normalizedStatus))
  const statusClass = statusColorg[statusKey] || 'bg-gray-500'
  const statusLabel = statusKey || (orderDetail.order_status || 'Unknown')

  const isCompletable = statusLabel === 'Order Siap Diambil'
  const [localStatus, setLocalStatus] = useState(orderDetail.order_status)
  const [localLabel, setLocalLabel] = useState(statusLabel)
  const [localClass, setLocalClass] = useState(statusClass)
  const [thankYou, setThankYou] = useState(false)
  useEffect(() => {
    const fetchMerch = async () => {
      try {
        console.log("orderDetail id item: ", orderDetail.id_item);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/merch/${orderDetail.id_item}`);
        setMerchData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (orderDetail.id_item) {
      fetchMerch();
    }
  }, [orderDetail.id_item])

  console.log("Merch Data : ", merchData)

  const formattedPrice = merchData ? new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(merchData.price) * Number(orderDetail.quantity)) : "Loading...";

  return (
    <div
      className="
        bg-[#1B1B1B] text-white rounded-lg outline-[0.5px] outline-[#c25440e6]
        p-3 flex flex-col justify-between items-center mb-6 
        transform transition duration-300
        hover:scale-[1.015] hover:shadow-lg
        opacity-0 animate-fadeInUp
      "
      onClick={() => onSelect(orderDetail)}
    >
      {/* Atas */}
      <div className="flex flex-row justify-between items-center w-full">
        <div>
          <p className="font-light text-gray-100 text-sm">
            ID : #{orderDetail.id_order}
          </p>
          <p className="font-semibold mb-6">
            Tanggal : {formatDate(orderDetail.order_date)}
          </p>
        </div>

        <div className={`${statusClass} px-4 py-[0.5px] rounded-full w-fit text-sm transition-all`}>
          {statusLabel}
        </div>
      </div>

      {/* Bawah */}
      <div className="flex flex-row justify-between items-center w-full">
        {/* gambar dan nama */}
        <div className="flex flex-row gap-x-3 flex-basis-1/2">
          <div className="overflow-hidden rounded">
            {merchData ? <img
              src={import.meta.env.VITE_API_URL + "/storage/" + merchData.image}
              alt=""
              className="object-cover w-28 h-28 rounded transition-transform duration-300 hover:scale-110"
            /> : ""}
          </div>

          <div>
            <p className="font-extrabold text-lg">{merchData ? merchData.name : "Loading..."}</p>
            <p className="font-light">Jumlah : {orderDetail.quantity}</p>
          </div>
        </div>

        {/* Button */}
        <div className="flex flex-col justify-end flex-basis-1/2 items-end gap-y-1">
          <p>Total :</p>
          <h3 className="font-bold text-lg">{formattedPrice}</h3>

          <div className="flex flex-row gap-x-2">
            <button
              onClick={async (e) => {
                e.stopPropagation()
                if (!isCompletable) return
                try {
                  const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/orders/${orderDetail.id}/complete`, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                  })
                  // update local status UI
                  setLocalStatus(res.data.order_status)
                  const normalized = (res.data.order_status || '').toString().toLowerCase()
                  const key = Object.keys(statusColorg).find((k) => k.toLowerCase().includes(normalized))
                  setLocalLabel(key || res.data.order_status)
                  setLocalClass(statusColorg[key] || 'bg-gray-500')
                  setThankYou(true)
                  setTimeout(() => setThankYou(false), 3000)
                  // notify parent to refresh if provided
                  if (typeof onComplete === 'function') onComplete(res.data)
                } catch (err) {
                  console.error(err)
                  alert(err.response?.data?.message || 'Gagal menyelesaikan pesanan')
                }
              }}
              disabled={!isCompletable}
              className={`rounded-full px-6 py-1 text-white font-semibold transition-all duration-200 ${isCompletable ? 'bg-[#e89e3d] hover:bg-[#f4b455] active:scale-95' : 'bg-[#e89e3d] opacity-60 cursor-not-allowed'}`}
            >
              Selesaikan
            </button>
            {thankYou && <div className="text-green-300 ml-3">Terima Kasih telah berbelanja</div>}

            <button
              className="
                bg-transparent rounded-full px-6 py-1 text-white font-semibold outline outline-[1px] outline-white
                transition-all duration-200
                hover:bg-white hover:text-black active:scale-95
              "
              onClick={() => setIsOrderDetail(true)}
            >
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
