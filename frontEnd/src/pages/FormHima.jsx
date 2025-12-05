import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { formFields } from "../data/FormData.jsx";
import { useState } from "react";

function FormHima() {
  const [fileNames, setFileNames] = useState({});

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setFileNames((prev) => ({ ...prev, [id]: file.name }));
    }
  };

  return (
    <>
      <div className="bg-neutral-900 text-white min-w-screen">
        <NavBar />

        {/* Hero Section */}
        <div
          className="w-screen bg-black gap-y-4 min-h-44 md:min-h-64 lg:min-h-84 bg-cover bg-center flex flex-col items-center justify-center opacity-0 animate-[fadeIn_0.5s_forwards]"
        >
          <div className="absolute inset-0 bg-[url('/form/form_filling.webp')] bg-cover bg-center opacity-20"></div>
          <div className="text-sm text-white sm:text-lg md:text-xl lg:text-2xl border-[#F66951]">
            Form Pendaftaran Himpunan Mahasiswa
          </div>
          <div className="w-24 h-[0.5px] bg-[#F66951]"></div>
        </div>

        {/* Form Section */}
        <form className="max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-[80rem] mx-auto grid grid-cols-1 md:grid-cols-2 my-16 gap-y-8 gap-x-16 lg:gap-x-24 xl:gap-x-40">
          {formFields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block mb-2.5 text-sm font-medium text-heading">
                {field.label} <span className="text-[#F66951]">*</span>
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required
                  rows={field.rows || 1}
                  className={`bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-4 py-3.5 shadow-xs placeholder:text-body rounded-lg ${
                    field.rows && field.rows > 1 ? "h-[10rem]" : ""
                  }`}
                />
              ) : field.type === "file" ? (
                <div
                  onClick={() => document.getElementById(field.id).click()}
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-lg rounded-base flex items-center justify-center cursor-pointer h-[10rem] shadow-xs"
                >
                  {fileNames[field.id] ? (
  fileNames[field.id]
) : (
  <>
    Klik atau drag file CV <br />  Format png, jpg, pdf 
  </>
)}
                  <input
                    type="file"
                    id={field.id}
                    required
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field.id)}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </form>
        <div className="flex flex-row mx-auto gap-4 lg:gap-12 justify-center items-center my-16 text-center">
  {/* Kirim Pendaftaran */}
  <button
    className="cursor-pointer border text-heading text-base rounded-base block w-fit lg:w-[20rem] px-4 py-3.5 shadow-xs rounded-lg
    hover:bg-[#F66951] hover:text-white hover:shadow-sm
    transition-all duration-200 ease-in-out hover:border-[#F66951]"
  >
    Kirim Pendaftaran
  </button>

  {/* Batal */}
  <button
    className="cursor-pointer  border border-default-medium text-base rounded-base block w-fit lg:w-[20rem] text-heading px-4 py-3.5 shadow-xs rounded-lg
    hover:bg-white hover:border-[#F66951] hover:text-[#F66951] hover:shadow-sm
    transition-all duration-200 ease-in-out"
  >
    Batal
  </button>
</div>


{/* Bottom Section */}
          <div className="w-fit mx-auto h-fit my-8">
            <div className="mx-auto text-center border border-[#F66951] border-b-0 border-r-0 border-l-0 p-8">Pastikan semua data yang sudah anda masukkan sudah benar sebelum mengirim pendaftaran.</div>
          </div>
          
        
        <Footer />
      </div>
    </>
  );
}

export default FormHima;
