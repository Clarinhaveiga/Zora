import { motion } from "motion/react";
import { ArrowRight, Sparkles, Circle, Triangle, Square } from "lucide-react";
import { Language } from "./Navbar";

interface HeroProps {
  lang: Language;
  onExplore: () => void;
}

export default function Hero({ lang, onExplore }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-[5%]">
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-5 py-2 border-2 border-ink rounded-full font-bold text-xs uppercase mb-10 bg-white shadow-[4px_4px_0px_0px_rgba(42,26,20,1)]"
        >
          {lang === "EN" ? "✨ New Collection Out Now" : "✨ Nova Coleção Disponível"}
        </motion.div>

        <motion.h1 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[20vw] md:text-[80px] font-black tracking-tighter leading-none text-ink mb-2"
        >
          ZORA
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl font-bold tracking-[0.1em] text-electric-blue uppercase mb-10"
        >
          {lang === "EN" ? "Objects Printed with Art" : "Objetos Impressos com Arte"}
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          onClick={onExplore}
          className="btn-main"
        >
          {lang === "EN" ? "Explore Images" : "Explorar Imagens"}
        </motion.button>
      </div>
    </section>
  );
}
