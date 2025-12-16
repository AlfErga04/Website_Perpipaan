import { useState, useEffect, useRef } from "react";

const UserLogoutPopup = () => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div ref={popupRef} className="relative">
      {/* ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="hover:bg-[#fffefe] transition duration-300 cursor-pointer px-1 py-1 rounded-full flex items-center justify-center"
      >
        <img
          src="/merch/user_circle.svg"
          alt="User"
          className="w-7 h-7 object-contain"
        />
      </button>

      {/* POPUP */}
      {open && (
        <div className="absolute right-0 mt-2 bg-neutral-800 border border-neutral-600 rounded-xl shadow-lg py-2 w-32 z-50">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-red-500 hover:text-white rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserLogoutPopup;
