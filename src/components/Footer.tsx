import { Language } from "./Navbar";
import { Instagram, Twitter, Facebook } from "lucide-react";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-sand border-t-[3px] border-ink py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-4xl font-bold tracking-tighter mb-6">ZORA</h2>
          <p className="text-ink/50 max-w-sm leading-relaxed">
            {lang === "EN" 
              ? "We believe in art as a daily experience. Objects that tell stories, colors that stimulate life." 
              : "Acreditamos na arte como uma experiência diária. Objetos que contam histórias, cores que estimulam a vida."}
          </p>
          <div className="flex gap-4 mt-8">
            <button className="p-2 hover:bg-ink/5 rounded-full transition-colors"><Instagram size={20} /></button>
            <button className="p-2 hover:bg-ink/5 rounded-full transition-colors"><Twitter size={20} /></button>
            <button className="p-2 hover:bg-ink/5 rounded-full transition-colors"><Facebook size={20} /></button>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6">{lang === "EN" ? "SHOP" : "LOJA"}</h4>
          <ul className="space-y-4 text-sm text-ink/60">
            <li><button className="hover:text-ink transition-colors">Posters</button></li>
            <li><button className="hover:text-ink transition-colors">Cangas</button></li>
            <li><button className="hover:text-ink transition-colors">T-shirts</button></li>
            <li><button className="hover:text-ink transition-colors">Tiles</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6">{lang === "EN" ? "SUPPORT" : "SUPORTE"}</h4>
          <ul className="space-y-4 text-sm text-ink/60">
            <li><button className="hover:text-ink transition-colors">{lang === "EN" ? "About" : "Sobre"}</button></li>
            <li><button className="hover:text-ink transition-colors">{lang === "EN" ? "Shipping" : "Envio"}</button></li>
            <li><button className="hover:text-ink transition-colors">{lang === "EN" ? "Returns" : "Devoluções"}</button></li>
            <li><button className="hover:text-ink transition-colors">{lang === "EN" ? "Contact" : "Contato"}</button></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-ink/30 tracking-widest uppercase">© 2026 ZORA'S THINGS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 text-[10px] text-ink/30 tracking-widest uppercase">
          <button className="hover:text-ink">PRIVACY</button>
          <button className="hover:text-ink">TERMS</button>
        </div>
      </div>
    </footer>
  );
}
