import { motion } from "motion/react";
import { Language } from "./Navbar";
import { Star, Heart, Zap, Smile } from "lucide-react";

interface CategoryGridProps {
  lang: Language;
  onSelectCategory: (cat: string) => void;
}

export default function CategoryGrid({ lang, onSelectCategory }: CategoryGridProps) {
  const categories = [
    { 
      id: "posters", 
      name: lang === "EN" ? "POSTERS" : "POSTERS", 
      img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800",
      color: "bg-neon-orange",
      size: "md:col-span-2 md:row-span-2",
      icon: <Star className="text-neon-orange" size={40} />
    },
    { 
      id: "cangas", 
      name: lang === "EN" ? "CANGAS" : "CANGAS", 
      img: "https://images.unsplash.com/photo-1520923179270-ee0e7949732e?auto=format&fit=crop&q=80&w=800",
      color: "bg-electric-blue",
      size: "md:col-span-1 md:row-span-1",
      icon: <Heart className="text-electric-blue" size={32} />
    },
    { 
      id: "tshirts", 
      name: lang === "EN" ? "T-SHIRTS" : "CAMISETAS", 
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
      color: "bg-acid-green",
      size: "md:col-span-1 md:row-span-2",
      icon: <Zap className="text-acid-green" size={32} />
    },
    { 
      id: "tiles", 
      name: lang === "EN" ? "TILES" : "AZULEJOS", 
      img: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800",
      color: "bg-lavender",
      size: "md:col-span-1 md:row-span-1",
      icon: <Smile className="text-lavender" size={32} />
    }
  ];

  return (
    <section className="py-24 px-[5%] max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative overflow-hidden rounded-[40px] border-[3px] border-ink cursor-pointer aspect-[1/1.2] bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.05)]"
          >
            <img 
              src={cat.img} 
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            
            <div className="card-label">
              <h3 className="text-xl font-bold tracking-tighter mb-1">{cat.name}</h3>
              <span className="text-xs font-bold text-electric-blue uppercase tracking-widest">
                {lang === "EN" ? "EXPLORE" : "EXPLORAR"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
