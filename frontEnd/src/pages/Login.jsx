import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email,
          password,
        }
      );

      // simpan token ke localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect ke dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-neutral-950">
      <div className="bg-neutral-900 border border-[#F6695180] rounded-xl p-10 w-[420px]">
        <button
          onClick={() => navigate("/")}
          className="text-[#F66951] text-sm mb-5 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <div className="flex justify-center mb-6">
          <img
            src="/login-register/user_circle.svg"
            alt="user"
            className="w-20 opacity-90"
          />
        </div>

        <h2 className="text-3xl font-semibold text-center mb-8 text-white tracking-wide">
          LOGIN
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
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
            Login
          </button>
        </form>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <p className="text-center text-sm text-gray-400 mt-6">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#F66951] hover:underline">
            Register sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
