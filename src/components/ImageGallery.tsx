import { motion } from "motion/react";
import { Language } from "./Navbar";
import { Plus } from "lucide-react";

export interface ArtImage {
  id: string;
  url: string;
  title: string;
  artist: string;
}

interface ImageGalleryProps {
  lang: Language;
  onSelectImage: (img: ArtImage) => void;
}

export const ART_IMAGES: ArtImage[] = [
  { id: "1", title: "Abstract Flow", artist: "Zora", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800" },
  { id: "2", title: "Neon Dreams", artist: "L. K.", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
  { id: "3", title: "Organic Shapes", artist: "M. Rossi", url: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800" },
  { id: "4", title: "Electric Void", artist: "Zora", url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800" },
  { id: "5", title: "Acid Garden", artist: "J. Doe", url: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=800" },
  { id: "6", title: "Minimal Wave", artist: "Zora", url: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800" },
  { id: "7", title: "Color Burst", artist: "A. Smith", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800" },
  { id: "8", title: "Future Retro", artist: "Zora", url: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80&w=800" },
];

export default function ImageGallery({ lang, onSelectImage }: ImageGalleryProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            {lang === "EN" ? "IMAGE BANK" : "BANCO DE IMAGENS"}
          </h2>
          <p className="text-ink/50 mt-4 tracking-widest text-xs uppercase">
            {lang === "EN" ? "Choose your art piece" : "Escolha sua peça de arte"}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="text-[10px] font-bold tracking-widest border-b-2 border-ink pb-1">ALL</button>
          <button className="text-[10px] font-bold tracking-widest text-ink/30 hover:text-ink pb-1">ABSTRACT</button>
          <button className="text-[10px] font-bold tracking-widest text-ink/30 hover:text-ink pb-1">MINIMAL</button>
          <button className="text-[10px] font-bold tracking-widest text-ink/30 hover:text-ink pb-1">VIBRANT</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {ART_IMAGES.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            onClick={() => onSelectImage(img)}
            className="group relative aspect-square bg-white border-[3px] border-ink rounded-[30px] overflow-hidden cursor-pointer shadow-[6px_6px_0px_rgba(42,26,20,0.05)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_rgba(42,26,20,1)] transition-all"
          >
            <img 
              src={img.url} 
              alt={img.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <Plus size={24} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-bold tracking-tight">{img.title}</p>
              <p className="text-white/60 text-[10px] tracking-widest uppercase">{img.artist}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
