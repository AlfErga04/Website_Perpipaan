import BeritaGrid from "../components/BeritaGrid";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function News() {
  return (
    <div className="bg-neutral-900 text-white min-w-screen">
      <div className="top-0">
        <NavBar />
      </div>

      {/* Hero Section */}
      <div
        className="w-screen min-h-44 md:min-h-64 lg:min-h-84 bg-cover bg-center flex flex-col items-center justify-center opacity-0 animate-[fadeIn_0.5s_forwards]"
        style={{
          backgroundImage: "url('/news/hero.webp')",
        }}
      >
        <div className="text-sm sm:text-lg md:text-xl lg:text-2xl">
          Berita Perpipaan
        </div>
        <div className="font-bold text-md sm:text-xl md:text-2xl lg:text-3xl mt-4">
          Berita Terbaru Teknik Perpipaan
        </div>
      </div>

      <div className="flex flex-col justify-center max-w-[75%] mx-auto mt-4 md:mt-12 mb-14 opacity-0 animate-[fadeIn_0.5s_forwards]">
        <BeritaGrid />
      </div>

      <div>
        <Footer />
      </div>

    </div>
  );
}
export default News;
