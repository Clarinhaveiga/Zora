import { useState, useEffect } from "react";
import Navbar, { Language } from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import ConceptSection from "./components/ConceptSection";
import ImageGallery, { ArtImage, ART_IMAGES } from "./components/ImageGallery";
import ProductPreview from "./components/ProductPreview";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, X, Trash2, Star } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<Language>("EN");
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedImage, setSelectedImage] = useState<ArtImage | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorActive, setIsCursorActive] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setIsCursorActive(true);
    const handleMouseUp = () => setIsCursorActive(false);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Simple SPA routing effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalCart = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-sand selection:bg-neon-orange selection:text-white cursor-none">
      <div className="noise-bg" />
      <div 
        className={`custom-cursor hidden md:block ${isCursorActive ? 'custom-cursor-active' : ''}`}
        style={{ left: cursorPos.x, top: cursorPos.y, transform: `translate(-50%, -50%) ${isCursorActive ? 'scale(3)' : 'scale(1)'}` }}
      />

      <Navbar 
        lang={lang} 
        setLang={setLang} 
        cartCount={cart.length} 
        onNavigate={(page) => {
          if (page === "cart") setIsCartOpen(true);
          else setCurrentPage(page);
        }} 
      />

      <div className="pt-[85px]"> {/* Space for fixed navbar */}
        {/* Ticker Section */}
        <div className="bg-ink text-white py-4 overflow-hidden border-y-2 border-ink">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-sm font-bold tracking-[0.2em] mx-12 flex items-center gap-4">
                {lang === "EN" ? "ART FOR EVERYONE ★ WORLDWIDE SHIPPING ★ NEW COLLECTION OUT NOW" : "ARTE PARA TODOS ★ ENVIO MUNDIAL ★ NOVA COLEÇÃO DISPONÍVEL"}
                <span className="mx-4">★</span>
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero lang={lang} onExplore={() => setCurrentPage("images")} />
              <CategoryGrid lang={lang} onSelectCategory={() => setCurrentPage("images")} />
              <ConceptSection lang={lang} />
              <ImageGallery lang={lang} onSelectImage={setSelectedImage} />
              
              {/* Best Sellers Section */}
              <section className="py-24 px-6 bg-sand border-y-[3px] border-ink relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-end justify-between mb-16">
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">
                      {lang === "EN" ? "BEST SELLERS" : "MAIS VENDIDOS"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[ART_IMAGES[0], ART_IMAGES[1], ART_IMAGES[2]].map((img, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -10 }}
                        className="group cursor-pointer dopamine-card p-6" 
                        onClick={() => setSelectedImage(img)}
                      >
                        <div className="aspect-[3/4] overflow-hidden rounded-[30px] mb-6 border-[3px] border-ink shadow-[6px_6px_0px_0px_rgba(42,26,20,0.05)] group-hover:shadow-[10px_10px_0px_0px_rgba(42,26,20,1)] transition-all duration-500">
                          <img 
                            src={img.url} 
                            alt={img.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold tracking-tight">{img.title} Poster</h3>
                            <p className="text-ink/40 text-[10px] tracking-widest mt-1 uppercase font-bold italic">by {img.artist}</p>
                          </div>
                          <div className="bg-neon-orange text-white border-[3px] border-ink px-4 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(42,26,20,1)]">
                            <p className="text-sm font-bold">$45.00</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

        {currentPage === "images" && (
          <motion.div
            key="images"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24"
          >
            <ImageGallery lang={lang} onSelectImage={setSelectedImage} />
          </motion.div>
        )}

        {currentPage === "shop" && (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24 px-6 max-w-7xl mx-auto text-center"
          >
            <h1 className="text-6xl font-bold tracking-tighter mb-8">SHOP ALL</h1>
            <CategoryGrid lang={lang} onSelectCategory={() => setCurrentPage("images")} />
          </motion.div>
        )}

        {currentPage === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24 px-6 max-w-3xl mx-auto"
          >
            <h1 className="text-6xl font-bold tracking-tighter mb-12">WE ARE ZORA.</h1>
            <div className="space-y-8 text-xl leading-relaxed font-light text-ink/70">
              <p>
                {lang === "EN" 
                  ? "Zora is a contemporary design platform born from the desire to bring art into everyday objects." 
                  : "Zora é uma plataforma de design contemporâneo nascida do desejo de trazer arte para objetos do dia a dia."}
              </p>
              <p>
                {lang === "EN"
                  ? "We curate images from independent artists and apply them to high-quality decorative pieces. Every item is printed on demand, ensuring sustainability and uniqueness."
                  : "Fazemos a curadoria de imagens de artistas independentes e as aplicamos em peças decorativas de alta qualidade. Cada item é impresso sob demanda, garantindo sustentabilidade e exclusividade."}
              </p>
              <div className="pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Studio" 
                  className="w-full rounded-3xl grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer lang={lang} />

      {/* Product Preview Modal */}
      <ProductPreview 
        lang={lang} 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
        onAddToCart={addToCart}
      />

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[150]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[160] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-ink/5 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tighter">CART</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-ink/5 rounded-full"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-ink/30">
                    <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
                    <p className="text-xs font-bold tracking-widest uppercase">YOUR CART IS EMPTY</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-ink/5 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold tracking-tight">{item.title}</h4>
                        <p className="text-[10px] text-ink/40 uppercase tracking-widest mt-1">{item.type}</p>
                        <p className="text-sm font-bold mt-2">${item.price}.00</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-ink/20 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-ink/5 bg-white">
                  <div className="flex items-end justify-between mb-8">
                    <span className="text-[10px] font-bold tracking-widest uppercase">SUBTOTAL</span>
                    <span className="text-3xl font-bold font-display">${totalCart}.00</span>
                  </div>
                  <button className="w-full py-5 bg-neon-orange text-white rounded-[15px] border-[3px] border-ink font-bold tracking-widest text-xs shadow-[6px_6px_0px_0px_rgba(42,26,20,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(42,26,20,1)] transition-all">
                    CHECKOUT
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
