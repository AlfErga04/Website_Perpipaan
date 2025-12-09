import { useState } from "react";
import { Search } from "lucide-react";
import { ChevronRight } from "lucide-react";
import AlumniData from "../data/AlumniData";

const AlumniTable = () => {
  const [selectedAngkatan, setSelectedAngkatan] = useState("");
  const [searchNRP, setSearchNRP] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  { /* Filter  Data Alumni dengan angkatan atau NRP */ }
  const filteredData = AlumniData
    .filter((alumni) =>
      selectedAngkatan ? alumni.tahunMasuk === selectedAngkatan : true
    )
    .filter((alumni) => (searchNRP ? alumni.nrp.includes(searchNRP) : true));

  { /* Menampilkan 1 page berdasarkan item per page */ }
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (nrp) => {
    const updated = new Set(selectedRows);
    if (updated.has(nrp)) {
      updated.delete(nrp);
    } else {
      updated.add(nrp);
    }
    setSelectedRows(updated);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="justify-between">
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
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
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
          <Search className="flex justify-end text-black" />
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto mt-4 lg:mt-8 rounded-t-md md:rounded-t-lg">
        <table className="w-full">
          <thead className="bg-[#F66951] text-white text-xs md:text-base lg:text-lg">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  className="accent-white"
                  checked={paginatedData.every((a) => selectedRows.has(a.nrp))}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newSet = new Set(selectedRows);
                    if (checked) {
                      paginatedData.forEach((a) => newSet.add(a.nrp));
                    } else {
                      paginatedData.forEach((a) => newSet.delete(a.nrp));
                    }
                    setSelectedRows(newSet);
                  }}
                />
              </th>
              <th className="px-4 py-2">NRP</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Tahun masuk</th>
              <th className="px-4 py-2">Tahun lulus</th>
              <th className="px-4 py-2">Keterangan</th>
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
                <td className="px-4 py-2">{alumni.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
export default AlumniTable;