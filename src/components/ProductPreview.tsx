import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingCart, Check } from "lucide-react";
import { Language } from "./Navbar";
import { ArtImage } from "./ImageGallery";
import { useState } from "react";

interface ProductPreviewProps {
  lang: Language;
  image: ArtImage | null;
  onClose: () => void;
  onAddToCart: (item: any) => void;
}

type ProductType = "poster" | "canga" | "tshirt" | "tile";

export default function ProductPreview({ lang, image, onClose, onAddToCart }: ProductPreviewProps) {
  const [selectedType, setSelectedType] = useState<ProductType>("poster");
  const [isAdded, setIsAdded] = useState(false);

  if (!image) return null;

  const products = [
    { id: "poster", label: lang === "EN" ? "POSTER" : "POSTER", price: 45 },
    { id: "canga", label: lang === "EN" ? "CANGA" : "CANGA", price: 89 },
    { id: "tshirt", label: lang === "EN" ? "T-SHIRT" : "CAMISETA", price: 65 },
    { id: "tile", label: lang === "EN" ? "TILE" : "AZULEJO", price: 35 },
  ];

  const handleAdd = () => {
    onAddToCart({
      id: `${image.id}-${selectedType}`,
      title: `${image.title} ${selectedType.toUpperCase()}`,
      price: products.find(p => p.id === selectedType)?.price || 0,
      image: image.url,
      type: selectedType
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" onClick={onClose}></div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-white rounded-[40px] border-[3px] border-ink overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto shadow-[20px_20px_0px_rgba(42,26,20,0.1)]"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 hover:bg-ink/5 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          {/* Preview Area */}
          <div className="flex-1 bg-sand flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="grid grid-cols-10 gap-4 w-full h-full">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border border-ink/10 aspect-square"></div>
                ))}
              </div>
            </div>

            <motion.div 
              key={selectedType}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 drop-shadow-2xl"
            >
              {selectedType === "poster" && (
                <div className="bg-white p-4 shadow-2xl border-[12px] border-ink">
                  <img src={image.url} alt="Poster" className="w-64 md:w-80 aspect-[3/4] object-cover" />
                </div>
              )}
              {selectedType === "canga" && (
                <div className="relative">
                  <img src={image.url} alt="Canga" className="w-80 md:w-[500px] aspect-[16/9] object-cover rounded-sm shadow-xl opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                </div>
              )}
              {selectedType === "tshirt" && (
                <div className="relative w-64 md:w-80 aspect-square flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800" alt="T-shirt base" className="absolute inset-0 w-full h-full object-contain opacity-20" />
                  <img src={image.url} alt="Print" className="w-32 md:w-40 aspect-square object-cover rounded-sm shadow-lg" />
                </div>
              )}
              {selectedType === "tile" && (
                <div className="bg-white p-1 shadow-xl rounded-sm border-4 border-white">
                  <img src={image.url} alt="Tile" className="w-48 md:w-64 aspect-square object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Controls Area */}
          <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-ink/40 mb-2 uppercase">
                {lang === "EN" ? "CUSTOMIZE YOUR OBJECT" : "PERSONALIZE SEU OBJETO"}
              </p>
              <h2 className="text-3xl font-bold tracking-tighter mb-1">{image.title}</h2>
              <p className="text-sm text-ink/50 mb-8 italic">by {image.artist}</p>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase mb-4 block">
                    {lang === "EN" ? "SELECT OBJECT" : "SELECIONE O OBJETO"}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {products.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedType(p.id as ProductType)}
                        className={`py-3 px-4 rounded-[15px] text-[10px] font-bold tracking-widest transition-all border-2 ${
                          selectedType === p.id 
                            ? "bg-ink text-white border-ink shadow-[4px_4px_0px_rgba(42,26,20,1)]" 
: "bg-white text-ink border-ink/10 hover:border-ink/30"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-ink/5">
                  <div className="flex items-end justify-between mb-8">
                    <span className="text-[10px] font-bold tracking-widest uppercase">TOTAL</span>
                    <span className="text-3xl font-bold font-display">
                      ${products.find(p => p.id === selectedType)?.price}.00
                    </span>
                  </div>

                  <button
                    onClick={handleAdd}
                    disabled={isAdded}
                    className={`w-full py-6 rounded-[15px] font-bold tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden relative group/btn border-[3px] border-ink ${
                      isAdded 
                        ? "bg-acid-green text-ink scale-95" 
                        : "bg-neon-orange text-white hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[6px_6px_0px_0px_rgba(42,26,20,1)] hover:shadow-[8px_8px_0px_0px_rgba(42,26,20,1)]"
                    }`}
                  >
                    {!isAdded && (
                      <div className="absolute inset-0 dopamine-gradient opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                      {isAdded ? (
                        <>
                          <Check size={18} />
                          {lang === "EN" ? "ADDED TO ART" : "ARTE ADICIONADA"}
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} />
                          {lang === "EN" ? "ADD TO CART" : "ADICIONAR AO CARRINHO"}
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[9px] text-ink/30 mt-8 leading-relaxed">
              {lang === "EN" 
                ? "High-quality sustainable printing. Worldwide shipping. Art is for everyone." 
                : "Impressão sustentável de alta qualidade. Envio mundial. Arte é para todos."}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
