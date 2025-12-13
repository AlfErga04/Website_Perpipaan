import React from "react";

// TF I FORGOR ABOUT INTERFACE LMAO
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

const OrderCard = ({
  orderDetail,
  onSelect,
  setIsOrderDetail,
}: {
  orderDetail: OrderDetail;
  onSelect: (data: OrderDetail) => void;
  setIsOrderDetail: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const statusColorg = {
    "Order Dikonfirmasi": "bg-[#DB5F4A]",
    "Order Dibuat": "bg-[#F66951]",
    "Order Dipacking": "bg-[#C15A23]",
    "Order Siap Diambil": "bg-[#57ad42]",
    "Order Ditolak": "bg-[#FF0505]",
  };

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(orderDetail.price) * Number(orderDetail.quantity));

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
            ID : #{orderDetail.id}
          </p>
          <p className="font-semibold mb-6">
            Tanggal : {orderDetail.orderDate}
          </p>
        </div>

        <div
          className={`${
            statusColorg[orderDetail.status]
          } px-4 py-[0.5px] rounded-full w-fit text-sm transition-all`}
        >
          {orderDetail.status}
        </div>
      </div>

      {/* Bawah */}
      <div className="flex flex-row justify-between items-center w-full">
        {/* gambar dan nama */}
        <div className="flex flex-row gap-x-3 flex-basis-1/2">
          <div className="overflow-hidden rounded">
            <img
              src={orderDetail.imgLink}
              alt=""
              className="object-cover w-28 h-28 rounded transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div>
            <p className="font-extrabold text-lg">{orderDetail.name}</p>
            <p className="font-light">Jumlah : {orderDetail.quantity}</p>
          </div>
        </div>

        {/* Button */}
        <div className="flex flex-col justify-end flex-basis-1/2 items-end gap-y-1">
          <p>Total :</p>
          <h3 className="font-bold text-lg">{formattedPrice}</h3>

          <div className="flex flex-row gap-x-2">
            <button
              className="
                bg-[#e89e3d] rounded-full px-6 py-1 text-white font-semibold
                transition-all duration-200
                hover:bg-[#f4b455] active:scale-95
              "
            >
              Selesaikan
            </button>

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
