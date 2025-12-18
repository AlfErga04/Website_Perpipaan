import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormHima = () => {
    // State
    const [popups, setPopups] = useState([])

    const addPopup = (text, type = 'error', timeout = 4000) => {
        const id = Date.now() + Math.random()
        setPopups((p) => [...p, { id, text, type }])
        if (timeout) setTimeout(() => setPopups((p) => p.filter((it) => it.id !== id)), timeout)
    }

    // Form Data
    const [form, setForm] = useState({
        name: "",
        nim: "",
        class: "",
        cohort: "",
        reason: "",
        experience: "",
        ktm_file: null,
        cv_file: null,
    });

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === "file") {
            const file = files && files[0] ? files[0] : null
            // client-side validation: types and size (2MB)
            const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
            const maxBytes = 2048 * 1024
            if (file) {
                if (!allowed.includes(file.type)) {
                    setForm((prev) => ({ ...prev, [name]: null }))
                    addPopup('File tidak didukung. Gunakan jpg/png/pdf.', 'error')
                    return
                }
                if (file.size > maxBytes) {
                    setForm((prev) => ({ ...prev, [name]: null }))
                    addPopup('File terlalu besar. Maks 2MB.', 'error')
                    return
                }
                setForm((prev) => ({ ...prev, [name]: file }))
                addPopup(`${file.name} dipilih.`, 'success', 2500)
            } else {
                setForm((prev) => ({ ...prev, [name]: null }))
            }
        } else {
            setForm((prev) => ({ ...prev, [name]: value }))
        }
    };

    const [successAdd, setSuccessAdd] = useState(false);
    const [existingSubmission, setExistingSubmission] = useState(null)

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // check existing submissions by nim
        // if (form.nim) {
        //     try {
        //         const check = await axios.get(`${import.meta.env.VITE_API_URL}/api/form-hima/check?nim=${encodeURIComponent(form.nim)}`)
        //         const items = check.data || []
        //         // if any submission exists and not rejected, block
        //         // const active = items.find((it) => (it.status || 'pending') !== 'rejected')
        //         if (items.find((it) => (it.status || 'pending') !== 'rejected')) {
        //             addPopup('Kamu sudah mengirim form sebelumnya. Tunggu keputusan admin atau kontak admin jika perlu.', 'error')
        //             return false;
        //         } else if (items.find((it) => (it.status || 'accepted') !== 'rejected')) {
        //             addPopup('Kamu sudah diterima, tidak perlu mengirim form lagi!', 'error')
        //             return false;
        //         }
        //     } catch (err) {
        //         // ignore check errors but notify
        //         console.error('Check error', err)
        //     }
        // }

        if (form.nim) {
            try {
                const check = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/form-hima/check?nim=${encodeURIComponent(form.nim)}`
                )
                const submissions = check.data || []

                console.log(submissions)
                if (submissions.length > 0) {
                    // ambil data terakhir (first element is latest due to backend latest())
                    const latest = submissions[0]
                    const status = latest.status || 'pending'

                    if (status === 'pending') {
                        addPopup(
                            'Form kamu sedang diproses. Tunggu keputusan admin.',
                            'error'
                        )
                        return
                    }

                    if (status === 'accepted') {
                        addPopup(
                            'Kamu sudah diterima. Tidak perlu mengirim form lagi.',
                            'error'
                        )
                        return
                    }

                    // status === rejected → boleh lanjut
                }
            } catch (error) {
                const resp = error?.response

                if (resp?.status === 409) {
                    addPopup(resp.data.message, 'error')
                    return
                }

                if (resp?.data?.errors) {
                    const msgs = Object.values(resp.data.errors).flat().join(' ')
                    addPopup(msgs, 'error')
                } else {
                    addPopup('Gagal mengirim form.', 'error')
                }
            }
        }


        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("nim", form.nim);
        formData.append("class", form.class);
        formData.append("cohort", form.cohort);
        formData.append("reason", form.reason);
        formData.append("experience", form.experience);
        formData.append("ktm_file", form.ktm_file);
        formData.append("cv_file", form.cv_file);

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/form-hima`, formData, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSuccessAdd(true);
            addPopup('Form berhasil dikirim.', 'success')
            // clear form after success
            setForm({ name: '', nim: '', class: '', cohort: '', reason: '', experience: '', ktm_file: null, cv_file: null })
        } catch (error) {
            console.error('Error', error)
            // Laravel validation errors
            const resp = error?.response?.data
            if (resp && resp.errors) {
                // flatten messages
                const msgs = Object.values(resp.errors).flat().join(' ')
                addPopup(msgs || 'Terdapat error validasi.', 'error')
            } else if (resp && resp.message) {
                addPopup(resp.message, 'error')
            } else {
                addPopup('Gagal mengirim form. Coba lagi.', 'error')
            }
        }
    };

    const checkNim = async (nim) => {
        if (!nim) {
            setExistingSubmission(null)
            return
        }
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/form-hima/check?nim=${encodeURIComponent(nim)}`)
            const items = res.data || []
            const latest = items.length ? items[0] : null
            setExistingSubmission(latest)
        } catch (err) {
            console.error('check nim failed', err)
            setExistingSubmission(null)
        }
    }

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

            {/* Floating Messages (stack) */}
            <div className="fixed top-4 right-4 flex flex-col-reverse gap-2 z-50">
                {popups.map((p) => (
                    <div key={p.id} className={`text-white px-6 py-3 rounded-lg shadow-xl animate-fadeIn ${p.type === 'success' ? 'bg-green-600' : p.type === 'info' ? 'bg-blue-600' : 'bg-red-600'}`}>
                        {p.text}
                    </div>
                ))}
            </div>

            {/* Hero */}
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="max-w-5xl mx-auto my-20 px-6 text-white"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Existing submission status */}
                    {existingSubmission && (
                        <div className="md:col-span-2 p-4 rounded bg-[#111827] border border-gray-700 mb-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-300">Status pengajuan terakhir</div>
                                    <div className="font-semibold text-white">{existingSubmission.name} — {existingSubmission.nim}</div>
                                    <div className="text-sm text-gray-400">Status: <span className={`px-2 py-1 rounded ${existingSubmission.status === 'accepted' ? 'bg-green-600' : existingSubmission.status === 'rejected' ? 'bg-red-600' : 'bg-gray-600'}`}>{existingSubmission.status || 'pending'}</span></div>
                                </div>
                                <div className="text-sm text-gray-300">Tanggal: {existingSubmission.created_at ? new Date(existingSubmission.created_at).toLocaleString() : '—'}</div>
                            </div>
                        </div>
                    )}

                    {/* Nama Lengkap */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F66951]"
                        />
                    </div>

                    {/* NIM */}
                    <div>
                        <label className="block mb-2 font-medium">
                            NIM <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nim"
                            value={form.nim}
                            onChange={handleChange}
                            onBlur={(e) => checkNim(e.target.value)}
                            required
                            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F66951]"
                        />
                    </div>

                    {/* Kelas */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Kelas <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="class"
                            value={form.class}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F66951]"
                        />
                    </div>

                    {/* Angkatan */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Angkatan <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="cohort"
                            value={form.cohort}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F66951]"
                        />
                    </div>

                    {/* Alasan Masuk HIMA */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Alasan Masuk Hima <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="reason"
                            rows={4}
                            value={form.reason}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#F66951]"
                        />
                    </div>

                    {/* Pengalaman Organisasi */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Pengalaman Organisasi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="experience"
                            rows={4}
                            value={form.experience}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#F66951]"
                        />
                    </div>

                    {/* Upload CV */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Upload CV <span className="text-red-500">*</span>
                        </label>

                        <label className="flex flex-col justify-center items-center h-32 border border-gray-600 rounded-lg cursor-pointer bg-[#2a2a2a] hover:border-[#F66951] transition">
                            <input type="file" className="hidden" name="cv_file" onChange={handleChange} />
                            {/* <span className="text-green-400 font-medium">✓ File terupload</span> */}
                            <span className="text-xs text-gray-400 mt-2">
                                {form.cv_file ? form.cv_file.name : 'Klik untuk ganti file'}
                            </span>
                        </label>
                    </div>

                    {/* Upload KTM */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Upload KTM <span className="text-red-500">*</span>
                        </label>

                        <label className="flex flex-col justify-center items-center h-32 border border-gray-600 rounded-lg cursor-pointer bg-[#2a2a2a] hover:border-[#F66951] transition">
                            <input type="file" className="hidden" name="ktm_file" onChange={handleChange} />
                            {/* <span className="text-green-400 font-medium">✓ File terupload</span> */}
                            <span className="text-xs text-gray-400 mt-2">
                                {form.ktm_file ? form.ktm_file.name : 'Klik untuk ganti file'}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center gap-6 mt-14">
                    <button
                        type="submit"
                        className="px-10 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 hover:bg-[#F66951] hover:border-[#F66951] transition font-semibold"
                    >
                        Kirim Pendaftaran
                    </button>

                    <button
                        type="button"
                        className="px-10 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 hover:bg-gray-700 transition font-semibold"
                    >
                        Batal
                    </button>
                </div>
            </form>
            <Footer />
        </div>
    );
}

export default FormHima