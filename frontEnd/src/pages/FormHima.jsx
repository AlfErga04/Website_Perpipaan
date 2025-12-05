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
        <form className="max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 my-16 gap-y-8 gap-x-16 lg:gap-x-24 xl:gap-x-40">
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
          <div className="flex flex-row mx-auto gap-4">
            <div className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-fit px-4 py-3.5 shadow-xs placeholder:text-body rounded-lg">Kirim Pendaftaran</div>
            <div className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-fit px-4 py-3.5 shadow-xs placeholder:text-body rounded-lg">Batal</div>
          </div>
        </form>

        <Footer />
      </div>
    </>
  );
}

export default FormHima;
