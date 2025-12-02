import HI from "/logo/HI.webp";
import RISKEL from "/logo/RISKEL.webp";
import HE from "/logo/HE.webp";
import KWU from "/logo/KWU.webp";
import BSO from "/logo/BSO.webp";
import PSDM from "/logo/PSDM.webp";
import HT from "/logo/HT.webp";
import SOSMA from "/logo/SOSMA.webp";
import MEDINFO from "/logo/MEDINFO.webp";
import React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const departemenList = [
  {
    id: "hi",
    label: "Departemen HI",
    title: "Departemen Hubungan Internal",
    logo: HI,
    paragraf:
      "Departemen Hubungan Internal merupakan bagian dari Himpunan Mahasiswa Teknik Perpipaan yang berperan dalam menjaga harmoni serta meningkatkan kesejahteraan mahasiswa di lingkungan internal himpunan. Dengan semangat pembaruan dan tekad untuk memperbaiki segala kekurangan, kami hadir membawa harapan dan cita-cita baru demi menciptakan himpunan yang lebih solid, peduli, dan progresif. Kami percaya bahwa melalui komitmen, proses yang dijalani dengan sepenuh hati, serta keyakinan akan masa depan yang lebih baik, Departemen ini dapat menjadi penggerak perubahan yang memberi manfaat nyata bagi seluruh elemen di sekitarnya.",
    proker: [
      {
        title: "Rapat Kerja",
        agenda: "Welcome Party",
      },
      {
        title: "CPEAA",
        agenda: "KPU Pusat",
      },
      {
        title: "Wisuda",
        agenda: "FKKMTP",
      },
      {
        title: "Piping Talk",
        agenda: "Info Kemahasiswaan",
      },
      {
        title: "LPJ",
      },
      {
        title: "Mubes AD/ART",
      },
    ],
  },

  {
    id: "riskel",
    label: "Departemen RISKEL",
    title: "Departemen Riset dan Keilmuan",
    logo: RISKEL,
    paragraf:
      "Departemen Riset dan Keilmuan merupakan pilar intelektual dalam Himpunan Mahasiswa Teknik Perpipaan PPNS yang berperan strategis dalam menumbuhkan budaya akademik, analitis, dan inovatif di kalangan mahasiswa. Melalui berbagai program yang terfokus pada pengembangan ilmu pengetahuan dan penelitian, departemen ini hadir sebagai fasilitator sekaligus wadah bagi mahasiswa untuk menyalurkan gagasan kreatif yang aplikatif dan berdampak. Kami berkomitmen menciptakan lingkungan akademik yang kompeten, dinamis, dan kolaboratif sebagai fondasi menuju kemajuan keilmuan yang berkelanjutan. Kami juga menyadari bahwa perjalanan menuju visi tersebut tidak lepas dari tantangan dan keterbatasan. Oleh karena itu, kami senantiasa terbuka terhadap masukan dan kritik yang membangun, demi perbaikan berkelanjutan dalam mewujudkan peran kami sebagai agen penggerak intelektualitas di lingkungan Teknik Perpipaan PPNS.",    
      proker: [
      {
        title: "PKM",
        agenda: "Piping Knowledge",
      },
      {
        title: "Kuliah Tamu",
        agenda: "Piping Storage",
      },
      {
        title: "Piping Road to OJT",
        agenda: "Bank TA",
      },
      {
        title: "Software Training",
        agenda: "Multi Level Mentoring",
      },
      {
        agenda: "Piping Research",
      },
      {
        agenda: "Piping TA Reference",
      },
    ],
  },

  {
    id: "he",
    label: "Departemen HE",
    title: "Departemen Hubungan Eksternal",
    logo: HE,
    paragraf:
      "Departemen Hubungan Eksternal merupakan ujung tombak komunikasi dan kerja sama eksternal dalam Himpunan Mahasiswa Teknik Perpipaan (HMTP). Departemen ini menjalankan fungsi strategis sebagai penghubung antara HMTP dengan himpunan mahasiswa lain, baik di dalam maupun di luar PPNS, serta dengan mitra eksternal seperti perusahaan atau institusi industri. Di periode kepengurusan ini, fokus utama kami tertuju pada penguatan tata kelola hubungan eksternal melalui berbagai inisiatif seperti kunjungan institusional dan kegiatan kolaboratif lintas organisasi. Kami percaya bahwa keberhasilan suatu himpunan tidak hanya ditentukan oleh kekuatan internalnya, tetapi juga oleh kualitas relasi yang dibangun dengan pihak luar. Oleh karena itu, kami terus berupaya melakukan pembenahan dan peningkatan kapasitas agar Departemen Hubungan Eksternal menjadi pelopor dalam menciptakan jaringan kemitraan yang profesional, berkelanjutan, dan bermakna.",    
      proker: [
      {
        title: "SE",
        agenda: "Sambang Alumni",
      },
      {
        title: "Pipa Bertamu",
        agenda: "Piping Industrial Information",
      },
      {
        title: "Database Alumni",
      },
    ],
  },

  {
    id: "kwu",
    label: "Departemen KWU",
    title: "Departemen Kewirausahaan",
    logo: KWU,
    paragraf:
      "Departemen Kewirausahaan merupakan elemen penting dalam Himpunan Mahasiswa Teknik Perpipaan yang berfokus pada pengembangan jiwa entrepreneur serta pengelolaan pendanaan organisasi. Departemen ini hadir untuk menumbuhkan minat kewirausahaan, membentuk unit usaha yang produktif, serta meningkatkan soft skill Keluarga Mahasiswa Teknik Perpipaan melalui berbagai program inovatif dan berorientasi bisnis. Di periode kepengurusan ini, fokus utama kami adalah memperkuat fondasi kewirausahaan dan kemandirian finansial sebagai langkah strategis dalam mewujudkan visi dan misi himpunan. Dengan semangat regenerasi dan transformasi, Departemen Kewirausahaan berkomitmen untuk menjadi pelopor dalam membangun budaya entrepreneurship yang berkelanjutan, profesional, dan berdampak nyata bagi seluruh anggota.",    
      proker: [
      {
        title: "Piping Guide Book",
        agenda: "Pengenalan Usaha",
      },
      {
        title: "Piping Merchandise",
      },
      {
        title: "Kemeja Himpunan",
      },
      {
        title: "Jaket Himpunan",
      },
    ],
  },

  {
    id: "bso",
    label: "Departemen BSO",
    title: "Departemen Badan Semi Otonom",
    logo: BSO,
    paragraf:
      "Badan Semi Otonom merupakan unit khusus dalam Himpunan Mahasiswa Teknik Perpipaan yang bertanggung jawab penuh atas perencanaan, pelaksanaan, dan koordinasi rangkaian acara Dies Natalis Program Studi Teknik Perpipaan. Berada langsung di bawah naungan Ketua Himpunan, badan ini memegang peran strategis dalam menghadirkan perayaan yang tidak hanya meriah, tetapi juga bermakna—melalui penyelenggaraan berbagai kompetisi, penguatan branding, hingga malam puncak yang melibatkan seluruh Keluarga Mahasiswa Teknik Perpipaan PPNS. Di periode ini, Badan Semi Otonom memfokuskan diri pada tata kelola acara yang lebih terstruktur dan inovatif, serta peningkatan kualitas identitas dan citra program studi di mata publik. Dengan semangat regenerasi dan kolaborasi, kami berkomitmen untuk menjadikan Badan Semi Otonom sebagai pelopor dalam membangun tradisi yang membanggakan serta mempererat ikatan antarmahasiswa dalam satu keluarga besar Teknik Perpipaan.",    
      proker: [
      {
        title: "Piping Competition",
      },
      {
        title: "NECPE/PEPC",
      },
      {
        title: "Malam Puncak",
      },
    ],
  },

  {
    id: "psdm",
    label: "Departemen PSDM",
    title: "Departemen Pengembangan Sumberdaya Manusia",
    logo: PSDM,
    paragraf:
      "Departemen Pengembangan Sumber Daya Manusia (PSDM) merupakan elemen strategis dalam struktur Himpunan Mahasiswa Teknik Perpipaan (HMTP) yang berfokus pada peningkatan kualitas karakter, etika, dan soft skill mahasiswa. Mengemban peran sebagai fasilitator, katalisator, serta penjaga nilai dan budaya himpunan, Departemen PSDM hadir untuk membangun kaderisasi yang berkelanjutan, memperkuat hubungan antar individu dan departemen, serta menciptakan iklim organisasi yang sehat, solid, dan produktif. Melalui berbagai program kerja, PSDM berkomitmen untuk menciptakan generasi penerus yang lebih baik, disiplin, dan berbudaya. Di kepengurusan ini, kami menaruh perhatian besar pada kolaborasi lintas departemen, baik internal maupun eksternal, sebagai wujud komitmen untuk terus berkembang dan membawa HMTP menjadi organisasi yang adaptif, profesional, dan bermartabat.",    
      proker: [
      {
        title: "Internship Staff Training",
        agenda: "Road to LKMM Pra-TD",
      },
      {
        title: "Get Interview",
        agenda: "Rekrutmen Staff Magang",
      },
      {
        title: "Road To IP3NS",
        agenda: "Rekrutmen Staff Muda",
      },
      {
        title: "Orientasi Keorganisasian",
        agenda: "",
      },
      {
        title: "Pengembangan Etika",
        agenda: "",
      },
      {
        title: "Upgrading",
        agenda: "",
      },
      {
        title: "Internship Staff Challenge",
        agenda: "",
      },
    ],
  },

  {
    id: "ht",
    label: "Departemen HT",
    title: "Departemen Hobi dan Talenta",
    logo: HT,
    paragraf:
      "Departemen Hobi dan Talenta merupakan bagian penting dalam struktur Himpunan Mahasiswa Teknik Perpipaan yang berperan sebagai wadah pengembangan minat, bakat, dan potensi non-akademik mahasiswa. Departemen ini berfokus pada pengelolaan kegiatan di bidang keolahragaan dan seni, serta memfasilitasi berbagai kompetisi dan pelatihan guna mempererat solidaritas Keluarga Mahasiswa Teknik Perpipaan. Di periode kepengurusan ini, Departemen Hobi dan Talenta turut mendukung pembinaan serta pendanaan bagi mahasiswa yang berpartisipasi dalam ajang perlombaan, sebagai upaya mendorong kualitas dan daya saing dalam bidang olahraga dan talenta. Kami meyakini bahwa pembinaan berkelanjutan dan regenerasi yang kuat adalah kunci untuk membentuk departemen yang aktif, produktif, serta mampu mencetak individu unggul yang tidak hanya berprestasi, tetapi juga mencerminkan semangat kolaboratif dalam berorganisasi.",    
      proker: [
      {
        title: "Piping Support",
        agenda: "Latihan Rutin",
      },
      {
        title: "Latihan Intensif",
        agenda: "Piping Zone and Competition Information",
      },
      {
        title: "Piping Sport Competition (PISCO)",
      },
    ],
  },

  {
    id: "sosma",
    label: "Departemen SOSMA",
    title: "Departemen Sosial Masyarakat",
    logo: SOSMA,
    paragraf:
      "Departemen Sosial Masyarakat merupakan salah satu pilar dalam Himpunan Mahasiswa Teknik Perpipaan yang berperan dalam menumbuhkan kepedulian sosial serta memperkuat hubungan antara mahasiswa dan masyarakat. Melalui berbagai program yang berorientasi pada pengabdian dan aksi nyata, departemen ini berupaya menciptakan dampak positif yang berkelanjutan bagi lingkungan sekitar. Di periode kepengurusan ini, Departemen Sosial Masyarakat akan memfokuskan diri pada penguatan peran sosial himpunan, pengelolaan program berbasis masyarakat, serta tata kelola distribusi dana sosial yang lebih transparan dan tepat sasaran. Kami meyakini bahwa kebermanfaatan sebuah himpunan tidak hanya tercermin dari prestasi internal, tetapi juga dari kontribusi nyatanya terhadap masyarakat. Dengan semangat regenerasi dan komitmen perbaikan, kami terus bergerak menuju organisasi yang lebih peduli, tangguh, dan berdampak.",    
      proker: [
      {
        title: "Pengabdian Masyarakat",
        agenda: "Amal Jumat",
      },
      {
        title: "Bakti Sosial",
        agenda: "Aksi Solidaritas",
      },
      {
        title: "Pipa Berbagi",
      },
      {
        title: "Pipa Mengajar",
      },
    ],
  },

  {
    id: "medinfo",
    label: "Departemen MEDINFO",
    title: "Departemen Media dan Informasi",
    logo: MEDINFO,
    paragraf:
      "Departemen Media Informasi merupakan garda terdepan dalam pengelolaan komunikasi dan penyebaran informasi di lingkungan Himpunan Mahasiswa Teknik Perpipaan. Di tengah arus digital yang terus berkembang, departemen ini memegang peran strategis dalam memastikan seluruh kegiatan, program kerja, dan agenda organisasi tersampaikan secara cepat, akurat, dan efektif kepada publik melalui berbagai kanal media sosial. Lebih dari sekadar pusat informasi, Departemen Media Informasi juga menjadi ruang pengembangan kreativitas mahasiswa dalam bidang desain grafis, penulisan, fotografi, dan manajemen konten digital. Melalui sinergi tim yang solid serta pemanfaatan teknologi komunikasi yang optimal, departemen ini berkomitmen untuk membangun citra positif organisasi dan memperkuat visibilitas HMTP sebagai himpunan yang dinamis, adaptif, dan inspiratif.",    
      proker: [
      {
        title: "Sekolah Desain",
        agenda: "Video Profil",
      },
      {
        title: "Piping Podcast",
        agenda: "Piping Advance",
      },
      {
        title: "Piping Digivance",
      },
    ],
  },
];

function DepartementSection() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="px-4 py-2 rounded-xl bg-[#F66951]">
        <div className="grid grid-rows-2 md:grid-cols-2 lg:grid-cols-5 gap-2 text-white text-sm text-left font-medium">
          {departemenList.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelected(selected === dept.id ? null : dept.id)}
              className={`w-full px-4 py-2 rounded-2xl text-white transition ${
                selected === dept.id
                  ? "border border-black-p-2 bg-[#f1593f] transition-ease-in-out duration-300"
                  : "hover:bg-[#f08876] transition-ease-in-out duration-300 cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <span className="flex-grow">{dept.label}</span> <ChevronDown />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Konten Departemen Terpilih */}
      <div className="w-full p-6">
        {departemenList.map((dept, index) =>
          selected === dept.id ? (
            <div
              className={`flex flex-col md:flex-row ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              } gap-4 items-start transition-all duration-500 ease-in-out opacity-0 animate-[fadeIn_0.5s_forwards]`}
            >
              {/* Logo */}
              <div className="w-full md:w-auto flex justify-center">
                <img
                  src={dept.logo}
                  alt={dept.label}
                  className="w-36 lg:w-48"
                />
              </div>

              {/* Judul */}
              <div className="flex-1 mx-8">
                <h2
                  className={`text-xl font-bold text-center md:text-left ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  {dept.title}
                </h2>

                <div
                  className={`flex flex-col lg:flex-row text-center md:text-left gap-6 ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  {/* Paragraf */}
                  <div className="mt-4">
                    <p className="mt-2 font-light">{dept.paragraf}</p>
                  </div>
                </div>

                <div className="mt-8 ">
                  <h3
                    className={`text-center md:text-left ${
                      index % 2 === 1 ? "text-center md:text-right" : ""
                    } font-semibold mb-4`}
                  >
                    Agenda Program Kerja {dept.label}
                  </h3>

                  {/* Proker */}
                  <div
                    className={`w-full flex flex-col md:flex-row gap-4  ${
                      index % 2 === 1 ? "md:justify-self-end" : ""
                    }`}
                  >
                    {index % 2 === 0 ? (
                      <div className="w-full flex flex-col md:flex-row gap-4">
                        {dept.proker.some((p) => p.title) && (
                          <div className="flex-1">
                            <h4 className="font-bold text-xl text-white text-center">
                              Program Kerja :
                            </h4>
                            <hr className="border-b-2 border-[#F66951] my-2" />
                            <div className="flex flex-col gap-2">
                              {dept.proker.map(
                                (proker, i) =>
                                  proker.title && (
                                    <span
                                      key={`title-${i}`}
                                      className="px-4 py-2 bg-[#F66951] rounded-lg font-medium text-white text-sm lg:text-base text-center"
                                    >
                                      {proker.title}
                                    </span>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                        {dept.proker.some((p) => p.agenda) && (
                          <div className="flex-1">
                            <h4 className="font-bold text-xl text-white text-center">
                              Agenda :
                            </h4>
                            <hr className="border-b-2 border-[#F66951] my-2" />
                            <div className="flex flex-col gap-2">
                              {dept.proker.map(
                                (proker, i) =>
                                  proker.agenda && (
                                    <span
                                      key={`agenda-${i}`}
                                      className="px-4 py-2 bg-[#F66951] rounded-full font-medium text-white text-sm lg:text-base text-center"
                                    >
                                      {proker.agenda}
                                    </span>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full flex flex-col md:flex-row gap-4">
                        {dept.proker.some((p) => p.agenda) && (
                          <div className="flex-1">
                            <h4 className="font-bold text-xl text-white text-center">
                             Agenda :
                            </h4>
                            <hr className="border-b-2 border-[#F66951] my-2" />
                            <div className="flex flex-col gap-2">
                              {dept.proker.map(
                                (proker, i) =>
                                  proker.agenda && (
                                    <span
                                      key={`agenda-${i}`}
                                      className="px-4 py-2 bg-[#F66951] rounded-full font-medium text-white text-sm lg:text-base text-center"
                                    >
                                      {proker.agenda}
                                    </span>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                        {dept.proker.some((p) => p.title) && (
                          <div className="flex-1">
                            <h4 className="font-bold text-xl text-white text-center">
                              Program Kerja :
                            </h4>
                            <hr className="border-b-2 border-[#F66951] my-2" />
                            <div className="flex flex-col gap-2">
                              {dept.proker.map(
                                (proker, i) =>
                                  proker.title && (
                                    <span
                                      key={`title-${i}`}
                                      className="px-4 py-2 bg-[#F66951] rounded-lg font-medium text-white text-sm lg:text-base text-center"
                                    >
                                      {proker.title}
                                    </span>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default DepartementSection;
