import { useState, useEffect } from "react";
import React from "react";
import { createPortal } from "react-dom";
import MerchPopup from "./MerchPopup";

const MerchGrid = ({ datas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 justify-center max-w-[75%] mx-auto mt-4 md:mt-12 mb-6 opacity-0 animate-[fadeIn_0.5s_forwards] h-fit">
      {datas.map((data, index) => {
        return (
          <SingleCard
            key={index}
            id={data.id}
            image={data.image}
            CardTitle={data.cardTitle}
            countFav={data.countFavorite}
            price={data.price}
            CardDescription={data.cardDesc}
            dataTersisa={data.dataTersisa}
          />
        );
      })}
    </div>
  );
};

export default MerchGrid;

const SingleCard = ({
  id,
  image,
  countFav,
  CardDescription,
  CardTitle,
  btnHref,
  price,
  dataTersisa,
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
              <div className="title-container @container w-full">
                <p className="product-title @sm:text-[16px] @md:text-[18px] @lg:text-[22px] @xl:text-[26px] font-medium max-w-2xl text-dark dark:text-white line-clamp-2 pointer-events-none">
                  {CardTitle}
                </p>
              </div>

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
            {/* left side */}
            <div className="flex flex-row gap-x-2 items-center">
              <img
                src="/merch/love.svg"
                alt="love svg"
                className="w-3 sm:w-4 md:w-5"
              />
              <p className="text-xs sm:text-sm md:text-base font-normal">
                {countFav}
              </p>
            </div>

            {/* right side */}
            <div className="z-10">
              <button
                className="inline-block rounded-full border border-slate-100
      px-4 py-[2px] text-[10px]
      sm:px-6 sm:py-[4px] sm:text-xs
      md:px-8 md:py-1 md:text-sm
      font-medium text-body-color transition
      hover:border-primary hover:bg-primary hover:bg-white
      hover:text-[#F66951] hover:border-[#de3e21] duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
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
          <MerchPopup
            id={id}
            imageM={image}
            CardTitleM={CardTitle}
            CardDescriptionM={CardDescription}
            formattedPriceM={formattedPrice}
            setShowModalM={setShowModal}
            dataTersisa={dataTersisa}
          />,
          document.body
        )}
    </>
  );
};
