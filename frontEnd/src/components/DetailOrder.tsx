import React from "react";

interface OrderDetail {
  id: string;
  orderDate: string;
  imgLink: string;
  name: string;
  quantity: string;
  status:
    | "Order Dikonfirmasi"
    | "Order Dibuat"
    | "Order Dipacking"
    | "Order Siap Diambil"
    | "Order Ditolak";
  price: number;
}

const DetailOrder = ({ orderData }: { orderData: OrderDetail }) => {
  console.log(orderData);
  return (
    <div className="flex flex-row justify-between gap-x-4">
      {/* Left */}
      <div className="flex flex-col w-full">
        {/* Top */}
        <div className="flex flex-col bg-[#1B1B1B] rounded-xl p-4 shadow-[1px_5px_7px_0_rgba(246,105,81,0.10)] mb-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#f6695133] hover:scale-[1.01] active:scale-[0.99]">
          <h2 className="text-xl font-semibold mb-2">Data Order</h2>
          <div className="flex flex-row justify-between">
            <p>Order ID :</p>
            <p>#{orderData.id}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Tanggal Pemesanan :</p>
            <p>{orderData.orderDate}</p>
          </div>
        </div>
        {/* Bottom */}
        <div className="flex flex-col bg-[#1B1B1B] rounded-xl p-4 shadow-[1px_5px_7px_0_rgba(246,105,81,0.10)] transition-all duration-300 hover:shadow-lg hover:shadow-[#f6695133] hover:scale-[1.01] active:scale-[0.99]">
          <h2 className="text-xl font-semibold mb-2">Order Kamu</h2>
          <div className="flex flex-row gap-x-3 flex-basis-1/2">
            <div className="overflow-hidden rounded">
              <img
                src={orderData.imgLink}
                alt=""
                className="object-cover w-28 h-28 rounded transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div>
              <p className="font-extrabold text-lg">{orderData.name}</p>
              <p className="font-light">Jumlah : {orderData.quantity}</p>
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
                Paket {orderData.name}
              </p>
            </div>
            <p>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(Number(orderData.price))}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Status Pesanan :</p>
            <p>{orderData.status}</p>
          </div>

          <hr className="border-[#F66951]" />

          <div className="flex flex-row justify-between">
            <p className="font-bold text-lg">Total Pembayaran :</p>
            <p className="font-bold text-2xl text-[#F66951]">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(Number(orderData.price) * Number(orderData.quantity))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
