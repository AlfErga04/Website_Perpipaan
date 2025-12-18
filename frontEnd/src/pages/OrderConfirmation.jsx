import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getMerchDataById } from "../data/MerchData";
import axios from "axios";
import Alert from "../components/Alert";
import CountdownAlert from "../components/AlertCounter";

export default function OrderConfirmation() {
  const location = useLocation();
  const { productId, quantity } = location.state;
  const [MerchData, setMerchData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);

  let user = JSON.parse(localStorage.getItem("user"));

  // Get API Product by ID
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMerchDataById(productId);
      setMerchData(data);
    }

    fetchData();
  }, []);

  // Parsing State Data
  const itemName = MerchData.id === Number(productId) ? MerchData.name : "Unknown Item";
  const price = MerchData.id === Number(productId) ? MerchData.price : 0;
  const totalPrice = price * quantity;

  // Form Data
  const [form, setForm] = useState({
    // name: "",
    no_whatsapp: "",
    ktm_path: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("name", form.name);
    formData.append("user_id", user.id);
    formData.append("no_whatsapp", form.no_whatsapp);
    formData.append("ktm_path", selectedFile);
    formData.append("id_item", productId);
    formData.append("quantity", quantity);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Axios usually sets this automatically
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`

        },
      });
      setSuccessAdd(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  console.log(localStorage)

  return (
    <>
      {successAdd ? <CountdownAlert /> : null}
      {/* <CountdownAlert /> */}
      <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold mb-6">Order Confirmation</h2>
          <button
            className="relative  text-white bg-[#F66951] rounded-full w-8 h-8 flex items-center justify-center text-xl"
            onClick={() => (window.location.href = "/merch")}
          >
            ×
          </button>
        </div>

        {/* Order Detail from URL */}
        <div className="mb-6 bg-gray-50 p-4 rounded-md">
          {/* {console.log(MerchData.find((item) => item.id === Number(productId)))} */}
          <p className="font-medium">
            Product: <span className="text-[#F66951]">{itemName}</span>
          </p>
          <p className="font-medium mt-4">Quantity: {quantity}</p>
          <p className="font-medium mt-4">Total Price: Rp. {totalPrice}</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md text-sm"
            required
          /> */}

          <input
            type="text"
            name="no_whatsapp"
            placeholder="No Whatsapp +62 (Contoh: 81423582364)"
            onChange={handleChange}
            className="w-full border p-2 rounded-md text-sm"
            required
          />

          <input type="file" name="ktm_path" onChange={(e) => {
            // const file = e.target.value[0];
            // let formData = new FormData();
            // formData.append("ktm_path", file);
            // console.log("regi :", formData);
            // setForm({ ...form, ktm_path: formData });
            setSelectedFile(e.target.files[0]);
          }} required className="w-full border p-2 rounded-md text-sm" />

          <button
            type="submit"
            className="w-full bg-[#F66951] text-white py-2 rounded-lg font-semibold transition hover:opacity-90"
          >
            Submit Order
          </button>
        </form>
      </div>
    </>
  );
}
