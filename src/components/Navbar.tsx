import { motion } from "motion/react";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useState } from "react";

export type Language = "EN" | "PT";

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  cartCount: number;
  onNavigate: (page: string) => void;
}

export default function Navbar({ lang, setLang, cartCount, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: lang === "EN" ? "HOME" : "INÍCIO" },
    { id: "shop", label: lang === "EN" ? "SHOP" : "LOJA" },
    { id: "images", label: lang === "EN" ? "IMAGES" : "IMAGENS" },
    { id: "products", label: lang === "EN" ? "PRODUCTS" : "PRODUTOS" },
    { id: "about", label: lang === "EN" ? "ABOUT" : "SOBRE" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-sand px-[5%] py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <button 
          onClick={() => onNavigate("home")}
          className="text-2xl font-black tracking-tighter cursor-pointer relative"
        >
          ZORA
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-accent"></span>
        </button>
        
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-xs font-bold tracking-widest hover:text-neon-orange transition-colors cursor-pointer relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-orange transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-1 bg-white p-1 rounded-full border-2 border-ink">
          <button 
            onClick={() => setLang("PT")}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === "PT" ? "bg-ink text-white" : "text-ink/30 hover:text-ink"}`}
          >
            PT
          </button>
          <button 
            onClick={() => setLang("EN")}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === "EN" ? "bg-ink text-white" : "text-ink/30 hover:text-ink"}`}
          >
            EN
          </button>
        </div>

        <button 
          onClick={() => onNavigate("cart")}
          className="relative w-[45px] h-[45px] bg-white border-2 border-ink rounded-full shadow-[3px_3px_0px_0px_rgba(42,26,20,1)] flex items-center justify-center transition-all cursor-pointer group"
        >
          <ShoppingBag size={20} className="group-hover:text-neon-orange transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-neon-orange text-white text-[8px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-ink">
              {cartCount}
            </span>
          )}
        </button>

        <button 
          className="p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-sand border-b-[3px] border-ink p-6 flex flex-col gap-4 md:hidden shadow-xl"
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
              className="text-left text-lg font-display font-medium"
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-ink/5">
            <button onClick={() => setLang("PT")} className={lang === "PT" ? "font-bold" : "opacity-50"}>PT</button>
            <button onClick={() => setLang("EN")} className={lang === "EN" ? "font-bold" : "opacity-50"}>EN</button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
