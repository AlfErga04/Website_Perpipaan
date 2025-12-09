import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MerchData from "../data/MerchData";
import Alert from "../components/Alert";

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const itemID = searchParams.get("itemID") || "";
  const quantity = searchParams.get("quantity") || 1;

  const itemName =
    MerchData.find((item) => item.id === Number(itemID))?.cardTitle ||
    "Unknown Item";
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...form,
      itemID,
      quantity,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      {console.log(itemID)}
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
        {console.log(MerchData.find((item) => item.id === Number(itemID)))}
        <p className="font-medium">
          Product: <span className="text-[#F66951]">{itemName}</span>
        </p>
        <p className="font-medium mt-4">Quantity: {quantity}</p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm"
          required
        />

        <input
          type="text"
          name="studentId"
          placeholder="Academic Number"
          value={form.studentId}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#F66951] text-white py-2 rounded-lg font-semibold transition hover:opacity-90"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
