import { useState, useEffect } from "react";
import { Search, ChevronRight } from "lucide-react";
import axios from "axios";

const AlumniTable = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAngkatan, setSelectedAngkatan] = useState("");
  const [searchNRP, setSearchNRP] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  // ================================
  // FETCH DATA DARI BACKEND
  // ================================
useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/alumni`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((res) => {
      const mapped = res.data.data.map((a) => ({
        nrp: a.nim,
        nama: a.name,
        tahunMasuk: a.tahun_masuk,
        tahunLulus: a.tahun_lulus,
        jobSector: a.job_sector,
        company: a.company_name,
      }));

      setAlumni(mapped);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Gagal fetch data alumni:", err);
      setLoading(false);
    });
}, []);


  if (loading) return <p className="text-white">Memuat data...</p>;

  // ================================
  // FILTER DATA (ANGKATAN & NRP)
  // ================================
  const filteredData = alumni
    .filter((a) =>
      selectedAngkatan ? a.tahunMasuk == selectedAngkatan : true
    )
    .filter((a) => (searchNRP ? a.nrp.includes(searchNRP) : true));

  // ================================
  // PAGINATION
  // ================================
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // ================================
  // CHECKBOX HANDLING
  // ================================
  const handleCheckboxChange = (nrp) => {
    const updated = new Set(selectedRows);
    updated.has(nrp) ? updated.delete(nrp) : updated.add(nrp);
    setSelectedRows(updated);
  };

  return (
    <div className="justify-between">
      {/* FILTER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        
        {/* Cari Angkatan */}
        <select
          className="p-2 rounded-lg bg-white text-black w-auto md:w-52"
          value={selectedAngkatan}
          onChange={(e) => {
            setCurrentPage(1);
            setSelectedAngkatan(e.target.value);
          }}
        >
          <option value="">Angkatan</option>
          {[2018, 2019, 2020, 2021, 2022, 2023].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Cari NRP */}
        <div className="flex justify-between border rounded-full bg-white px-6 py-2 w-full md:w-80">
          <input
            type="text"
            placeholder="Cari berdasarkan NRP"
            className="bg-transparent outline-none text-black"
            value={searchNRP}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchNRP(e.target.value);
            }}
          />
          <Search className="text-black" />
        </div>
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto mt-4 lg:mt-8 rounded-t-md md:rounded-t-lg">
        <table className="w-full">
          <thead className="bg-[#F66951] text-white text-xs md:text-base lg:text-lg">
            <tr>
              <th className="px-4 py-2">✓</th>
              <th className="px-4 py-2">NRP</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Tahun masuk</th>
              <th className="px-4 py-2">Tahun lulus</th>
              <th className="px-4 py-2">PT Bekerja</th> {/* ⬅️ Kolom Baru */}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-600 text-center text-xs sm:text-sm md:text-base lg:text-lg">
            {paginatedData.map((alumni, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="accent-[#F66951]"
                    checked={selectedRows.has(alumni.nrp)}
                    onChange={() => handleCheckboxChange(alumni.nrp)}
                  />
                </td>

                <td className="px-4 py-2">{alumni.nrp}</td>
                <td className="px-4 py-2">{alumni.nama}</td>
                <td className="px-4 py-2">{alumni.tahunMasuk}</td>
                <td className="px-4 py-2">{alumni.tahunLulus}</td>
                <td className="px-4 py-2">{alumni.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
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
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
};

export default AlumniTable;
