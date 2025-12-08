import { useState, useEffect } from "react";
import { Heart, MessageSquare, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const BeritaGrid = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/news`, {
    headers: { Accept: "application/json" }
  })
    .then((res) => res.json())
    .then((json) => {
      setNewsData(json.data); // karena data berita ada di json.data
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
      setLoading(false);
    });
}, []);

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;

  const paginatedData = newsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  return (
    <div className="flex flex-col mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-24">
        {paginatedData.map((news) => (
          <div
            key={news.id}
            className="flex flex-col max-w-2xs bg-linear-120 from-neutral-500 to-neutral-600 text-white rounded shadow-md overflow-hidden"
          >
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-60 object-center object-cover"
            />

            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-sm md:text-base">{news.title}</h3>
              <p className="text-xs text-gray-300">
                {news.published_at ?? "No Date"}
              </p>

              <p className="text-xs text-gray-200 line-clamp-3">
                {news.content}
              </p>

              <div className="flex flex-col justify-self-end">
                <hr className="border-neutral-300 w-full my-2" />
                <div className="flex items-center justify-between text-xs">
                  <div className="flex gap-4 items-center">
                    <span className="flex items-center gap-1 ">
                      <Heart size={18} /> 0
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={18} /> 0
                    </span>
                  </div>

                  <Link
                    to={`/news/${news.id}`}
                    className="bg-gray-100 text-gray-800 px-3 py-1 text-center text-xs rounded hover:bg-[#F66951] hover:text-white transition"
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
          <ChevronRight className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
};

export default BeritaGrid;
