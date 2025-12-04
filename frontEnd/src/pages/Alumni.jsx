import { List } from 'lucide-react';

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AlumniTable from "../components/AlumniTable";
import AlumniJobCharts from '../components/AlumniJobCharts';
import { useEffect } from 'react';



function Alumni() {
  return (
    <div className="bg-neutral-900 text-white min-w-screen ">
      <div className="top-0">
        <NavBar />
      </div>

      {/* Hero Section */}
      <div
        className="w-screen min-h-44 md:min-h-64 lg:min-h-84 bg-cover bg-center flex flex-col items-center justify-center opacity-0 animate-[fadeIn_0.5s_forwards]"
        style={{
          backgroundImage: "url('/alumni/hero.webp')",
        }}
      >
        <div className="text-sm sm:text-lg md:text-xl lg:text-2xl">
          Data Alumni
        </div>
        <div className="font-bold text-md sm:text-xl md:text-2xl lg:text-3xl mt-4">
          Studi Teknik Perpipaan
        </div>
      </div>

        <div className="lg:mx-36 my-8 lg:my-12 flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2">
                <List className="hidden sm:block size-8"/><div className="text-lg font-bold">Daftar Alumni Teknik Perpipaan</div>
            </div>
            <div className="text-sm text-gray-300">Daftar alumni beserta tahun kelulusan</div>
        </div>

              {/* Tambahkan chart di sini */}
      <div className="flex justify-center h-50 w-full">
        <AlumniJobCharts />
      </div>

      <div className="items-center justify-center max-w-[75%] mx-auto mt-4 md:mt-12 mb-14 opacity-0 animate-[fadeIn_0.5s_forwards]">
        <AlumniTable/>
      </div>

      <div>
        <Footer/>
      </div>

    </div>
  );
}

export default Alumni;
