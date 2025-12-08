import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import BeritaCard from "../components/BeritaCard";


function Home() {
  const [newsData, setNewsData] = useState([]);
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/news`)
    .then((res) => res.json())
    .then((result) => {
      const mapped = result.data.map((item) => ({
        id: item.id,
        gambar: item.image_url,
        judul: item.title,
        paragraf: item.content,
      }));

      setNewsData(mapped);
    })
    .catch((err) => console.error("Fetch news error:", err));
}, []);
  

  return (
    <div className="bg-neutral-900 text-white min-w-screen">
      <div className="top-0">
        <NavBar />
      </div>

      {/* Hero Section */}
      <div
        className="w-auto min-h-screen bg-cover bg-center flex flex-col items-center justify-center opacity-0 animate-[fadeIn_0.5s_forwards]"
        style={{
          backgroundImage: "url('/Hero.webp')", // Hero Pict
        }}
      >
        {/* Kabinet */}
        <div className="flex flex-row items-center mt-64">
          <img src="/logo/Kabinet.webp" alt="Logo" className="w-16 mb-3 mr-5" />
          <h1 className="text-3xl md:text-4xl font-semibold">Patra Abhyakta</h1>
        </div>

        {/* Motto */}
        <div className="text-center mt-6 mb-8">
          <p className="text-lg md:text-xl font-medium">
            Satukan Cita Ciptakan Karya
          </p>
        </div>

        {/* Tag Bar */}
        <div className="flex justify-center mt-10 opacity-0 animate-[fadeIn_0.5s_forwards]">
          <div className="bg-white text-black flex flex-col md:flex-row rounded-lg md:rounded-full mx-8 divide-x sm:divide-x divide-y sm:divide-y-0 divide-gray-400">
            <Link
              to={"/perpipaan"}
              className="px-6 py-3 hover:text-white hover:bg-[#F66951] hover:rounded-full transition duration-300 ease-in-out text-sm md:text-base lg:text-xl font-medium"
            >
              Tentang Prodi Teknik Perpipaan
            </Link>
            <Link
              to={"/about-us"}
              className="px-6 py-3 md:px-4 hover:text-white hover:bg-[#F66951] transition duration-300 ease-in-out text-sm md:text-base lg:text-xl font-medium"
            >
              Tentang Hima Teknik Perpipaan
            </Link>
            <Link
              to={"/news"}
              className="px-6 py-3 md:px-4 hover:text-white hover:bg-[#F66951] transition duration-300 ease-in-out text-sm md:text-base lg:text-xl font-medium"
            >
              Berita Acara Himpunan
            </Link>
            <Link
              to={"/data-alumni"}
              className="px-6 py-3 hover:text-white hover:bg-[#F66951] hover:rounded-full transition duration-300 ease-in-out text-sm md:text-base lg:text-xl font-medium"
            >
              Data Alumni
            </Link>
          </div>
        </div>
      </div>

      {/* Home Introduction */}
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-[65%] mx-auto mt-8 gap-18">
        {/* Ship and Wielding Image */}
        <div className="flex justify-start md:justify-center">
          <img
            src="/home/ship-wield.webp"
            alt=""
            className="max-w-72 lg:max-w-98 md:justify-items-center"
          />
        </div>

        {/* Tentang Prodi Teknik Perpipaan */}
        <div className="justify-end mx-auto">
          <div className="justify-items-center text-lg md:text-xl lg:text-3xl text-center lg:text-left font-bold">
            TENTANG PROGRAM STUDI <br /> TEKNIK PERPIPAAN
          </div>
          <div className="flex justify-center lg:justify-start font-extralight text-pretty text-sm md:text-base text-center lg:text-left mt-4">
            Program Studi D4 Teknik Perpipaan di PPNS berfokus pada pengembangan keahlian di bidang rekayasa perpipaan, 
            khususnya pada aplikasi industri dan maritim. Melalui visi dan misinya, program ini berkomitmen mencetak lulusan
             yang profesional, adaptif terhadap teknologi, dan siap bersaing secara global. Ketahui selengkapnya di sini
          </div>
          <div className="flex justify-center lg:justify-start mt-8">
            <div className="text-white bg-neutral-500 hover:text-white hover:bg-[#F66951] transition-ease-in-out duration-300 cursor-pointer px-12 py-4 rounded-full ">
              <Link to="/perpipaan">Read More</Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full bg-center bg-cover flex items-start lg:items-center justify-between mt-32"
        style={{ backgroundImage: "url('/home/team.webp')" }}
      >
        
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center mx-auto w-[80%] min-h-screen gap-8">
          <div className="flex flex-col flex-1">
            {/* Kabinet */}
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <img
                src="/logo/Kabinet.webp"
                alt="Logo"
                className="w-8 md:w-16 mr-5"
              />
              <h1 className="text-2xl md:text-4xl text-black font-semibold text-white">
                Patra Abhyakta
              </h1>
            </div>

            {/* Penjelasan */}
            <div className="font-light max-w-xl text-pretty text-sm md:text-base text-center lg:text-left mt-8">
              Patra Abhyakta adalah filosofi yang merepresentasikan HMTP sebagai
               wadah tumbuh bagi mahasiswa Teknik Perpipaan. Patra berarti 
               tempat, sedangkan Abhyakta menggambarkan perkembangan dan potensi. 
               Gabungan keduanya menjadi simbol komitmen HMTP untuk membangun 
               lingkungan yang nyaman, produktif, dan inovatif.
            </div>

            {/* Tombol */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                to="/about-us"
                className="text-white bg-neutral-500 hover:bg-[#F66951] transition ease-in-out duration-300 px-12 py-4 rounded-full inline-block text-center"
              >
                Read Our Story
              </Link>
            </div>
          </div>

          {/* Kahim */}
          <div className="flex-1 flex justify-center">
            <img
              src="/home/kahim.webp"
              alt="Kahim"
              className="hidden lg:block max-w-md"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[65%] mx-auto mt-10 lg:mt-32 items-center justify-between">
        <div className="w-full flex justify-center justify-items-center lg:w-1/2 text-lg md:text-xl lg:text-3xl text-center lg:text-left font-bold ">
          TETAP TERHUBUNG: BERITA & <br /> ACARA TERBARU TEKNIK <br /> PERPIPAAN
        </div>

        <div className="w-full lg:w-1/2">
          <div className="font-extralight max-w-xl text-sm md:text-base text-center lg:text-justify mt-12 lg:mt-6">
            Tetap terupdate dengan berita terbaru, acara, dan informasi penting
            dari Teknik Perpipaan. Dari seminar industri hingga workshop
            pengembangan keterampilan, kami hadir untuk memberikan wawasan
            mendalam, liputan acara, dan pembaruan eksklusif seputar kegiatan
            akademik dan organisasi.
          </div>

          <div className="font-bold text-center lg:text-left mt-8 lg:mt-4 hover:text-[#F66951] transition-ease-in-out duration-300">
            <Link to="/news">SEE MORE NEWS AND UPDATES</Link>
          </div>
        </div>
      </div>

      <div className="min-h-full mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-6 max-w-[65%] lg:max-h-[600px] mx-auto mt-24">
          {newsData.slice(0, 6).map((news, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                index === 0
                  ? "lg:row-span-3"
                  : index === 1
                  ? "lg:row-span-2"
                  : "lg:row-span-1"
              }`}
            >
              <BeritaCard
                id={news.id}
                gambar={news.gambar}
                judul={news.judul}
                paragraf={news.paragraf}
                showParagraf={index === 0 || index === 1}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
}
export default Home;
