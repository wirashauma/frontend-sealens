"use client";

import { useState, useRef, useEffect } from "react";
// REVISI: Import Link dari next/link
import Link from "next/link";
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
  Wrench,
  X,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// ─── Komponen Popup "Coming Soon" ─────────────────────────────────────────────

function ComingSoonPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition"
            >
              <X size={16} />
            </button>
            
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-5 border-4 border-teal-100 shrink-0">
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar({ onComingSoon }: { onComingSoon: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-8 py-5"
    >
      <div className="flex items-center gap-3 shrink-0">
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
        className="lg:hidden text-white p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <div className="w-6 h-0.5 bg-white mb-1.5" />
        <div className="w-6 h-0.5 bg-white mb-1.5" />
        <div className="w-6 h-0.5 bg-white" />
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md p-6 border-b border-white/10 flex flex-col gap-5 lg:hidden shadow-2xl">
          {NAV_LINKS.map((link) => {
            const isImplemented = link.href === "#tentang" || link.href === "#liputan" || link.href === "#";
            return (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white text-base font-medium"
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
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[600px] flex flex-col justify-center items-center text-center overflow-hidden">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=90"
        alt="Ocean background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-4 md:px-6 max-w-4xl w-full"
      >
        <motion.p 
          variants={fadeInUp}
          className="text-white/70 text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-4 sm:mb-6"
        >
          Ekspedisi Resonansi Bahari • 2026
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight sm:leading-none mb-6"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Sea Lens
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="text-[#7DD3C4]">Project</span>
        </motion.h1>
        <motion.p 
          variants={fadeInUp}
          className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto font-light"
        >
          Menyelam untuk bersuara. Ekspedisi jurnalisme partisipatif mengungkap
          krisis ekosistem laut di Sumatera Barat.
        </motion.p>
        <motion.div 
          variants={fadeInUp}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#liputan"
            className="w-full sm:w-auto bg-white text-gray-900 font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            Lihat Liputan <ArrowRight size={16} />
          </a>
          <a
            href="#tentang"
            className="w-full sm:w-auto border border-white/40 text-white font-medium px-6 py-3.5 rounded-full text-sm hover:bg-white/10 transition flex justify-center"
          >
            Tentang Proyek
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 bg-black/40 backdrop-blur-md border-t border-white/10 pt-4 pb-20 lg:pb-16 px-4 md:px-6 text-white/80 text-xs sm:text-sm"
      >
        <div className="flex items-center gap-2">
          <Camera size={14} className="text-[#7DD3C4] shrink-0" />
          <span>12 Liputan Terbit</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-white/30" />
        <div className="flex items-center gap-2">
          <Users size={14} className="text-[#7DD3C4] shrink-0" />
          <span>8 Jurnalis Komunitas</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-white/30" />
        <div className="flex items-center gap-2 w-full md:w-auto justify-center mt-2 md:mt-0">
          <MapPin size={14} className="text-[#7DD3C4] shrink-0" />
          <span>5 Lokasi Pesisir</span>
        </div>
      </motion.div>
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
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative z-30 mx-4 lg:mx-12 -mt-10 md:-mt-8" 
      ref={dropdownRef}
    >
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-gray-200/80 flex flex-col lg:flex-row items-stretch lg:items-center overflow-visible lg:overflow-hidden border border-gray-100">
        {FILTER_OPTIONS.map((filter, i) => {
          const isOpen = openDropdown === filter.label;
          const selectedValue = selections[filter.label];

          return (
            <div
              key={filter.label}
              className={`relative flex-1 flex flex-col ${
                i < FILTER_OPTIONS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-gray-100" : ""
              }`}
            >
              <div
                onClick={() => setOpenDropdown(isOpen ? null : filter.label)}
                className={`px-5 py-4 md:px-6 md:py-5 flex flex-col cursor-pointer hover:bg-gray-50 transition h-full ${
                  i === 0 ? "rounded-t-2xl md:rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none" : ""
                }`}
              >
                <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
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
                    size={16}
                    className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 lg:right-auto lg:min-w-[240px] mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2"
                  >
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
                        className="px-5 py-3 mt-1 border-t border-gray-100 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer transition"
                      >
                        Reset Pilihan
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        <div className="p-3 md:p-4 shrink-0">
          <button 
            onClick={onComingSoon}
            className="bg-gray-900 text-white font-semibold text-sm px-8 py-4 w-full rounded-xl hover:bg-gray-800 transition flex items-center gap-2 justify-center"
          >
            <Search size={16} />
            Cari Liputan
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AboutSection({ onComingSoon }: { onComingSoon: () => void }) {
  return (
    <section id="tentang" className="py-16 md:py-24 px-5 md:px-8 lg:px-12 bg-white overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex flex-col lg:flex-row justify-between items-start gap-6 md:gap-8 mb-12 lg:mb-16 border-b border-gray-100 pb-10 lg:pb-12"
      >
        <motion.div variants={fadeInUp} className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-teal-700 text-xs font-semibold tracking-wide">
              Tentang Ekspedisi
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Sea Lens: Membawa Resonansi Bahari ke Permukaan
          </h2>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="lg:w-1/2 lg:pt-12">
          <p className="text-gray-600 text-base leading-relaxed mb-6 md:text-justify">
            Kami percaya kebenaran ada di lapangan. Melalui ekspedisi Resonansi Bahari, 
            Sea Lens berkolaborasi dengan komunitas lokal untuk mendokumentasikan 
            krisis pesisir yang selama ini luput dari sorotan media nasional.
          </p>
          <button 
            onClick={onComingSoon}
            className="bg-gray-900 text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-gray-800 transition flex items-center justify-center gap-2 w-full sm:w-fit"
          >
            Pelajari Lebih Lanjut <ArrowRight size={15} />
          </button>
        </motion.div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="lg:w-1/3 flex flex-col justify-center order-2 lg:order-1"
        >
          <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-teal-500 pl-4">
            Pencapaian Ekspedisi
          </motion.h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { icon: <Waves size={20} />, value: "3", label: "Lokasi Menyelam" },
              { icon: <Camera size={20} />, value: "120+", label: "Jam Rekaman" },
              { icon: <Users size={20} />, value: "40+", label: "Narasumber" },
              { icon: <BookOpen size={20} />, value: "12", label: "Artikel Terbit" },
            ].map((stat) => (
              <motion.div
                variants={fadeInUp}
                key={stat.label}
                className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100 hover:shadow-md transition"
              >
                <div className="text-teal-600 mb-3 bg-teal-100 w-fit p-2 rounded-lg">{stat.icon}</div>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">{stat.value}</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:min-h-[450px] order-1 lg:order-2"
        >
          {/* Gambar Besar Kiri */}
          <motion.div 
            variants={scaleIn}
            className="relative rounded-2xl overflow-hidden sm:row-span-2 group h-[250px] sm:h-full"
          >
            <img
              src={GALLERY_IMAGES[0].src}
              alt={GALLERY_IMAGES[0].caption}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-6">
              <p className="text-white font-bold text-lg sm:text-xl">{GALLERY_IMAGES[0].caption}</p>
              <p className="text-white/80 text-xs sm:text-sm flex items-center gap-1.5 mt-1">
                <MapPin size={14}/> {GALLERY_IMAGES[0].location}
              </p>
            </div>
          </motion.div>
          
          {/* Gambar Kecil Kanan Atas */}
          <motion.div 
            variants={scaleIn}
            className="relative rounded-2xl overflow-hidden h-[160px] sm:h-auto group"
          >
            <img
              src={GALLERY_IMAGES[1].src}
              alt={GALLERY_IMAGES[1].caption}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-5">
              <p className="text-white font-bold text-sm sm:text-base">{GALLERY_IMAGES[1].caption}</p>
            </div>
          </motion.div>

          {/* Gambar Kecil Kanan Bawah */}
          <motion.div 
            variants={scaleIn}
            className="relative rounded-2xl overflow-hidden h-[160px] sm:h-auto group"
          >
            <img
              src={GALLERY_IMAGES[2].src}
              alt={GALLERY_IMAGES[2].caption}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-5">
              <p className="text-white font-bold text-sm sm:text-base">{GALLERY_IMAGES[2].caption}</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="bg-gray-50 border-y border-gray-100 py-6 px-5 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
            <Waves size={12} className="text-white shrink-0" />
          </div>
          <span className="text-gray-600 font-medium whitespace-nowrap">Inisiatif Sea Lens</span>
        </div>
        <span className="text-gray-300 hidden sm:block">·</span>
        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-amber-400 fill-amber-400 shrink-0" />
          <span className="text-gray-600 font-medium whitespace-nowrap">200+ Pembaca Setia</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 font-medium text-center md:text-right">
        <span>Didukung komunitas lokal</span>
        <span className="hidden sm:block text-gray-300">·</span>
        <span>Kolaborasi nelayan Sumbar</span>
        <span className="hidden lg:block text-gray-300">·</span>
        <span className="hidden lg:block">Terverifikasi oleh LSM</span>
      </div>
    </motion.div>
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
    <section id="liputan" className="py-16 md:py-24 px-5 md:px-8 lg:px-12 bg-white">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 lg:mb-12"
      >
        <motion.div variants={fadeInUp} className="md:w-1/2">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-blue-700 text-xs font-semibold tracking-wide">
              Publikasi Terbaru 2026
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Hasil Liputan &amp; Temuan Sea Lens
          </h2>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="md:w-1/2">
          <p className="text-gray-600 text-base leading-relaxed md:text-justify">
            Kami menyajikan laporan mendalam dari lapangan yang didokumentasikan
            bersama komunitas pesisir Sumatera Barat. Baca investigasi terbaru dari 
            ekspedisi Resonansi Bahari yang membutuhkan perhatian segera.
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row gap-3 mb-8 items-start sm:items-center w-full"
      >
        <div className="flex gap-2 overflow-x-auto pb-2 flex-1 w-full hide-scrollbar snap-x">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`flex-shrink-0 snap-start px-5 py-2.5 rounded-full text-sm font-medium transition ${
                activeFilter === tab
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {(filtered.length > 0 ? filtered : REPORT_CARDS).map((card) => (
          <motion.div variants={fadeInUp} key={card.id}>
            <ReportCard card={card} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <button 
          onClick={onComingSoon}
          className="border border-gray-200 bg-white text-gray-700 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gray-50 hover:border-gray-300 shadow-sm transition flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          Lihat Semua Publikasi <ArrowRight size={16} />
        </button>
      </motion.div>
    </section>
  );
}

// REVISI: Menggunakan tag <Link> dari next/link agar kartu dapat diklik 
// dan mengarahkan ke halaman detail (menghapus properti onComingSoon).
function ReportCard({ card }: { card: ReportCard }) {
  return (
    <Link 
      href={`/liputan/${card.id}`}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 group cursor-pointer flex flex-col h-full block"
    >
      <div className="relative h-52 sm:h-56 overflow-hidden shrink-0">
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

      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <p className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-3">
          <MapPin size={13} className="text-teal-600 shrink-0" />
          <span className="truncate">{card.location}</span>
        </p>
        
        <div className="flex items-start justify-between gap-3 mb-4 flex-grow">
          <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-snug group-hover:text-teal-700 transition line-clamp-3">
            {card.title}
          </h3>
          <ExternalLink
            size={18}
            className="text-gray-300 group-hover:text-teal-500 shrink-0 mt-1 transition"
          />
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4 sm:pt-5 mt-auto">
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Calendar size={13} className="shrink-0" />
              {card.date}
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock size={13} className="shrink-0" />
              {card.readTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CtaSection({ onComingSoon }: { onComingSoon: () => void }) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gray-950 px-5">
      <motion.img
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1800&q=80"
        alt="Ocean"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 to-gray-950/90" />
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <motion.p 
          variants={fadeInUp}
          className="text-teal-400 text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-widest uppercase mb-4"
        >
          Bergabunglah Bersama Kami
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Suara Laut
          <br />
          Butuh Penceritanya
        </motion.h2>
        <motion.p 
          variants={fadeInUp}
          className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Daftarkan diri sebagai jurnalis komunitas, fotografer bawah laut, atau
          relawan riset lapangan. Bersama Sea Lens, mari kita ciptakan resonansi bahari 
          yang mampu mengangkat krisis ini ke permukaan.
        </motion.p>
        <motion.div 
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              onComingSoon();
            }}
            className="bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-teal-50 transition flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Daftar Sekarang <ArrowRight size={16} />
          </a>
          <a
            href="#tentang"
            className="border border-white/30 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 transition flex justify-center w-full sm:w-auto"
          >
            Pelajari Proyek
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer({ onComingSoon }: { onComingSoon: () => void }) {
  return (
    <footer className="bg-gray-950 text-white/50 py-10 px-5 md:px-8 lg:px-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white/5 border border-white/10">
            <img 
              src="/images/logo_sealens.png" 
              alt="Sea Lens Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white font-semibold text-sm">Sea Lens Project</span>
        </div>
        
        <p className="text-xs text-center order-3 md:order-2 px-4 md:px-0">
          © 2026 Sea Lens Project · Jurnalisme Partisipatif Ekosistem Laut Sumatera Barat
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs order-2 md:order-3">
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleComingSoon = () => setIsPopupOpen(true);

  return (
    <main className="font-sans antialiased bg-white text-gray-900 relative overflow-x-hidden">
      <ComingSoonPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <div className="relative">
        <Navbar onComingSoon={handleComingSoon} />
        <HeroSection />
      </div>

      <div className="relative z-20">
        <FilterBar onComingSoon={handleComingSoon} />
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-6">
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