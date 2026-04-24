import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Waves } from "lucide-react";

// Data Dummy Berita (Nanti bisa diganti dengan fetch API/Database)
const ARTICLES_DB: Record<string, any> = {
  "1": {
    title: "Pemutihan Karang Mentawai Semakin Kritis",
    category: "Krisis Iklim",
    date: "12 Agustus 2026",
    readTime: "8 Min Read",
    location: "Kepulauan Mentawai, Sumatera Barat",
    author: "Tim Jurnalis Sea Lens",
    heroImage: "/images/pemutihan_karang.png",
    content: [
      "Kepulauan Mentawai yang dikenal dengan surga ombak bagi para peselancar dunia kini menghadapi ancaman serius di bawah permukaan laut. Pemutihan terumbu karang (coral bleaching) massal dilaporkan terjadi di beberapa titik penyelaman utama akibat lonjakan suhu permukaan laut yang ekstrem selama enam bulan terakhir.",
      "Tim ekspedisi Sea Lens Project bersama kelompok nelayan setempat melakukan penyelaman di area Sikakap dan Siberut. Hasilnya sangat memprihatinkan. Lebih dari 60% luasan karang yang sebelumnya berwarna-warni kini berubah menjadi putih pucat, menandakan matinya alga simbiotik yang memberi mereka kehidupan.",
      "Fenomena ini tidak hanya berdampak pada keindahan bawah laut, tetapi juga langsung memukul ekonomi nelayan tradisional. 'Ikan karang jauh berkurang, kami harus melaut lebih ke tengah, yang butuh lebih banyak bahan bakar,' ungkap Daud (45), salah satu nelayan lokal yang ikut serta dalam ekspedisi ini.",
    ]
  },
  "2": {
    title: "Abrasi Pantai Padang Mengancam Pemukiman",
    category: "Abrasi",
    date: "5 Agustus 2026",
    readTime: "5 Min Read",
    location: "Kota Padang, Sumatera Barat",
    author: "Tim Jurnalis Sea Lens",
    heroImage: "/images/abrasi_pantai.png",
    content: [
      "Garis pantai di sepanjang kawasan Pasir Jambak hingga Muaro Lasak, Kota Padang, terus mengalami kemunduran akibat abrasi ombak laut. Dalam lima tahun terakhir, diperkirakan garis pantai mundur hingga 15 meter, mengancam langsung puluhan rumah warga yang berada di pesisir.",
      "Cuaca ekstrem dan gelombang tinggi yang semakin sering terjadi memperparah kondisi ini. Tanggul penahan ombak yang dibangun secara swadaya oleh masyarakat setempat seringkali hancur diterjang kuatnya arus Samudera Hindia.",
      "Pakar oseanografi dari Universitas lokal menekankan perlunya intervensi struktural yang lebih kuat sekaligus penanaman mangrove kembali (reforestasi) di area muara untuk meredam energi gelombang sebelum mencapai pemukiman warga."
    ]
  },
  "3": {
    title: "Tumpukan Sampah Plastik di Pesisir Selatan",
    category: "Polusi",
    date: "28 Juli 2026",
    readTime: "6 Min Read",
    location: "Pesisir Selatan, Sumatera Barat",
    author: "Tim Jurnalis Sea Lens",
    heroImage: "/images/sampah_pesisir.png",
    content: [
      "Kawasan Pesisir Selatan yang dikenal dengan keindahan pantainya kini menghadapi musuh yang tak terlihat dari jauh: sampah plastik. Ribuan ton sampah plastik mikro dan makro terus menumpuk di sepanjang garis pantai, terbawa oleh arus laut dan sungai yang bermuara ke pesisir.",
      "Investigasi Sea Lens menunjukkan bahwa sebagian besar sampah ini terdiri dari kemasan sekali pakai, jaring nelayan yang rusak, dan botol plastik. Sampah-sampah ini tidak hanya merusak pemandangan, tetapi juga tertelan oleh fauna laut, termasuk penyu yang sering bermigrasi ke area ini.",
      "Komunitas peduli lingkungan setempat mulai melakukan aksi bersih pantai mingguan, namun mereka menyadari bahwa ini hanyalah solusi hilir. Kebijakan pembatasan plastik sekali pakai di wilayah hulu menjadi sangat krusial untuk memutus rantai polusi ini."
    ]
  }
};

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const article = ARTICLES_DB[params.id];

  // Jika ID artikel tidak ditemukan
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <h1 className="text-2xl font-bold">Artikel tidak ditemukan</h1>
        <Link href="/" className="text-teal-600 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <main className="font-sans antialiased bg-white text-gray-900 min-h-screen">
      {/* NAVBAR SIMPLE (Solid Background) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 bg-gray-950 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition">
            <img src="/images/logo_sealens.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-white font-semibold text-sm md:text-base tracking-wide">
            Sea Lens
          </span>
        </Link>
        <Link href="/" className="text-white/70 hover:text-white text-sm font-medium flex items-center gap-2 transition">
          <ArrowLeft size={16} /> <span className="hidden sm:inline">Kembali</span>
        </Link>
      </nav>

      {/* ARTICLE HERO SECTION */}
      <header className="relative w-full h-[60vh] min-h-[400px] mt-16">
        <img 
          src={article.heroImage} 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:px-32 xl:px-48 max-w-7xl mx-auto">
          <div className="inline-block bg-teal-500 text-gray-950 text-xs font-bold px-3 py-1.5 rounded-md shadow-sm mb-4">
            {article.category}
          </div>
          <h1 
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight md:leading-tight mb-6 max-w-4xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-xs md:text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-teal-400" /> {article.date}
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-teal-400" /> {article.readTime}
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-teal-400" /> {article.location}
            </span>
          </div>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100">
              <Waves size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Ditulis oleh</p>
              <p className="text-xs text-gray-500">{article.author}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-teal-600 text-sm font-medium transition bg-gray-50 hover:bg-teal-50 px-4 py-2 rounded-full border border-gray-200">
            <Share2 size={16} /> <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>

        <div className="prose prose-lg md:prose-xl prose-gray max-w-none">
          {article.content.map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg text-justify">
              {index === 0 && (
                <span className="float-left text-5xl md:text-6xl font-black text-gray-900 mr-3 mt-1" style={{ fontFamily: "'Georgia', serif" }}>
                  {paragraph.charAt(0)}
                </span>
              )}
              {index === 0 ? paragraph.substring(1) : paragraph}
            </p>
          ))}
        </div>

        {/* GAMBAR TAMBAHAN (Hanya Contoh Desain) */}
        <div className="grid grid-cols-2 gap-4 mt-12 mb-8">
          <img src="/images/nelayan.png" alt="Dokumentasi 1" className="rounded-2xl w-full h-48 md:h-64 object-cover" />
          <img src="/images/og-image.png" alt="Dokumentasi 2" className="rounded-2xl w-full h-48 md:h-64 object-cover" />
        </div>
        <p className="text-xs text-center text-gray-400 italic mb-16">
          Dokumentasi lapangan oleh Jurnalis Komunitas Sea Lens Project (2026)
        </p>
      </article>

      {/* FOOTER SIMPLE */}
      <footer className="bg-gray-950 text-white/50 py-10 px-6 border-t border-white/10 text-center">
        <p className="text-xs">
          © 2026 Sea Lens Project · Jurnalisme Partisipatif Ekosistem Laut Sumatera Barat
        </p>
      </footer>
    </main>
  );
}