import React, { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import MerchGrid from "../components/MerchGrid";
import MerchData from "../data/MerchData";
import Pagination from "../components/Pagination";

function Merch() {
  const [merchPage, setMerchPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  const lastMerchData = merchPage * postPerPage;
  const firstMerchData = lastMerchData - postPerPage;
  const currentMerchData = MerchData.slice(firstMerchData, lastMerchData);
  return (
    <div className="bg-neutral-900 text-white min-w-screen">
      <div className="top-0">
        <NavBar />
      </div>

      {/* Hero Section */}
      <div
        className="w-screen min-h-44 md:min-h-64 lg:min-h-84 bg-cover bg-center flex flex-col items-center justify-center opacity-0 animate-[fadeIn_0.5s_forwards]"
        style={{
          backgroundImage: "url('/merch/hero.webp')",
        }}
      >
        <div className="text-sm sm:text-lg md:text-xl lg:text-2xl">
          Merchandise Himpunan
        </div>
        <div className="font-bold text-md sm:text-xl md:text-2xl lg:text-3xl mt-4">
          Kumpulan Merchandise Himpunan
        </div>
      </div>

      <div className="max-w-[75%] mb-5 mt-12 mx-auto">
        <h1 className="font-bold text-2xl">Merchandise</h1>
      </div>

      <MerchGrid datas={currentMerchData} />
      <Pagination
        postPerData={postPerPage}
        totalData={MerchData.length}
        classAdd={
          "flex flex-row gap-x-2 max-w-[75%] mx-auto justify-end mb-20 mt-8"
        }
        setCurrentPage={setMerchPage}
        currentPage={merchPage}
      />

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Merch;
