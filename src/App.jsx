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
  ExternalLink,
  Smartphone,
  MousePointer2,
  Eye,
  X
} from 'lucide-react';

/**
 * Komponen InputWrapper di luar App untuk mencegah kehilangan fokus kursor
 */
const InputWrapper = ({ label, children, hint, icon: Icon }) => (
  <div className="group space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-indigo-600">
      {Icon && <Icon size={16} />}
      {label}
    </label>
    {children}
    {hint && <p className="text-[11px] text-slate-400 italic leading-tight">{hint}</p>}
  </div>
);

/**
 * Komponen Preview Landing Page yang modern dan eye-catching
 */
const LandingPagePreview = ({ data, isModal = false }) => {
  const services = data.layanan ? data.layanan.split(',').map(s => s.trim()) : ['Layanan Unggulan 1', 'Layanan Unggulan 2'];
  const advantages = data.keunggulan ? data.keunggulan.split(',').map(s => s.trim()) : ['Kualitas Terjamin', 'Pelayanan 24/7'];

  return (
    <div className={`w-full bg-white shadow-2xl border border-slate-200 overflow-hidden text-left transition-all duration-500 flex flex-col ${isModal ? 'h-[80vh] rounded-t-3xl' : 'h-full max-h-[85vh] rounded-3xl'}`}>
      {/* Browser Bar */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2 sticky top-0 z-10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="bg-white px-4 py-1.5 rounded-full text-[11px] text-slate-400 flex-1 ml-3 border border-slate-200 truncate font-medium">
          https://{data.domain || 'bisnis-anda.com'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Hero Section */}
        <header className="p-6 sm:p-8 text-center" style={{ backgroundColor: `${data.warna}08` }}>
          <nav className="flex justify-between items-center mb-8">
            <div className="font-black text-sm sm:text-base tracking-tighter" style={{ color: data.warna }}>
              {data.namaBisnis || 'NAMA BISNIS'}
            </div>
            <div className="flex gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Home</span>
              <span>Layanan</span>
            </div>
          </nav>
          
          <div className="animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-[1.1] tracking-tight">
              {data.judulUtama || 'Solusi Digital Terbaik'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
              {data.deskripsi || 'Jelaskan layanan Anda di sini.'}
            </p>
            <button 
              className="px-6 py-2.5 rounded-xl text-[10px] font-black text-white shadow-xl transition-transform active:scale-95" 
              style={{ backgroundColor: data.warna }}
            >
              Konsultasi
            </button>
          </div>
        </header>

        {/* Services */}
        <section className="p-6 sm:p-8 bg-white">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 text-center">Layanan</h2>
          <div className="grid grid-cols-1 gap-3">
            {services.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <Zap size={16} style={{ color: data.warna }} />
                <p className="text-xs font-bold text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Us */}
        <section className="p-6 sm:p-8 bg-slate-900 text-white rounded-t-[2rem]">
          <h2 className="text-sm font-bold mb-4 tracking-tight">Kenapa Kami?</h2>
          <div className="grid grid-cols-1 gap-2">
            {advantages.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/5 p-2.5 rounded-lg">
                <CheckCircle size={12} className="text-green-400" />
                <span className="text-[10px] font-medium text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="p-6 bg-white text-center border-t border-slate-100">
           <p className="text-base font-black text-slate-900">{data.kontakWA || 'WhatsApp'}</p>
        </footer>
      </div>
    </div>
  );
};

const App = () => {
  const GAS_URL = "https://script.google.com/macros/s/AKfycby_HQrDaZU1vmS9rdu1kqNNTno5ndqUxgu4_ynVA3bXw_nC13SdGIvWtakFYtGKlH8A/exec"; 

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [formData, setFormData] = useState({
    namaBisnis: '',
    domain: '',
    domainCadangan: '',
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
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">Identitas Brand</h2>
              <p className="text-xs sm:text-sm text-slate-500">Informasi dasar untuk domain dan kontak.</p>
            </div>
            
            <InputWrapper label="Nama Bisnis" icon={Briefcase}>
              <input required type="text" name="namaBisnis" value={formData.namaBisnis} onChange={handleChange} placeholder="Misal: Artha Digital Studio" className="w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
            </InputWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWrapper label="Domain Utama" icon={Globe}>
                <input required type="text" name="domain" value={formData.domain} onChange={handleChange} placeholder="bisnisanda.com" className="w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
              </InputWrapper>
              <InputWrapper label="Domain Cadangan" icon={Globe}>
                <input type="text" name="domainCadangan" value={formData.domainCadangan} onChange={handleChange} placeholder="bisnisanda-official.com" className="w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
              </InputWrapper>
            </div>

            <InputWrapper label="WhatsApp Kontak" icon={MessageSquare}>
              <input required type="text" name="kontakWA" value={formData.kontakWA} onChange={handleChange} placeholder="62812xxx" className="w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
            </InputWrapper>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">Struktur Konten</h2>
              <p className="text-xs sm:text-sm text-slate-500">Pesan utama yang ingin Anda sampaikan.</p>
            </div>

            <InputWrapper label="Judul Utama" icon={Layout}>
              <input required type="text" name="judulUtama" value={formData.judulUtama} onChange={handleChange} placeholder="Solusi Terbaik Bisnis" className="w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
            </InputWrapper>

            <InputWrapper label="Deskripsi" icon={Info}>
              <textarea required name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows="4" placeholder="Ceritakan sejarah singkat bisnis Anda..." className="w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none" />
            </InputWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWrapper label="Layanan (Pisah Koma)" icon={Zap}>
                <input required type="text" name="layanan" value={formData.layanan} onChange={handleChange} placeholder="Desain, Cetak, Kirim" className="w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
              </InputWrapper>
              <InputWrapper label="Keunggulan (Pisah Koma)" icon={ShieldCheck}>
                <input required type="text" name="keunggulan" value={formData.keunggulan} onChange={handleChange} placeholder="Murah, Cepat, Garansi" className="w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
              </InputWrapper>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">Visual & Aset</h2>
              <p className="text-xs sm:text-sm text-slate-500">Warna tema dan link Google Drive.</p>
            </div>

            <InputWrapper label="Warna Dominan" icon={Palette}>
              <div className="flex items-center gap-6 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <input type="color" name="warna" value={formData.warna} onChange={handleChange} className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-white shadow-sm rounded-2xl cursor-pointer" />
                <div>
                  <p className="font-mono text-sm font-bold text-slate-700 uppercase">{formData.warna}</p>
                  <p className="text-[10px] text-slate-400">Pilihan Warna Tema</p>
                </div>
              </div>
            </InputWrapper>

            <InputWrapper label="Link Aset Google Drive" icon={ImageIcon}>
              <div className="relative group">
                <input required type="url" name="linkAset" value={formData.linkAset} onChange={handleChange} placeholder="https://drive.google.com/..." className="w-full p-3.5 sm:p-4 pr-12 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
                <ExternalLink className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
            </InputWrapper>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fadeIn lg:hidden">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-xl font-bold text-slate-800">Final Review</h2>
              <p className="text-sm text-slate-500 italic">Cek desain Anda sekali lagi sebelum kirim.</p>
            </div>
            <LandingPagePreview data={formData} />
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl shadow-indigo-100 p-8 sm:p-12 text-center border border-white">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
            <CheckCircle className="text-green-500 w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tighter leading-none">Berhasil Terkirim!</h1>
          <p className="text-slate-500 leading-relaxed mb-8 text-xs sm:text-sm">
            Brief project <strong>{formData.namaBisnis}</strong> telah aman. Kami akan segera menghubungi Anda via WhatsApp.
          </p>
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-xl active:scale-95">
            Tutup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 sm:py-12 px-4 lg:px-8">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Floating Preview Button for Mobile */}
      {step < 4 && (
        <button 
          onClick={() => setShowMobilePreview(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 bg-indigo-600 text-white p-4 rounded-full shadow-2xl active:scale-90 transition-transform flex items-center gap-2 border-2 border-white/20"
        >
          <Eye size={20} />
          <span className="text-xs font-bold">Intip Preview</span>
        </button>
      )}

      {/* Mobile Preview Overlay */}
      {showMobilePreview && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="flex justify-between items-center px-6 py-4 text-white">
            <span className="text-xs font-black uppercase tracking-widest">Live Preview</span>
            <button onClick={() => setShowMobilePreview(false)} className="p-2 bg-white/10 rounded-full"><X size={20} /></button>
          </div>
          <LandingPagePreview data={formData} isModal={true} />
        </div>
      )}

      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="text-left">
              <div className="px-3 py-1 bg-white border border-slate-200 rounded-full inline-flex items-center gap-2 mb-3 shadow-sm">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 tracking-tighter">Order System v2.1</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
                Project <span className="text-indigo-600">Brief</span>
              </h1>
            </div>

            <div className="flex gap-1.5 sm:gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]' : 'bg-slate-200'}`} />
              ))}
            </div>

            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden text-left p-6 sm:p-10">
              <form onSubmit={handleSubmit}>
                {renderStep()}

                <div className="flex items-center justify-between mt-8 pt-6 sm:pt-8 border-t border-slate-50">
                  {step > 1 ? (
                    <button type="button" onClick={prevStep} className="flex items-center gap-1.5 text-slate-400 font-bold hover:text-indigo-600 text-xs sm:text-sm px-2">
                      <ChevronLeft size={18} /> Kembali
                    </button>
                  ) : <div />}

                  {step < 4 ? (
                    <button type="button" onClick={nextStep}
                      disabled={(step === 1 && (!formData.namaBisnis || !formData.domain || !formData.kontakWA)) || (step === 2 && (!formData.judulUtama || !formData.deskripsi)) || (step === 3 && !formData.linkAset)}
                      className="flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 text-white font-bold rounded-2xl transition-all shadow-xl text-xs sm:text-sm"
                    >
                      {step === 3 ? 'Lihat Final' : 'Lanjut'} <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button type="submit" disabled={loading} className="flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-xl text-sm sm:text-base">
                      {loading ? 'Mengirim...' : <><Send size={18} /> Kirim Sekarang</>}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className={`lg:col-span-7 sticky top-12 ${step === 4 ? 'block' : 'hidden lg:block'}`}>
            <div className="relative group">
              <div className="absolute -top-6 left-6 px-4 py-2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-t-xl shadow-lg hidden sm:block">
                Desktop Live Preview
              </div>
              <LandingPagePreview data={formData} />
            </div>

            <div className="mt-6 sm:mt-8 bg-white/50 backdrop-blur rounded-3xl p-5 sm:p-6 border border-white flex flex-col sm:flex-row justify-between items-center px-6 sm:px-10 gap-3">
               <div className="text-center sm:text-left">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Investasi</p>
                  <p className="text-lg sm:text-xl font-black text-slate-900">Rp 750.000</p>
               </div>
               <div className="flex items-center gap-2 py-1.5 px-3 bg-emerald-50 rounded-full border border-emerald-100">
                  <ShieldCheck className="text-emerald-500" size={14} />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Aman & Terverifikasi</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
