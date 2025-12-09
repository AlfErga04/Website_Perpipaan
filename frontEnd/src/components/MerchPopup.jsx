import React from "react";
import { useState } from "react";

const MerchPopup = ({
  id,
  imageM,
  CardTitleM,
  CardDescriptionM,
  formattedPriceM, // optional formatted string (e.g. "Rp 12.000")
  unitPriceM, // optional numeric unit price (preferred)
  setShowModalM,
  dataTersisa,
}) => {
  const [count, setCount] = useState(1);

  // derive max allowed count from stock; treat invalid stock as unlimited
  const maxCount = Number.isFinite(Number(dataTersisa))
    ? Math.max(1, Number(dataTersisa))
    : Infinity;

  // helper to parse formatted price strings (remove non-digits)
  const parseFormatted = (s) => {
    if (s == null) return 0;
    const onlyDigits = String(s).replace(/[^\d]/g, "");
    return onlyDigits === "" ? 0 : Number(onlyDigits);
  };

  // unit price: prefer numeric prop, otherwise try to parse formatted string
  const unitPrice = Number.isFinite(Number(unitPriceM))
    ? Number(unitPriceM)
    : parseFormatted(formattedPriceM || 0);

  const increase = () =>
    setCount((c) => Math.min((Number.isFinite(c) ? c : 0) + 1, maxCount));

  const decrease = () =>
    setCount((c) => Math.max((Number.isFinite(c) ? c : 0) - 1, 1));

  const handleManual = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCount(value === "" ? 0 : Number(value));
    }
  };

  const handleBlurClamp = () => {
    const current = Number.isFinite(Number(count)) ? Number(count) : 0;
    if (current <= 0) return setCount(1);
    if (current > maxCount) return setCount(maxCount);
    return setCount(current);
  };

  // compute totals
  const total =
    (Number.isFinite(Number(unitPrice)) ? Number(unitPrice) : 0) *
    (Number.isFinite(Number(count)) ? Number(count) : 0);
  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(total);
  const formattedUnit = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(unitPrice);

  return (
    <>
      {/* background stopper */}
      <div
        className="fixed inset-0 bg-slate-800/60 flex items-center justify-center z-50"
        onClick={() => setShowModalM(false)}
      />

      <div
        className="fixed top-1/2 left-1/2 flex flex-row z-50 w-[70vw] h-[70vh] bg-white dark:bg-dark-2 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside box
      >
        {/* Close sign */}
        <button
          className="absolute top-3 right-3 text-white bg-[#F66951] rounded-full w-8 h-8 flex items-center justify-center text-xl"
          onClick={() => setShowModalM(false)}
        >
          ×
        </button>
        {/* image */}
        <div className="w-full h-full mb-4 basis-2/5">
          <img src={imageM} className="w-full h-full object-cover rounded" />
        </div>
        {/* info */}
        <div className="basis-3/5 bg-[#1E1E1E] text-[#F5F5F5] p-6 flex flex-col">
          <h2 className="text-3xl font-bold mb-2">{CardTitleM}</h2>
          <h3 className="text-base">
            Tersisa : <span className="font-bold">{dataTersisa}</span>
          </h3>
          <div className="bg-[#272727] w-[70%] mt-4 rounded-lg">
            <h3 className="font-bold text-3xl py-1 pl-5 text-[#F66951]">
              {formattedTotal}
            </h3>
          </div>

          {/* kotak apalah itu gw lupa jir aowkeowakoe */}
          <div className="flex items-center justify-center gap-3 text-white rounded-lg mt-4 w-[70%]">
            {/* counter */}
            <div className="flex items-center gap-4 bg-[#272727] py-2 rounded-lg px-7 basis-2/5">
              <button
                onClick={decrease}
                className="text-xl font-bold"
                disabled={count <= 1}
              >
                -
              </button>

              <input
                type="text"
                value={count}
                onChange={handleManual}
                onBlur={handleBlurClamp}
                className="w-10 text-center bg-transparent outline-none text-xl font-normal"
              />

              <button
                onClick={increase}
                className="text-2xl font-bold"
                disabled={count >= maxCount}
              >
                +
              </button>
            </div>

            {/* order button */}
            <div
              className="bg-[#F66951] flex items-center gap-3 px-5 py-2 rounded-lg cursor-pointer basis-3/5"
              onClick={() => {
                if (count > maxCount) {
                  alert("Anda memesan melebihi stok yang tersedia!");
                  return;
                }
                // Process to OrderConfirmation page
                window.location.href = `/order-confirmation?itemID=${encodeURIComponent(
                  id
                )}&quantity=${encodeURIComponent(count)}`;
              }}
            >
              <img src="/merch/cart.svg" className="w-7" />
              <span className="text-xl text-[#eaeaea]">Order</span>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-white">Detail Produk</h2>
            <div className="w-40 h-[4px] bg-[#F66951] mt-1"></div>
          </div>

          {/* Product Description */}
          <div className="mt-3 flex-1 overflow-y-auto w-[90%]">
            <h3 className="text-base font-light mb-4">{CardDescriptionM}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchPopup;
