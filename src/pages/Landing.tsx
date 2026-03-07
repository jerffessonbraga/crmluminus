import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Inbox, Bot, Zap, BarChart3, Mail, Share2, Users, MessageSquare,
  CheckCircle2, ArrowRight, Star, Shield, Globe, Sparkles
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const features = [
  { icon: Inbox, title: "Inbox Unificada", desc: "WhatsApp, Instagram e Messenger em um só lugar. Nunca perca uma conversa." },
  { icon: Bot, title: "Agentes de IA", desc: "Chatbots inteligentes que atendem, qualificam leads e fecham vendas 24/7." },
  { icon: Zap, title: "Automações", desc: "Fluxos automatizados que economizam horas da sua equipe todos os dias." },
  { icon: Users, title: "CRM Integrado", desc: "Pipeline visual para acompanhar cada oportunidade do início ao fechamento." },
  { icon: Mail, title: "E-mail Marketing", desc: "Campanhas segmentadas com templates profissionais e métricas em tempo real." },
  { icon: BarChart3, title: "Analytics Avançado", desc: "Dashboards completos para tomar decisões baseadas em dados reais." },
];

const plans = [
  {
    name: "Starter",
    price: "R$ 197",
    period: "/mês",
    desc: "Ideal para pequenos negócios",
    features: ["Até 1.000 contatos", "2 canais integrados", "1 agente de IA", "Automações básicas", "Suporte por e-mail"],
    highlight: false,
  },
  {
    name: "Professional",
    price: "R$ 497",
    period: "/mês",
    desc: "Para equipes em crescimento",
    features: ["Até 10.000 contatos", "Todos os canais", "5 agentes de IA", "Automações avançadas", "CRM completo", "E-mail marketing", "Suporte prioritário"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Solução sob medida",
    features: ["Contatos ilimitados", "White label completo", "Agentes de IA ilimitados", "API dedicada", "Gerente de sucesso", "SLA garantido"],
    highlight: false,
  },
];

const testimonials = [
  { name: "Marina Silva", role: "CEO, TechBrand", text: "Triplicamos nossas conversões em 3 meses. A IA atende melhor que muitos humanos.", stars: 5 },
  { name: "Carlos Mendes", role: "Diretor, AgênciaX", text: "Nossos clientes adoraram o white label. Revendemos com nossa marca e margem de 60%.", stars: 5 },
  { name: "Ana Rodrigues", role: "Head de Growth, StartupY", text: "A inbox unificada mudou nosso atendimento. Resposta média caiu de 4h para 8 minutos.", stars: 5 },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary" />
            <span className="font-display text-xl font-bold text-foreground">Converso</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preços</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Depoimentos</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Entrar</Button>
            <Button size="sm" onClick={() => navigate("/signup")} className="gradient-primary border-0 text-primary-foreground">
              Começar grátis
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles size={14} /> Plataforma #1 em atendimento omnichannel
            </span>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="mt-8 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
          >
            Converta conversas em{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
              receita recorrente
            </span>
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Unifique WhatsApp, Instagram e Messenger. Automatize com IA. Venda mais — tudo em uma única plataforma white label.
          </motion.p>
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" onClick={() => navigate("/signup")} className="gradient-primary border-0 text-primary-foreground px-8 h-12 text-base">
              Começar grátis <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              Ver demonstração
            </Button>
          </motion.div>
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-primary" /> Sem cartão de crédito</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-primary" /> Setup em 5 minutos</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-primary" /> Suporte em português</span>
          </motion.div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-border bg-muted/30 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6">
          {["+2.500 empresas", "4.8M mensagens/mês", "99.9% uptime", "⭐ 4.9 no G2"].map((stat) => (
            <span key={stat} className="text-sm font-medium text-muted-foreground">{stat}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Tudo que você precisa para escalar</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Uma plataforma completa para atendimento, marketing e vendas — sem precisar de dezenas de ferramentas.</p>
          </motion.div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="group h-full border-border/50 bg-card shadow-card hover:shadow-elevated transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                      <f.icon size={22} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-32 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Planos que cabem no seu bolso</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Comece grátis. Escale conforme cresce. Cancele quando quiser.</p>
          </motion.div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className={`relative h-full border-border/50 ${plan.highlight ? "ring-2 ring-primary shadow-elevated" : "shadow-card"}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Mais popular
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <ul className="mt-8 space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2.5 text-sm">
                          <CheckCircle2 size={16} className="shrink-0 text-primary" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`mt-8 w-full ${plan.highlight ? "gradient-primary border-0 text-primary-foreground" : ""}`}
                      variant={plan.highlight ? "default" : "outline"}
                      onClick={() => navigate("/signup")}
                    >
                      {plan.name === "Enterprise" ? "Falar com vendas" : "Começar agora"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">O que nossos clientes dizem</h2>
          </motion.div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-border/50 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} size={16} className="fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="rounded-3xl gradient-primary p-12 md:p-20">
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                Pronto para transformar seu atendimento?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
                Junte-se a mais de 2.500 empresas que já usam o Converso para converter mais e atender melhor.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" onClick={() => navigate("/signup")} className="bg-background text-foreground hover:bg-background/90 h-12 px-8 text-base">
                  Começar grátis agora <ArrowRight size={18} />
                </Button>
              </div>
              <p className="mt-4 text-sm text-primary-foreground/60">Sem cartão de crédito • Cancele quando quiser</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md gradient-primary" />
            <span className="font-display text-sm font-bold">Converso</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Termos</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Contato</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Converso. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
