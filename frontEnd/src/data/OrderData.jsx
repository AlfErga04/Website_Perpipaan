// const OrderData = [
//   {
//     id: 120967,
//     name: "Beneran Kaos Polos",
//     orderDate: "2024-06-15",
//     status: "Order Dikonfirmasi",
//     quantity: 2,
//     price: 50000,
//     imgLink: "/order/kaos_placeholder.jpg",
//   },
//   {
//     id: 215802,
//     name: "Bukan Botol Minum",
//     orderDate: "2024-06-16",
//     status: "Order Dibuat",
//     price: 75000,
//     quantity: 1,
//     imgLink: "/order/botol_placeholder.jpg",
//   },
//   {
//     id: 253804,
//     name: "Topinya Yukinoshita",
//     orderDate: "2024-06-17",
//     status: "Order Dipacking",
//     price: 50000,
//     quantity: 3,
//     imgLink: "/order/topi_placeholder.jpg",
//   },
//   {
//     id: 999222,
//     name: "Case Handphone Keren",
//     orderDate: "2024-06-18",
//     status: "Order Siap Diambil",
//     price: 45000,
//     quantity: 5,
//     imgLink: "/order/case_placeholder.jpg",
//   },
//   {
//     id: 247931,
//     name: "Tumbler Kopken Kenangan",
//     orderDate: "2024-06-19",
//     status: "Order Ditolak",
//     price: 30000,
//     quantity: 4,
//     imgLink: "/order/thumbler_placeholder.jpg",
//   },
// ];

// export default OrderData;

import axios from "axios";
import { useEffect, useState } from "react";

const API_ORDERS = import.meta.env.VITE_API_URL + "/api/orders";

export const getAllOrderData = async () => {
  try {
    const resp = await axios.get(API_ORDERS, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getOrderDataById = async (id) => {
  try {
    const resp = await axios.get(`${API_ORDERS}/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};