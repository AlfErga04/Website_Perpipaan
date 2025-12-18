// const MerchData = [
//   {
//     id: 120967,
//     image: "/order/kaos_placeholder.jpg",
//     cardTitle: "Beneran Kaos Polos",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 100,
//     cardDesc:
//       "Kaos keren dari HIMA. Bahan nyaman dipakai sehari-hari. Tersedia berbagai ukuran. Kalau make ini, dijamin bisa lulus kuliah 3 Semester!",
//   },
//   {
//     id: 215802,
//     image: "/order/botol_placeholder.jpg",
//     cardTitle: "Bukan Botol Minum",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 10,
//     cardDesc:
//       "Ini bukan botol minum biasa. Kalau minum make ini, dijamin bisa lulus kuliah 3 Semester (kalo misal ambil 144 SKS)!",
//   },
//   {
//     id: 253804,
//     image: "/order/topi_placeholder.jpg",
//     cardTitle: "Topinya Yukinoshita",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 10,
//     cardDesc:
//       "Topi keren dibikin sama Yukinoshita. Kalau make ini, ngga dijamin lulus 3 Semester, soalnya kita realistis saja ya.",
//   },
//   {
//     id: 999222,
//     image: "/order/case_placeholder.jpg",
//     cardTitle: "Case Handphone Keren",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 10,
//     cardDesc:
//       "Case handphone keren dari HIMA. Case nya ngga cepet kuning kayak Redmi Note 9. Make case ini dijamin hp nya ngga matot kayak Redmi Note 9.",
//   },
//   {
//     id: 247931,
//     image: "/order/thumbler_placeholder.jpg",
//     cardTitle: "Tumbler Kopken Kenangan",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 10,
//     cardDesc:
//       "Tumbler nya hasil collab sama Kopi Kenangan. Tumblernya ngga cepat rusak sama bocor ngga sama kayak tumblernya ayam yang ada galonnya itu.",
//   },
//   {
//     id: 120967,
//     image: "/order/kaos_placeholder.jpg",
//     cardTitle: "Beneran Kaos Polos",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 100,
//     cardDesc:
//       "Kaos keren dari HIMA. Bahan nyaman dipakai sehari-hari. Tersedia berbagai ukuran. Kalau make ini, dijamin bisa lulus kuliah 3 Semester!",
//   },
//   {
//     id: 215802,
//     image: "/order/botol_placeholder.jpg",
//     cardTitle: "Bukan Botol Minum",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 10,
//     cardDesc:
//       "Ini bukan botol minum biasa. Kalau minum make ini, dijamin bisa lulus kuliah 3 Semester (kalo misal ambil 144 SKS)!",
//   },
//   {
//     id: 253804,
//     image: "/order/topi_placeholder.jpg",
//     cardTitle: "Topinya Yukinoshita",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 10,
//     cardDesc:
//       "Topi keren dibikin sama Yukinoshita. Kalau make ini, ngga dijamin lulus 3 Semester, soalnya kita realistis saja ya.",
//   },
//   {
//     id: 999222,
//     image: "/order/case_placeholder.jpg",
//     cardTitle: "Case Handphone Keren",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 10,
//     cardDesc:
//       "Case handphone keren dari HIMA. Case nya ngga cepet kuning kayak Redmi Note 9. Make case ini dijamin hp nya ngga matot kayak Redmi Note 9.",
//   },
//   {
//     id: 247931,
//     image: "/order/thumbler_placeholder.jpg",
//     cardTitle: "Tumbler Kopken Kenangan",
//     countFavorite: 100,
//     price: 1000000,
//     dataTersisa: 10,
//     cardDesc:
//       "Tumbler nya hasil collab sama Kopi Kenangan. Tumblernya ngga cepat rusak sama bocor ngga sama kayak tumblernya ayam yang ada galonnya itu.",
//   },
// ];
// export default MerchData;

import axios from "axios";
import { useEffect, useState } from "react";

const API_MERCH = import.meta.env.VITE_API_URL + "/api/merch";

export const getAllMerchData = async () => {
  try {
    const resp = await axios.get(API_MERCH);
    return resp.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMerchDataById = async (id) => {
  try {
    const resp = await axios.get(`${API_MERCH}/${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export default [getAllMerchData getMerchDataById;