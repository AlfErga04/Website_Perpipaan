import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormHima() {
  const navigate = useNavigate();

  // Field form sederhana sesuai request
  const formFields = [
    // Kolom Kiri
    { id: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap", required: true, column: "left" },
    { id: "kelas", label: "Kelas", type: "text", placeholder: "Masukkan kelas", required: true, column: "left" },
    { id: "alasan", label: "Alasan Masuk Hima", type: "textarea", placeholder: "Masukkan alasan masuk Hima", required: true, column: "left" },
    { id: "cv", label: "Upload CV", type: "file", required: true, accept: "image/*,.pdf", column: "left" },

    // Kolom Kanan
    { id: "nim", label: "NIM", type: "text", placeholder: "Masukkan NIM", required: true, column: "right" },
    { id: "angkatan", label: "Angkatan", type: "text", placeholder: "Masukkan angkatan", required: true, column: "right" },
    { id: "pengalaman", label: "Pengalaman Organisasi", type: "textarea", placeholder: "Masukkan pengalaman organisasi", required: true, column: "right" },
    { id: "ktm", label: "Upload KTM", type: "file", required: true, accept: "image/*,.pdf", column: "right" },
  ];

  // State Management
  const [fileNames, setFileNames] = useState({});
  // store actual File objects for upload
  const [files, setFiles] = useState({});
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    formFields.forEach(field => {
      if (field.type !== "file") {
        initialData[field.id] = "";
      }
    });
    return initialData;
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Auto-save ke localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem('himaFormDraft');
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        setFormData(prev => ({ ...prev, ...parsed.formData }));
        console.log(localStorage.getItem('himaFormDraft'))
        if (parsed.fileNames) {
          setFileNames(parsed.fileNames);
        }
      } catch (error) {
        console.log("Error loading saved form:", error);
      }
    }
  }, []);

  useEffect(() => {
    const saveData = {
      formData,
      fileNames,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('himaFormDraft', JSON.stringify(saveData));
  }, [formData, fileNames]);

  // Handle input change
  const handleInputChange = (e, id) => {
    const value = e.target.value;

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  // Handle file upload
  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi ukuran file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [id]: "File maksimal 5MB"
      }));
      e.target.value = "";
      return;
    }

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [id]: "Hanya format JPG, PNG, atau PDF"
      }));
      e.target.value = "";
      return;
    }

    // Jika validasi lolos — store filename for UI and File object for upload
    setFileNames(prev => ({ ...prev, [id]: file.name }));
    setFiles(prev => ({ ...prev, [id]: file }));

    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  // Validasi form
  const validateForm = () => {
    const newErrors = {};
    let hasError = false;

    formFields.forEach(field => {
      if (field.required) {
        // Validasi field teks
        if (field.type !== "file" && !formData[field.id]?.toString().trim()) {
          newErrors[field.id] = `${field.label} wajib diisi`;
          hasError = true;
        }

        // Validasi file upload
        if (field.type === "file" && !fileNames[field.id]) {
          newErrors[field.id] = `${field.label} wajib diupload`;
          hasError = true;
        }
      }
    });

    return { errors: newErrors, hasError };
  };

  // Handle form submission - UPDATED FOR LARAVEL
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    const { errors: validationErrors, hasError } = validateForm();

    if (hasError) {
      setErrors(validationErrors);

      setPopupMessage("Harap lengkapi semua field yang wajib diisi!");
      setTimeout(() => setPopupMessage(""), 3000);
      return;
    }

    setLoading(true);

    try {
      // Build FormData to include files (cv and ktm)
      const fd = new FormData();
      fd.append('nama', formData.nama || '');
      fd.append('nim', formData.nim || '');
      fd.append('kelas', formData.kelas || '');
      fd.append('angkatan', formData.angkatan || '');
      fd.append('alasan', formData.alasan || '');
      fd.append('pengalaman', formData.pengalaman || '');

      // attach files if present
      if (files.cv) fd.append('cv', files.cv, fileNames.cv || files.cv.name);
      if (files.ktm) fd.append('ktm', files.ktm, fileNames.ktm || files.ktm.name);

      // Keep previous JSON approach commented for reference
      /*
      // previous JSON submission (no file binaries):
      // fetch(`${import.meta.env.VITE_API_URL}/api/form-hima`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ... }) })
      */

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form-hima`, {
        method: 'POST',
        // DO NOT set Content-Type; browser will set multipart boundary
        body: fd,
      });

      // try to parse JSON response when available
      let result = {};
      try { result = await response.json(); } catch (e) { /* ignore non-json */ }

      if (response.ok) {
        setShowSuccessPopup(true);
        localStorage.removeItem('himaFormDraft');

        // Reset form (keep same UI reset behavior)
        setTimeout(() => {
          setFormData(() => {
            const resetData = {};
            formFields.forEach(field => {
              if (field.type !== "file") {
                resetData[field.id] = "";
              }
            });
            return resetData;
          });
          setFileNames({});
          setFiles({});
          setErrors({});
        }, 1000);
      } else {
        const errorMessage = result.message || 'Gagal mengirim pendaftaran';
        if (result.errors) {
          const backendErrors = {};
          Object.keys(result.errors).forEach(key => {
            backendErrors[key] = result.errors[key][0];
          });
          setErrors(backendErrors);
          setPopupMessage('Terdapat kesalahan dalam pengisian form');
        } else {
          setPopupMessage(errorMessage);
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      if (!popupMessage) {
        setPopupMessage('Gagal mengirim pendaftaran. Silakan coba lagi.');
      }
      setTimeout(() => setPopupMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Handle tombol batal
  const handleCancel = () => {
    const hasData = Object.keys(formData).some(key => formData[key] !== "") ||
      Object.keys(fileNames).length > 0;

    if (hasData) {
      setShowCancelConfirm(true);
    } else {
      navigate('/');
    }
  };

  // Konfirmasi batal
  const confirmCancel = () => {
    localStorage.removeItem('himaFormDraft');
    setFormData(() => {
      const resetData = {};
      formFields.forEach(field => {
        if (field.type !== "file") {
          resetData[field.id] = "";
        }
      });
      return resetData;
    });
    setFileNames({});
    setErrors({});
    setShowCancelConfirm(false);
    navigate('/');
  };

  // Render field berdasarkan tipe
  const renderField = (field) => {
    const commonClasses = `bg-neutral-800 border ${errors[field.id] ? 'border-red-500' : 'border-gray-600'} text-white text-base rounded-lg focus:ring-1 focus:ring-[#F66951] focus:border-[#F66951] block w-full px-4 py-3.5 shadow-sm transition-colors`;

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            id={field.id}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            value={formData[field.id] || ""}
            onChange={(e) => handleInputChange(e, field.id)}
            className={`${commonClasses} resize-none h-32`}
          />
        );

      case "file":
        return (
          <div className="relative">
            <div
              onClick={() => document.getElementById(`file-${field.id}`).click()}
              className={`${commonClasses} h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-700 text-center p-4`}
            >
              {fileNames[field.id] ? (
                <div className="text-center">
                  <div className="text-green-400 mb-2">✓ File terupload</div>
                  <div className="text-sm truncate max-w-full">{fileNames[field.id]}</div>
                  <div className="text-xs text-gray-400 mt-2">Klik untuk ganti file</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Klik atau drag file {field.label}</div>
                  <div className="text-sm text-gray-500">Format: png, jpg, pdf</div>
                </div>
              )}
            </div>
            <input
              type="file"
              id={`file-${field.id}`}
              required={field.required}
              className="hidden"
              onChange={(e) => handleFileChange(e, field.id)}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
        );

      default: // text
        return (
          <input
            type={field.type || "text"}
            id={field.id}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.id] || ""}
            onChange={(e) => handleInputChange(e, field.id)}
            className={commonClasses}
          />
        );
    }
  };

  // Pisahkan field untuk kolom kiri dan kanan
  const leftFields = formFields.filter(field => field.column === "left");
  const rightFields = formFields.filter(field => field.column === "right");

  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <div className="w-screen bg-black gap-y-4 min-h-44 md:min-h-64 lg:min-h-84 bg-cover bg-center flex flex-col items-center justify-center opacity-0 animate-[fadeIn_0.5s_forwards]">
        <div className="absolute inset-0 bg-[url('/home/form_filling.webp')] bg-cover bg-center opacity-20"></div>
        <div className="text-sm text-white sm:text-lg md:text-xl lg:text-2xl border-[#F66951]">
          Form Pendaftaran Himpunan Mahasiswa
        </div>
        <div className="w-24 h-[0.5px] bg-[#F66951]"></div>
      </div>

      {/* Floating Error Message */}
      {popupMessage && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fadeIn">
          {popupMessage}
        </div>
      )}

      {/* Form Section - 2 Kolom */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
          {/* Kolom Kiri */}
          <div className="space-y-8">
            {leftFields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.type === "file" ? `file-${field.id}` : field.id} className="block mb-2.5 text-sm font-medium text-white">
                  {field.label} <span className="text-[#F66951]">*</span>
                </label>
                {renderField(field)}
                {errors[field.id] && (
                  <p className="mt-1 text-sm text-red-400">{errors[field.id]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-8">
            {rightFields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.type === "file" ? `file-${field.id}` : field.id} className="block mb-2.5 text-sm font-medium text-white">
                  {field.label} <span className="text-[#F66951]">*</span>
                </label>
                {renderField(field)}
                {errors[field.id] && (
                  <p className="mt-1 text-sm text-red-400">{errors[field.id]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Button Section - Tengah */}
        <div className="flex flex-row justify-center gap-4 mt-16">
          <button
            type="submit"
            disabled={loading}
            className="bg-neutral-800 hover:bg-neutral-700 border border-gray-600 text-white font-medium py-3.5 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim...
              </>
            ) : "Kirim Pendaftaran"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-neutral-800 hover:bg-neutral-700 border border-gray-600 text-white font-medium py-3.5 px-8 rounded-lg transition-colors min-w-[180px]"
          >
            Batal
          </button>
        </div>
      </form>

      <Footer />

      {/* SUCCESS POPUP - UPDATED MESSAGE */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-neutral-800 rounded-2xl max-w-md w-full p-8 animate-popupIn">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Pendaftaran Berhasil! ✅</h3>

              <p className="text-gray-300 mb-4">
                Data pendaftaran Anda telah berhasil disimpan di database Himpunan Mahasiswa.
              </p>

              <p className="text-gray-400 text-sm mb-6">
                Tim Himpunan Mahasiswa akan menghubungi Anda via WhatsApp
                untuk informasi selanjutnya dalam waktu 1-3 hari kerja.
              </p>

              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  navigate('/');
                }}
                className="bg-[#F66951] hover:bg-[#e55a42] text-white font-medium py-3 px-8 rounded-lg transition-colors w-full"
              >
                Tutup & Kembali ke Homepage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL CONFIRMATION POPUP */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-neutral-800 rounded-2xl max-w-md w-full p-8 animate-popupIn">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Yakin ingin membatalkan?</h3>

              <p className="text-gray-300 mb-6">
                Semua data yang sudah Anda isi akan dihapus.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Tidak, Lanjutkan
                </button>

                <button
                  onClick={confirmCancel}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Ya, Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormHima;