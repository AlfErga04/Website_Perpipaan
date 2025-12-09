import { useRef, useEffect } from "react";

export default function Alert({
  type = "info",
  message,
  onOutsideClick,
  children,
}) {
  const color =
    type === "error"
      ? "bg-red-100 text-red-700 border-red-500"
      : type === "success"
      ? "bg-green-100 text-green-700 border-green-500"
      : "bg-blue-100 text-blue-700 border-blue-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`border ${color} p-4 rounded-md shadow-lg max-w-[350px] w-full`}
      >
        <p className="text-sm">{message}</p>
        {children}
      </div>
    </div>
  );
}
