import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        nim,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Register gagal!");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-neutral-950">
      <div className="bg-neutral-900 border border-[#F6695180] rounded-xl p-10 w-[420px]">
        <button
          onClick={() => navigate("/login")}
          className="text-[#F66951] text-sm mb-5 hover:underline"
        >
          ← Back to Login
        </button>

        <div className="flex justify-center mb-6">
          <img
            src="/login-register/user_circle.svg"
            alt="user"
            className="w-20 opacity-90"
          />
        </div>

        <h2 className="text-3xl font-semibold text-center mb-8 text-white tracking-wide">
          REGISTER
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-neutral-800 border border-neutral-700 text-white p-3 rounded focus:outline-none focus:border-[#F66951]"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="NIM"
            className="w-full bg-neutral-800 border border-neutral-700 text-white p-3 rounded focus:outline-none focus:border-[#F66951]"
            onChange={(e) => setNim(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-neutral-800 border border-neutral-700 text-white p-3 rounded focus:outline-none focus:border-[#F66951]"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-neutral-800 border border-neutral-700 text-white p-3 rounded focus:outline-none focus:border-[#F66951]"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-[#F66951] hover:bg-[#e45740] transition font-semibold text-neutral-900 py-3 rounded mt-2">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-[#F66951] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
