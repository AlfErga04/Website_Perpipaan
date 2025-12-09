import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Perpipaan() {
  return (
    <div className="bg-neutral-900 text-white min-w-screen">
      <div className="top-0">
        <NavBar />
      </div>

      {/* Hero Section */}
      <div
        className="w-screen min-h-44 md:min-h-64 lg:min-h-84 bg-cover bg-center flex flex-col items-center justify-center opacity-0 animate-[fadeIn_0.5s_forwards]"
        style={{
          backgroundImage: "url('/perpipaan/hero.webp')",
        }}
      >
        <div className="text-sm sm:text-lg md:text-xl lg:text-2xl">
          Tentang Teknik Perpipaan
        </div>
        <div className="font-bold text-md sm:text-xl md:text-2xl lg:text-3xl mt-4">
          Program Studi Teknik Perpipaan
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center max-w-[75%] mx-auto mt-24 md:mt-48 opacity-0 animate-[fadeIn_0.5s_forwards]">
        {/* Tentang Perpipaan */}
        <div className="w-full md:w-auto flex llg:pl-24 justify-center">
          <img
            src="./perpipaan/perpipaan.webp"
            alt="Perpipaan"
            className="w-auto max-h-100 items-center shadow-[-22px_-28px_0px_rgba(165,161,161,1)] md:shadow-[-52px_-58px_0px_rgba(165,161,161,1)]"
          />
        </div>
        <div className="flex flex-col mx-8 mt-2">
          <h2 className="font-bold text-lg md:text-lg text-center max-w-lg lg:text-left">
            Mengenal Program Studi D4 Teknik Perpipaan PPNS:
            Mencetak Ahli Perpipaan Berkualitas
          </h2>
          <p className="font-light text-xs text-center lg:text-left mt-4 max-w-lg">
            ​Program Studi D4 Teknik Perpipaan di Politeknik Perkapalan Negeri
            Surabaya (PPNS) didirikan untuk memenuhi kebutuhan industri akan
            tenaga profesional yang kompeten dalam bidang rekayasa perpipaan,
            khususnya dalam aplikasi maritim dan industri. Program ini bertujuan
            untuk menghasilkan lulusan yang mampu beradaptasi dengan
            perkembangan teknologi perpipaan secara global.
          </p>
          
          {/* Visi */}
          <h4 className="font-bold text-base text-center lg:text-left mt-10 lg:mt-4 max-w-lg">
            Visi Program Studi
          </h4>
          <p className="font-light text-xs text-center md:text-left mt-2 max-w-lg">
            Menjadi institusi pendidikan profesional dalam bidang rekayasa
            perpipaan serta aplikasinya di sektor maritim dan industri, dengan
            daya saing tinggi dan kemampuan beradaptasi terhadap perkembangan
            teknologi perpipaan secara global.
          </p>
          
          {/* Misi */}
          <h4 className="font-bold text-base text-center lg:text-left mt-10 lg:mt-4 max-w-lg">
            Misi Program Studi
          </h4>
          <ul className="font-light text-xs text-left list-disc mt-2 max-w-lg lg:ml-6">
            <li>
              Menyelenggarakan pendidikan vokasi dan penelitian terapan di
              bidang teknologi perpipaan, maritim, industri, serta teknologi
              penunjangnya.
            </li>
            <li>
              Berperan aktif dalam kegiatan kemasyarakatan untuk mengembangkan
              teknologi perpipaan dalam aplikasi maritim dan industri.
            </li>
            <li>
              Membangun komunitas akademik di bidang perpipaan yang mampu
              bersaing secara global.
            </li>
          </ul>
          
          {/* Tujuan */}
          <h4 className="font-bold text-base text-center lg:text-left mt-10 lg:mt-4 max-w-lg">
            Tujuan Program Studi
          </h4>
          <ul className="font-light text-xs text-left list-disc mt-2 max-w-lg lg:ml-6">
            <li>
              Mengembangkan kemampuan mahasiswa dalam fabrikasi sistem perpipaan
              untuk aplikasi maritim dan industri
            </li>
            <li>
              Meningkatkan kompetensi mahasiswa dalam merancang sistem perpipaan
              menggunakan perangkat lunak khusus seperti AutoCAD 2D dan 3D,
              Bentley AutoPIPE, AutoPLANT, dan lainnya.
            </li>
            <li>
              Meningkatkan daya saing mahasiswa di dunia kerja dan menumbuhkan
              jiwa kewirausahaan.
            </li>
            <li>
              Mendorong penelitian dan kajian di bidang rekayasa perpipaan serta
              aplikasinya.
            </li>
            <li>
              Mengembangkan kemampuan dalam melaksanakan pengabdian kepada
              masyarakat, khususnya di industri sistem perpipaan maritim dan
              lainnya.
            </li>
          </ul>
        </div>
      </div>
    
      {/* Video */}
      <div className="flex flex-col justify-center max-w-[75%] mx-auto mt-18 md:mt-24">
        <h2 className="font-bold text-lg md:text-2xl text-center uppercase">
          Bagaimana kami mempersiapkan insinyur perpipaan di masa depan
        </h2>
        <p className="font-light text-sm text-center mt-4">
          Pelajari bagaimana Teknik Perpipaan PPNS membekali mahasiswa dengan
          pengalaman praktis, keterampilan <br /> industri, dan aplikasi nyata
          untuk menjadi insinyur perpipaan masa depan.
        </p>
        <div className="flex justify-center mt-4">
          <iframe
            width="700"
            height="394"
            src="https://www.youtube.com/embed/XtqrGwrm_y8?si=_7_QayUCJoaEz9Jz"
            title="VIDEO PROFIL TEKNIK PERPIPAAN PPNS"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
      
      {/* Link Website */}
      <div className="flex flex-col justify-center mx-8 mt-24 mb-24">
        <h2 className="font-bold text-lg md:text-2xl text-center ">
          Kunjungi Website Resmi PPNS di link Berikut
        </h2>
        <a
          href="https://ppns.ac.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-4xl bg-neutral-400 hover:bg-[#F66951] transition ease-in-out duration-300 mx-auto cursor-pointer text-white text-center block w-fit mt-4"
        >
          Lihat Web
        </a>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Perpipaan;
