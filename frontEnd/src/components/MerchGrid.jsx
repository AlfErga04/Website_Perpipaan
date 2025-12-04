import { useState, useEffect } from "react";
import React from "react";
import { createPortal } from "react-dom";

const MerchGrid = ({ datas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 justify-center max-w-[75%] mx-auto mt-4 md:mt-12 mb-6 opacity-0 animate-[fadeIn_0.5s_forwards] h-fit">
      {datas.map((data, index) => {
        return (
          <SingleCard
            key={index}
            image={data.image}
            CardTitle={data.cardTitle}
            countFav={data.countFavorite}
            price={data.price}
            CardDescription={data.cardDesc}
          />
        );
      })}
    </div>
  );
};

export default MerchGrid;

const SingleCard = ({
  image,
  countFav,
  CardDescription,
  CardTitle,
  btnHref,
  price,
}) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showModal]);

  return (
    <>
      {/*  */}
      <div
        className="mb-2 overflow-hidden rounded-sm shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3 border-[0.5px] border-white text-left h-full hover:bg-[#F66951]"
        onClick={() => setShowModal(true)}
      >
        <div className="w-full h-[50%] bg-amber-400">
          <img
            src={image}
            alt=""
            className="overflow-hidden w-full h-full object-cover"
          />
        </div>
        <div className="px-8 sm:px-9 sm:py-3 md:px-7 md:py-4 xl:px-9 xl:py-5 h-1/2">
          <div className="flex flex-col justify-between h-[80%]">
            <div>
              <p className="block text-sm font-medium text-dark hover:text-primary dark:text-white sm:text-[12px] md:text-lg lg:text-[18px] xl:text-lg 2xl:text-[22px] pointer-events-none">
                {CardTitle}
              </p>
              <p className="text-xs font-light leading-relaxed text-body-color dark:text-dark-6 line-clamp-2 pointer-events-none">
                {CardDescription}
              </p>
              <h3 className="mb-[10%] font-bold my-2">{formattedPrice}</h3>
            </div>
            <div>
              <hr className="mb-6"></hr>
            </div>
          </div>
          <div className="flex flex-row justify-between h-[30%] items-center">
            <div className="flex flex-row gap-x-2 items-center">
              <img src="/merch/love.svg" alt="love svg" className="w-3" />
              <p className="text-base">{countFav}</p>
            </div>
            <div className="z-10">
              <button
                className="inline-block rounded-full border border-slate-100 px-10 py-1 text-sm font-sm text-body-color transition hover:border-primary hover:bg-primary hover:bg-white hover:text-[#F66951] hover:border-[#de3e21] duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open("https://wa.me/6281234567890", "_blank");
                }}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={() => setShowModal(false)}
            />

            <div
              className="fixed top-1/2 left-1/2 z-50 w-full max-w-md p-6 bg-white dark:bg-dark-2 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside box
            >
              <div className="w-full h-48 mb-4">
                <img
                  src={image}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <h2 className="text-xl font-bold mb-2">{CardTitle}</h2>
              <p className="text-base mb-4">{CardDescription}</p>
              <h3 className="font-bold text-lg mb-6">{formattedPrice}</h3>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-[#F66951] text-white rounded-md"
                  onClick={() =>
                    window.open("https://wa.me/6281234567890", "_blank")
                  }
                >
                  Order
                </button>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
};
