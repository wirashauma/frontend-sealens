"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  Star,
  Users,
  Waves,
  BookOpen,
  Camera,
  ExternalLink,
  Wrench, // Ikon baru untuk popup
  X, // Ikon silang untuk menutup popup
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

interface FilterOption {
  label: string;
  placeholder: string;
  options: string[];
}

interface GalleryImage {
  src: string;
  caption: string;
  location: string;
}

interface ReportCard {
  id: number;
  image: string;
  title: string;
  location: string;
  tag: string;
  tagColor: string;
  date: string;
  readTime: string;
  status: string;
  category: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "#" },
  { label: "Tentang Proyek", href: "#tentang" },
  { label: "Liputan", href: "#liputan" },
  { label: "Galeri", href: "#galeri" },
  { label: "Tim", href: "#tim" },
  { label: "Kontak", href: "#kontak" },
];

const FILTER_OPTIONS: FilterOption[] = [
  {
    label: "Fokus Isu",
    placeholder: "Pilih Isu Ekosistem",
    options: [
      "Pemutihan Terumbu Karang",
      "Sampah Plastik Pesisir",
      "Abrasi Pantai",
      "Penangkapan Ikan Ilegal (IUUF)",
      "Konservasi Mangrove",
    ],
  },
  {
    label: "Lokasi Liputan",
    placeholder: "Wilayah Sumbar",
    options: [
      "Kepulauan Mentawai",
      "Pesisir Selatan",
      "Kota Padang",
      "Padang Pariaman",
      "Agam",
      "Pasaman Barat",
    ],
  },
  {
    label: "Bulan Liputan",
    placeholder: "Pilih bulan",
    options: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus"],
  },
  {
    label: "Status Publikasi",
    placeholder: "Semua status",
    options: ["Terbit", "Dalam Proses Redaksi", "Investigasi Berjalan", "Arsip"],
  },
];

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/pemutihan_karang.png",
    caption: "Pemutihan Karang",
    location: "Kepulauan Mentawai",
  },
  {
    src: "/images/nelayan.png",
    caption: "Nelayan Tradisional",
    location: "Pesisir Sumatra Barat",
  },
  {
    src: "/images/sampah_pesisir.png",
    caption: "Polusi Pesisir",
    location: "Pantai Padang",
  },
];

const REPORT_CARDS: ReportCard[] = [
  {
    id: 1,
    image: "/images/pemutihan_karang.png",
    title: "Pemutihan Karang Mentawai Semakin Kritis",
    location: "Kepulauan Mentawai, Sumatera Barat",
    tag: "Krisis Iklim",
    tagColor: "bg-orange-100 text-orange-700",
    date: "12 Agustus 2026",
    readTime: "8 Min Read",
    status: "Terbit",
    category: "Terumbu Karang",
  },
  {
    id: 2,
    image: "/images/abrasi_pantai.png",
    title: "Abrasi Pantai Padang Mengancam Pemukiman",
    location: "Kota Padang, Sumatera Barat",
    tag: "Abrasi",
    tagColor: "bg-blue-100 text-blue-700",
    date: "5 Agustus 2026",
    readTime: "5 Min Read",
    status: "Terbit",
    category: "Abrasi Pantai",
  },
  {
    id: 3,
    image: "/images/sampah_pesisir.png",
    title: "Tumpukan Sampah Plastik di Pesisir Selatan",
    location: "Pesisir Selatan, Sumatera Barat",
    tag: "Polusi",
    tagColor: "bg-red-100 text-red-700",
    date: "28 Juli 2026",
    readTime: "6 Min Read",
    status: "Terbit",
    category: "Sampah Plastik",
  },
];

// ─── Komponen Popup "Coming Soon" ─────────────────────────────────────────────

function ComingSoonPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background overlay dengan efek blur */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Box Modal */}
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition"
        >
          <X size={16} />
        </button>
        
        <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-5 border-4 border-teal-100">
          <Wrench size={26} className="text-teal-600" />
        </div>
        
        <h3 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
          Segera Hadir
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 px-2">
          Halaman atau fitur ini masih dalam tahap pengembangan. Silakan kembali lagi nanti untuk melihat pembaruan.
        </p>
        
        <button 
          onClick={onClose} 
          className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800 transition"
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar({ onComingSoon }: { onComingSoon: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
          <img 
            src="/images/logo_sealens.png" 
            alt="Sea Lens Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-white font-semibold text-base tracking-wide">
          Sea Lens
        </span>
      </div>

      <div 
        onClick={onComingSoon}
        className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-white/70 text-sm cursor-pointer hover:bg-white/20 transition"
      >
        <Search size={14} />
        <span>Cari liputan...</span>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        {NAV_LINKS.slice(1).map((link) => {
          // Hanya izinkan link "Tentang Proyek" dan "Liputan" yang bisa discroll
          const isImplemented = link.href === "#tentang" || link.href === "#liputan";
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (!isImplemented) {
                  e.preventDefault();
                  onComingSoon();
                }
              }}
              className="text-white/80 hover:text-white text-sm font-medium transition"
            >
              {link.label}
            </a>
          );
        })}
      </div>

      <button
        className="lg:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <div className="w-5 h-0.5 bg-white mb-1" />
        <div className="w-5 h-0.5 bg-white mb-1" />
        <div className="w-5 h-0.5 bg-white" />
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur p-6 flex flex-col gap-4 lg:hidden">
          {NAV_LINKS.map((link) => {
            const isImplemented = link.href === "#tentang" || link.href === "#liputan" || link.href === "#";
            return (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium"
                onClick={(e) => {
                  setMenuOpen(false);
                  if (!isImplemented) {
                    e.preventDefault();
                    onComingSoon();
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative h-[92vh] min-h-[600px] flex flex-col justify-center items-center text-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=90"
        alt="Ocean background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      <div className="relative z-10 px-6 max-w-3xl">
        <p className="text-white/60 text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Ekspedisi Jurnalisme Partisipatif · 2026
        </p>
        <h1
          className="text-7xl md:text-8xl font-black text-white leading-none mb-6"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Sea Lens
          <br />
          <span className="text-[#7DD3C4]">Project</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mx-auto font-light">
          Menyelam untuk bersuara. Ekspedisi jurnalisme partisipatif mengangkat
          krisis ekosistem laut di Sumatera Barat.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#liputan"
            className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition flex items-center gap-2"
          >
            Lihat Liputan <ArrowRight size={16} />
          </a>
          <a
            href="#tentang"
            className="border border-white/40 text-white font-medium px-6 py-3 rounded-full text-sm hover:bg-white/10 transition"
          >
            Tentang Proyek
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 bg-black/40 backdrop-blur border-t border-white/10 pt-4 pb-12 md:pb-16 px-6 text-white/70 text-sm">
        <div className="flex items-center gap-2">
          <Camera size={14} className="text-[#7DD3C4]" />
          <span>12 Liputan Terbit</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-white/20" />
        <div className="flex items-center gap-2">
          <Users size={14} className="text-[#7DD3C4]" />
          <span>8 Jurnalis Komunitas</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-white/20" />
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-[#7DD3C4]" />
          <span>5 Lokasi Pesisir</span>
        </div>
      </div>
    </section>
  );
}

function FilterBar({ onComingSoon }: { onComingSoon: () => void }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-30 mx-4 md:mx-12 -mt-6 md:-mt-8" ref={dropdownRef}>
      <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/80 flex flex-col md:flex-row items-stretch md:items-center border border-gray-100">
        {FILTER_OPTIONS.map((filter, i) => {
          const isOpen = openDropdown === filter.label;
          const selectedValue = selections[filter.label];

          return (
            <div
              key={filter.label}
              className={`relative flex-1 flex flex-col ${
                i < FILTER_OPTIONS.length - 1 ? "border-b md:border-b-0 md:border-r border-gray-100" : ""
              }`}
            >
              <div
                onClick={() => setOpenDropdown(isOpen ? null : filter.label)}
                className={`px-6 py-4 flex flex-col cursor-pointer hover:bg-gray-50 transition h-full ${
                  i === 0 ? "rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" : ""
                }`}
              >
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  {filter.label}
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-sm truncate ${
                      selectedValue ? "text-gray-900 font-semibold" : "text-gray-500"
                    }`}
                  >
                    {selectedValue || filter.placeholder}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full min-w-[220px] bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2">
                  {filter.options.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setSelections((prev) => ({ ...prev, [filter.label]: opt }));
                        setOpenDropdown(null);
                      }}
                      className={`px-5 py-3 text-sm cursor-pointer transition flex justify-between items-center ${
                        selectedValue === opt
                          ? "bg-teal-50 text-teal-700 font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                  {selectedValue && (
                    <div
                      onClick={() => {
                        setSelections((prev) => {
                          const newSelections = { ...prev };
                          delete newSelections[filter.label];
                          return newSelections;
                        });
                        setOpenDropdown(null);
                      }}
                      className="px-5 py-2 mt-1 border-t border-gray-100 text-xs text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Reset Pilihan
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div className="p-3 md:pr-3 shrink-0">
          <button 
            onClick={onComingSoon}
            className="bg-gray-900 text-white font-semibold text-sm px-8 py-4 rounded-xl hover:bg-gray-700 transition w-full md:w-auto flex items-center gap-2 justify-center"
          >
            <Search size={15} />
            Cari
          </button>
        </div>
      </div>
    </div>
  );
}

function AboutSection({ onComingSoon }: { onComingSoon: () => void }) {
  return (
    <section id="tentang" className="py-24 px-6 md:px-12 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 border-b border-gray-100 pb-12">
        <div className="md:w-1/2">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-teal-700 text-xs font-semibold tracking-wide">
              Tentang Ekspedisi
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Bukan Sekadar Jurnalisme Biasa
          </h2>
        </div>
        
        <div className="md:w-1/2 md:pt-12">
          <p className="text-gray-600 text-base leading-relaxed text-justify mb-6">
            Kami percaya kebenaran ada di lapangan — di bawah permukaan laut,
            di perahu nelayan, dan di mulut komunitas yang terdampak. Kami berkolaborasi dengan komunitas lokal untuk mendokumentasikan
            dan mencari solusi atas krisis pesisir yang selama ini luput dari
            sorotan media nasional.
          </p>
          <button 
            onClick={onComingSoon}
            className="bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition flex items-center gap-2 w-fit"
          >
            Pelajari Lebih Lanjut <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-stretch">
        <div className="lg:w-1/3 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-teal-500 pl-4">
            Pencapaian Ekspedisi
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Waves size={20} />, value: "3", label: "Lokasi Menyelam" },
              { icon: <Camera size={20} />, value: "120+", label: "Jam Rekaman" },
              { icon: <Users size={20} />, value: "40+", label: "Narasumber" },
              { icon: <BookOpen size={20} />, value: "12", label: "Artikel Terbit" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition"
              >
                <div className="text-teal-600 mb-3 bg-teal-100 w-fit p-2 rounded-lg">{stat.icon}</div>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[400px]">
          <div className="relative rounded-2xl overflow-hidden md:row-span-2 group">
            <img
              src={GALLERY_IMAGES[0].src}
              alt={GALLERY_IMAGES[0].caption}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <p className="text-white font-bold text-lg">{GALLERY_IMAGES[0].caption}</p>
              <p className="text-white/80 text-sm flex items-center gap-1 mt-1"><MapPin size={14}/> {GALLERY_IMAGES[0].location}</p>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden h-[200px] md:h-auto group">
            <img
              src={GALLERY_IMAGES[1].src}
              alt={GALLERY_IMAGES[1].caption}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
              <p className="text-white font-bold">{GALLERY_IMAGES[1].caption}</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-[200px] md:h-auto group">
            <img
              src={GALLERY_IMAGES[2].src}
              alt={GALLERY_IMAGES[2].caption}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
              <p className="text-white font-bold">{GALLERY_IMAGES[2].caption}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="bg-gray-50 border-y border-gray-100 py-5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm">
        <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
          <Waves size={12} className="text-white" />
        </div>
        <span className="text-gray-600 font-medium">Inisiatif Sea Lens</span>
        <span className="text-gray-300 mx-1">·</span>
        <Star size={13} className="text-amber-400 fill-amber-400" />
        <span className="text-gray-600 font-medium">200+ Pembaca Setia</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
        <span>Didukung oleh komunitas lokal</span>
        <span className="hidden md:block">·</span>
        <span className="hidden md:block">Berkolaborasi dengan nelayan Sumbar</span>
        <span className="hidden md:block">·</span>
        <span className="hidden md:block">Terverifikasi oleh LSM</span>
      </div>
    </div>
  );
}

function ReportsSection({ onComingSoon }: { onComingSoon: () => void }) {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const filterTabs = ["Semua", "Terumbu Karang", "Abrasi Pantai", "Sampah Plastik", "Overfishing"];

  const filtered =
    activeFilter === "Semua"
      ? REPORT_CARDS
      : REPORT_CARDS.filter((c) => c.category === activeFilter);

  return (
    <section id="liputan" className="py-24 px-6 md:px-12 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="md:w-1/2">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-blue-700 text-xs font-semibold tracking-wide">
              Publikasi Terbaru 2026
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Hasil Liputan &amp; Temuan
          </h2>
        </div>
        
        <div className="md:w-1/2">
          <p className="text-gray-600 text-base leading-relaxed text-justify">
            Kami menyajikan laporan mendalam dari lapangan yang didokumentasikan
            bersama komunitas pesisir Sumatera Barat. Baca investigasi terbaru kami
            mengenai krisis ekosistem laut yang membutuhkan perhatian segera.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8 items-start sm:items-center">
        <div className="flex gap-2 overflow-x-auto pb-1 flex-1 w-full hide-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition ${
                activeFilter === tab
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(filtered.length > 0 ? filtered : REPORT_CARDS).map((card) => (
          <ReportCard key={card.id} card={card} onComingSoon={onComingSoon} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <button 
          onClick={onComingSoon}
          className="border-2 border-gray-200 text-gray-700 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gray-50 hover:border-gray-300 transition flex items-center gap-2"
        >
          Lihat Semua Publikasi <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

function ReportCard({ card, onComingSoon }: { card: ReportCard, onComingSoon: () => void }) {
  return (
    <div 
      onClick={onComingSoon}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 group cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div
          className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-md shadow-sm ${card.tagColor}`}
        >
          {card.tag}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-3">
          <MapPin size={13} className="text-teal-600" />
          {card.location}
        </p>
        
        <div className="flex items-start justify-between gap-2 mb-4 flex-grow">
          <h3 className="font-bold text-gray-900 text-xl leading-snug group-hover:text-teal-700 transition line-clamp-3">
            {card.title}
          </h3>
          <ExternalLink
            size={18}
            className="text-gray-300 group-hover:text-teal-500 flex-shrink-0 mt-1 transition"
          />
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {card.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {card.readTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaSection({ onComingSoon }: { onComingSoon: () => void }) {
  return (
    <section className="relative py-32 overflow-hidden bg-gray-950">
      <img
        src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1800&q=80"
        alt="Ocean"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/60 to-gray-950/80" />
      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <p className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-4">
          Bergabunglah Bersama Kami
        </p>
        <h2
          className="text-5xl md:text-6xl font-black text-white leading-tight mb-6"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Suara Laut
          <br />
          Butuh Penceritanya
        </h2>
        <p className="text-white/60 text-lg leading-relaxed mb-10">
          Daftarkan diri sebagai jurnalis komunitas, fotografer bawah laut, atau
          relawan riset lapangan. Bersama kita angkat krisis ini ke permukaan.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              onComingSoon();
            }}
            className="bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-teal-50 transition flex items-center justify-center gap-2"
          >
            Daftar Sekarang <ArrowRight size={16} />
          </a>
          <a
            href="#tentang"
            className="border border-white/30 text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition"
          >
            Pelajari Proyek
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ onComingSoon }: { onComingSoon: () => void }) {
  return (
    <footer className="bg-gray-950 text-white/50 py-12 px-6 md:px-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
            <img 
              src="/images/logo_sealens.png" 
              alt="Sea Lens Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white font-semibold text-sm">Sea Lens Project</span>
        </div>
        <p className="text-xs text-center">
          © 2026 Sea Lens Project · Jurnalisme Partisipatif untuk Ekosistem Laut
          Sumatera Barat
        </p>
        <div className="flex gap-6 text-xs">
          {["Tentang", "Liputan", "Galeri", "Kontak"].map((l) => {
            const isImplemented = l === "Tentang" || l === "Liputan";
            const href = isImplemented ? (l === "Tentang" ? "#tentang" : "#liputan") : "#";
            return (
              <a 
                key={l} 
                href={href} 
                onClick={(e) => {
                  if (!isImplemented) {
                    e.preventDefault();
                    onComingSoon();
                  }
                }}
                className="hover:text-white transition"
              >
                {l}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SeaLensPage() {
  // State untuk mengontrol kemunculan popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fungsi yang dipanggil saat tombol/link tidak berfungsi diklik
  const handleComingSoon = () => setIsPopupOpen(true);

  return (
    <main className="font-sans antialiased bg-white text-gray-900 relative">
      {/* Komponen Popup Global */}
      <ComingSoonPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <div className="relative">
        <Navbar onComingSoon={handleComingSoon} />
        <HeroSection />
      </div>

      <FilterBar onComingSoon={handleComingSoon} />

      <div className="mt-8">
        <TrustBar />
      </div>

      <AboutSection onComingSoon={handleComingSoon} />

      <div className="bg-gray-50 border-t border-gray-100">
        <ReportsSection onComingSoon={handleComingSoon} />
      </div>

      <CtaSection onComingSoon={handleComingSoon} />

      <Footer onComingSoon={handleComingSoon} />
    </main>
  );
}