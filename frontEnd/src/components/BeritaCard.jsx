import { Link, NavLink } from "react-router-dom";

{ /* BeritaCard digunakan pada Home Page */ }
const BeritaCard = ({ id, gambar, judul, paragraf, className, showParagraf = true }) => (
  <div
    className={`relative rounded-lg overflow-hidden group h-full ${className}`}
  >
    <img
      src={gambar}
      alt={judul}
      className="w-full h-48 sm:h-60 md:h-80 lg:h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.7)_100%)]"></div>
    <div className="absolute inset-0 flex flex-col justify-start p-2 md:p-4 lg:p-6">
      <h3 className="text-white text-lg font-bold uppercase leading-tight lg:leading-6 mb-1">
        {judul}
      </h3>
      <Link
        to={`/news/${id}`}
        className="text-white text-xs lg:text-sm underline underline-offset-2 hover:text-[#F66951] transition duration-200 cursor-pointer"
      >
        Read More &gt;
      </Link>
    </div>
    <div className="absolute bottom-0 flex flex-col justify-end p-2 md:p-4 lg:p-6">
      {showParagraf && paragraf && (
        <div className="justify-end">
          <p className="text-white text-xs lg:text-sm line-clamp-2">{paragraf}</p>
        </div>
      )}
    </div>
  </div>
);

export default BeritaCard;
