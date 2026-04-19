import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Globe, 
  Briefcase, 
  Image as ImageIcon, 
  Palette, 
  MessageSquare,
  Info,
  ShieldCheck,
  Zap,
  Layout,
  ExternalLink
} from 'lucide-react';

/**
 * PERBAIKAN UTAMA: 
 * Komponen InputWrapper dipindahkan ke LUAR komponen App.
 * Jika ditaruh di dalam App, React akan membuat ulang komponen ini 
 * setiap kali state berubah (ketik huruf), yang menyebabkan input kehilangan fokus.
 */
const InputWrapper = ({ label, children, hint, icon: Icon }) => (
  <div className="group space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-indigo-600">
      {Icon && <Icon size={16} />}
      {label}
    </label>
    {children}
    {hint && <p className="text-[11px] text-slate-400 italic">{hint}</p>}
  </div>
);

const App = () => {
  // URL Web App dari Google Apps Script Anda
  const GAS_URL = "https://script.google.com/macros/s/AKfycby_HQrDaZU1vmS9rdu1kqNNTno5ndqUxgu4_ynVA3bXw_nC13SdGIvWtakFYtGKlH8A/exec"; 

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    namaBisnis: '',
    domain: '',
    judulUtama: '',
    deskripsi: '',
    layanan: '',
    keunggulan: '',
    kontakWA: '',
    linkAset: '',
    warna: '#6366f1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(prev => prev + 1);
  };
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!GAS_URL) {
      alert("Konfigurasi API belum lengkap.");
      return;
    }
    
    setLoading(true);
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan teknis. Silakan coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl font-bold text-slate-800">Identitas Brand</h2>
              <p className="text-sm text-slate-500">Mari mulai dengan informasi dasar bisnis Anda.</p>
            </div>
            
            <InputWrapper label="Nama Bisnis / Instansi" icon={Briefcase} hint="Nama yang akan ditampilkan di logo/header website.">
              <input 
                required
                type="text" 
                name="namaBisnis"
                value={formData.namaBisnis}
                onChange={handleChange}
                placeholder="Misal: Artha Digital Studio"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              />
            </InputWrapper>

            <InputWrapper label="Pilihan Domain" icon={Globe} hint="Cek ketersediaan di .com (Misal: arthadigital.com)">
              <div className="relative">
                <input 
                  required
                  type="text" 
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="domainanda.com"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase">BASIC PAKET</div>
              </div>
            </InputWrapper>

            <InputWrapper label="WhatsApp Kontak" icon={MessageSquare} hint="Gunakan format internasional (Contoh: 62812...)">
              <input 
                required
                type="text" 
                name="kontakWA"
                value={formData.kontakWA}
                onChange={handleChange}
                placeholder="62812xxx"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              />
            </InputWrapper>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl font-bold text-slate-800">Struktur Konten</h2>
              <p className="text-sm text-slate-500">Isi pesan yang ingin Anda sampaikan ke pengunjung.</p>
            </div>

            <InputWrapper label="Judul Utama (Headline)" icon={Layout} hint="Kalimat 'Menjual' yang pertama kali dilihat pengunjung.">
              <input 
                required
                type="text" 
                name="judulUtama"
                value={formData.judulUtama}
                onChange={handleChange}
                placeholder="Solusi Terbaik untuk Kebutuhan Bisnis Anda"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              />
            </InputWrapper>

            <InputWrapper label="Tentang Kami" icon={Info}>
              <textarea 
                required
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows="4"
                placeholder="Jelaskan sejarah singkat atau visi misi perusahaan Anda..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
              ></textarea>
            </InputWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWrapper label="Layanan Utama" icon={Zap}>
                <input 
                  required
                  type="text" 
                  name="layanan"
                  value={formData.layanan}
                  onChange={handleChange}
                  placeholder="Misal: Jasa Desain, Konsultasi..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </InputWrapper>
              <InputWrapper label="Keunggulan" icon={ShieldCheck}>
                <input 
                  required
                  type="text" 
                  name="keunggulan"
                  value={formData.keunggulan}
                  onChange={handleChange}
                  placeholder="Misal: 24/7 Support, Garansi..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </InputWrapper>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl font-bold text-slate-800">Visual & Aset</h2>
              <p className="text-sm text-slate-500">Sentuhan akhir untuk identitas visual website.</p>
            </div>

            <InputWrapper label="Warna Identitas" icon={Palette} hint="Pilih warna dominan untuk tombol dan aksen.">
              <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <input 
                  type="color" 
                  name="warna"
                  value={formData.warna}
                  onChange={handleChange}
                  className="w-16 h-16 border-4 border-white shadow-sm rounded-full cursor-pointer overflow-hidden"
                />
                <div>
                  <p className="font-mono text-sm font-bold text-slate-700 uppercase tracking-widest">{formData.warna}</p>
                  <p className="text-[10px] text-slate-400">Warna Terpilih</p>
                </div>
              </div>
            </InputWrapper>

            <InputWrapper label="Folder Aset (Google Drive)" icon={ImageIcon} hint="Masukkan link folder berisi Logo & Foto pendukung.">
              <div className="relative group">
                <input 
                  required
                  type="url" 
                  name="linkAset"
                  value={formData.linkAset}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  className="w-full p-3.5 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
                <ExternalLink className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
              </div>
            </InputWrapper>

            <div className="p-6 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white shadow-xl shadow-indigo-200 mt-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={120} />
               </div>
               <h3 className="font-bold mb-2 flex items-center gap-2">
                 <CheckCircle size={18} /> Ringkasan Order
               </h3>
               <div className="space-y-2 text-sm text-indigo-100">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Paket</span>
                    <span className="font-bold">Basic (Single Page)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Target Selesai</span>
                    <span className="font-bold">3 - 4 Hari Kerja</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Total Biaya</span>
                    <span className="font-bold text-white text-lg">Rp 750.000</span>
                  </div>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-green-100">
            <CheckCircle className="text-green-500 w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">Brief Diterima!</h1>
          <p className="text-slate-500 leading-relaxed mb-10">
            Terima kasih telah mempercayakan project Anda. Kami akan segera memproses data <strong>{formData.namaBisnis}</strong> dan mengonfirmasi via WhatsApp.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-xl active:scale-95"
          >
            Selesai
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-16 px-4 font-sans text-slate-900">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>

      <div className="max-w-2xl w-full">
        {/* Top Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order System v2.0</span>
          </div>
        </div>

        {/* Brand Logo & Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter sm:text-5xl">
            Lengkapi <span className="text-indigo-600">Brief</span> Anda
          </h1>
          <p className="mt-4 text-slate-500 text-lg max-w-sm mx-auto">
            Berikan detail terbaik agar website impian Anda segera terwujud.
          </p>
        </div>

        {/* Progress Timeline */}
        <div className="relative mb-12 px-6">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out shadow-[0_0_10px_rgba(79,70,229,0.5)]"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
          
          <div className="relative flex justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 z-10 ${
                  step >= s 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 rotate-0' 
                    : 'bg-white text-slate-300 border-2 border-slate-200 rotate-12'
                }`}>
                  {step > s ? <CheckCircle size={20} /> : s}
                </div>
                <span className={`absolute -bottom-7 text-[10px] font-bold uppercase tracking-tighter transition-colors duration-300 ${step >= s ? 'text-indigo-600' : 'text-slate-300'}`}>
                  {s === 1 ? 'Data' : s === 2 ? 'Konten' : 'Visual'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white overflow-hidden animate-fadeIn">
          <form onSubmit={handleSubmit} className="p-8 sm:p-12">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-50">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="group flex items-center gap-2 px-6 py-3 text-slate-500 font-bold hover:text-indigo-600 transition-all active:scale-95"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                  Sebelumnya
                </button>
              ) : <div />}

              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={nextStep}
                  disabled={
                    (step === 1 && (!formData.namaBisnis || !formData.domain || !formData.kontakWA)) ||
                    (step === 2 && (!formData.judulUtama || !formData.deskripsi))
                  }
                  className="flex items-center gap-3 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-200 active:scale-95 active:shadow-none"
                >
                  Lanjut <ChevronRight size={20} />
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={loading || !formData.linkAset}
                  className="flex items-center gap-3 px-12 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-200 active:scale-95"
                >
                  {loading ? (
                    <div className="flex items-center gap-2 italic">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Mengirim...
                    </div>
                  ) : (
                    <>Kirim Project Brief <Send size={18} /></>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Security Footer */}
        <div className="mt-12 flex flex-col items-center gap-4 text-slate-400">
          <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-1.5 border-r border-slate-200 pr-6">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">SSL Secure</span>
             </div>
             <div className="flex items-center gap-1.5">
                <CheckCircle size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Verified Dev</span>
             </div>
          </div>
          <p className="text-[11px] font-medium tracking-tight">
            © {new Date().getFullYear()} • Dirancang untuk Keunggulan Digital Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
