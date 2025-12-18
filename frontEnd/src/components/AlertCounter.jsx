import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CountdownAlert() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (count === 0) {
    //         navigate("/merch");
    //         return;
    //     }

    //     const timer = setTimeout(() => {
    //         setCount((prev) => prev - 1);
    //     }, 1000);

    //     return () => clearTimeout(timer);
    // }, [count, navigate]);

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 text-center animate-fadeIn">

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#F66951]/10">
                            <svg
                                className="w-8 h-8 text-[#F66951]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Terima Kasih! 🎉
                    </h1>

                    {/* Message */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        Terima kasih telah membeli merch kami.
                        <br />
                        Informasi selanjutnya dapat Anda cek secara berkala melalui website atau email.
                    </p>

                    {/* Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = "/merch";
                        }}
                        className="w-full bg-[#F66951] text-white py-2.5 rounded-lg font-semibold transition hover:opacity-90 hover:scale-[1.02]"
                    >
                        Kembali ke Laman Merch
                    </button>
                </div>
            </div>

        </>
    );
}
