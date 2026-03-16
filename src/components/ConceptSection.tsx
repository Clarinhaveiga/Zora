import { motion } from "motion/react";
import { Language } from "./Navbar";

interface ConceptSectionProps {
  lang: Language;
}

export default function ConceptSection({ lang }: ConceptSectionProps) {
  const steps = [
    {
      num: "01",
      title: lang === "EN" ? "Choose an image" : "Escolha uma imagem",
      desc: lang === "EN" ? "Browse our curated gallery of contemporary art." : "Navegue por nossa galeria curada de arte contemporânea.",
      color: "text-neon-orange",
      bg: "bg-neon-orange/5"
    },
    {
      num: "02",
      title: lang === "EN" ? "Apply it to an object" : "Aplique em um objeto",
      desc: lang === "EN" ? "Select your canvas: posters, fabrics, or tiles." : "Selecione sua tela: posters, tecidos ou azulejos.",
      color: "text-electric-blue",
      bg: "bg-electric-blue/5"
    },
    {
      num: "03",
      title: lang === "EN" ? "Receive art" : "Receba arte",
      desc: lang === "EN" ? "We print and ship your unique piece worldwide." : "Nós imprimimos e enviamos sua peça única para todo o mundo.",
      color: "text-acid-green",
      bg: "bg-acid-green/5"
    }
  ];

  return (
    <section className="py-32 bg-sand overflow-hidden border-y-[3px] border-ink relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            {lang === "EN" ? "HOW IT WORKS" : "COMO FUNCIONA"}
          </h2>
          <div className="w-24 h-2 bg-ink mx-auto rounded-full dopamine-gradient"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`relative p-12 dopamine-card group ${step.bg}`}
            >
              <span className={`text-9xl font-bold font-display opacity-10 absolute -top-10 -right-4 ${step.color} group-hover:opacity-30 transition-opacity`}>
                {step.num}
              </span>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl ${step.color} bg-white border-[3px] border-ink shadow-[4px_4px_0px_0px_rgba(42,26,20,1)] flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform`}>
                  <span className="text-2xl font-bold">{step.num}</span>
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-4">{step.title}</h3>
                <p className="text-ink/60 text-lg leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
