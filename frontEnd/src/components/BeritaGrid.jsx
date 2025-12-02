import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

{/* BeritaGrid digunakan pada News Page */}
const BeritaGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/news`)
    .then((res) => res.json())
    .then((res) => {
      const formatted = res.data.map((item) => ({
        id: item.id,
        judul: item.title,
        paragraf: item.content,
        gambar: `https://api.hmtppns.my.id/storage/${item.image}`,
        tanggal: item.published_at,
        like: 0,      // Placeholder
        comment: 0,   // Placeholder
      }));
      setNewsData(formatted);
    })
    .catch((err) => console.error("Failed to fetch news:", err));
}, []);

  const itemsPerPage = 12;
  const paginatedData = newsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  return (
    <div className="flex flex-col mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-24 ">
      {paginatedData.map((news, index) => (
        <div
          key={index}
          className="flex flex-col max-w-2xs bg-linear-120 from-neutral-500 to-neutral-600 text-white rounded shadow-md overflow-hidden"
        >
          <img
            src={news.gambar}
            alt={news.judul}
            className="w-full h-60 object-center object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h3 className="font-bold text-sm md:text-base">{news.judul}</h3>
            <p className="text-xs text-gray-300">{news.tanggal}</p>
            <p className="text-xs text-gray-200 line-clamp-3">
              {news.paragraf}
            </p>

            <div className="flex flex-col justify-self-end">
              <div className="flex items-center justify-start text-xs">
                <Link
                  to={`/news/${news.id}`}
                  className="bg-gray-100 text-gray-800 px-1 md:px-2 lg:px-3 py-1 text-center text-xs rounded hover:bg-[#F66951] hover:text-white transition-ease-in-out duration-300"
                  target="_blank"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      
    </div>
    {/* Pagination */}
      <div className="flex justify-center md:justify-end items-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded border text-sm cursor-pointer ${
              currentPage === i + 1
                ? "bg-[#F66951] text-white"
                : "text-white border-gray-500"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="bg-[#F66951] rounded-full cursor-pointer"
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          <ChevronRight className="w-5 h-5 text-black" />{" "}
        </button>
      </div>
    </div>
  );
};

export default BeritaGrid;
