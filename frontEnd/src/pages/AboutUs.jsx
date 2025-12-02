import { ChevronDown } from "lucide-react";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import DepartementSection from "../components/DepartementSection";

function AboutUs() {
  return (
    <div className="bg-neutral-900 text-white min-w-screen">
      <div className="top-0">
        <NavBar />
      </div>

      {/* Hero Section */}
      <div
        className="w-screen min-h-44 md:min-h-64 lg:min-h-84 bg-cover bg-center flex flex-col items-center justify-center opacity-100 animate-[fadeIn_0.5s_forwards]"
        style={{
          backgroundImage: "url('/about-us/hero.webp')",
        }}
      >
        <div className="text-sm sm:text-lg md:text-xl lg:text-2xl">
          About Us
        </div>
        <div className="font-bold text-md sm:text-xl md:text-2xl lg:text-3xl mt-4">
          Patra Abhyakta
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center max-w-[65%] mx-auto gap-18 lg:gap-32 mt-32 opacity-0 animate-[fadeIn_0.5s_forwards]">
        {/* Gambar */}
        <div className="flex justify-center">
          <img
            src="/about-us/about-us.webp"
            alt="Foto Kahim, BPH dan Kabinet"
            className="w-full max-h-[500px] lg:min-h-[200px] lg:max-h-[600px] object-cover md:justify-items-center"
          />
        </div>

        <div className="justify-end items-center lg:max-w-xl">
          <div className="justify-items-center text-md md:text-lg lg:text-2xl text-center lg:text-left font-bold">
            Tentang Patra Abhyakta
          </div>
          <div className="flex justify-center lg:justify-start font-extralight text-pretty text-xs md:text-sm text-center lg:text-left mt-2">
            Patra Abhyakta merupakan filosofi yang merepresentasikan makna mendalam di balik perjalanan Himpunan Mahasiswa Teknik Perpipaan (HMTP). Patra bermakna "wadah" atau "tempat", yang dalam konteks organisasi diartikan sebagai rumah dan ruang kerja bersama. Ini mencerminkan komitmen untuk menciptakan lingkungan yang nyaman dan produktif demi mewujudkan visi dan misi HMTP. Sementara itu, Abhyakta mengandung makna perkembangan, potensi, dan kualitas. Dalam organisasi, hal ini diwujudkan melalui pengembangan potensi setiap mahasiswa Teknik Perpipaan agar menjadi individu berkualitas dan siap menghadapi tantangan masa depan. Gabungan dari keduanya, Patra Abhyakta, menjadi simbol bahwa HMTP adalah wadah bagi mahasiswa untuk tumbuh, berpikir inovatif, dan berkontribusi positif sesuai dengan perkembangan zaman demi kemajuan masyarakat.
#Satukancitaciptakankarya

{" "}
          </div>

          <div className="justify-items-center text-md md:text-lg lg:text-2xl text-center lg:text-left font-bold mt-8 ">
            Visi Patra Abhyakta
          </div>
          <div className="flex justify-center lg:justify-start font-extralight text-pretty text-xs md:text-sm text-center lg:text-left mt-2">
            “Menjadikan Himpunan Mahasiswa Teknik Perpipaan sebagai wadah pengembangan 
potensi mahasiswa yang berintegritas, komunikatif, dan inovatif”{" "}
          </div>

          <div className="justify-items-center text-md md:text-lg lg:text-2xl text-center lg:text-left font-bold mt-8">
            Misi Patra Abhyakta
          </div>
          <ol className="list-decimal list-inside flex flex-col justify-center lg:justify-start font-extralight text-pretty text-xs md:text-sm text-center lg:text-left mt-2 gap-1">
            <li>Menyelaraskan aspek profesionalitas dan aspek kekeluargaan antar KMTP</li>
            <li>Memonitoring dan mewadahi para mahasiswa yang tertarik sesuai dengan bidangnya</li>
            <li>Mengoptimalkan forum fungsionaris Himpunan Teknik Perpipaan</li>
            <li>Membangun lingkungan himpunan sebagai tempat pengembangan karakter, inovatif, dan komunikatif</li>
          </ol>
        </div>
      </div>

      <div className="flex flex-col justify-center max-w-[75%] mx-auto gap-18 lg:gap-32 mt-12 lg:mt-24">
        <div className="">
            <DepartementSection/>
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
}
export default AboutUs;
