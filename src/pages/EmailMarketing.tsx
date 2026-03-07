import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Mail, Plus, Send, Eye, MousePointer, Clock, Users, MoreHorizontal, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: "rascunho" | "agendada" | "enviada" | "ativa";
  recipients: number;
  sent: number;
  opened: number;
  clicked: number;
  scheduledAt?: string;
  sentAt?: string;
}

const mockCampaigns: Campaign[] = [
  { id: "1", name: "Black Friday 2026", subject: "🔥 Ofertas imperdíveis - até 70% OFF", status: "enviada", recipients: 12500, sent: 12340, opened: 5280, clicked: 1890, sentAt: "01/03/2026" },
  { id: "2", name: "Newsletter Março", subject: "As novidades do mês que você precisa saber", status: "ativa", recipients: 8900, sent: 8750, opened: 3920, clicked: 1240, sentAt: "05/03/2026" },
  { id: "3", name: "Lançamento Produto X", subject: "🚀 Chegou! Conheça o novo Produto X", status: "agendada", recipients: 15000, sent: 0, opened: 0, clicked: 0, scheduledAt: "10/03/2026" },
  { id: "4", name: "Re-engajamento", subject: "Sentimos sua falta! Volte e ganhe 20% OFF", status: "rascunho", recipients: 3200, sent: 0, opened: 0, clicked: 0 },
  { id: "5", name: "Onboarding Novos", subject: "Bem-vindo! Aqui está tudo que você precisa", status: "enviada", recipients: 2100, sent: 2080, opened: 1560, clicked: 890, sentAt: "28/02/2026" },
];

const statusColors: Record<string, string> = {
  rascunho: "bg-muted text-muted-foreground",
  agendada: "bg-blue-100 text-blue-700",
  enviada: "bg-green-100 text-green-700",
  ativa: "bg-purple-100 text-purple-700",
};

const statusLabels: Record<string, string> = {
  rascunho: "Rascunho",
  agendada: "Agendada",
  enviada: "Enviada",
  ativa: "Ativa",
};

const templates = [
  { id: "t1", name: "Promoção", preview: "🎉 Template de promoção com CTA", color: "hsl(340 82% 52%)" },
  { id: "t2", name: "Newsletter", preview: "📰 Layout editorial com seções", color: "hsl(262 83% 58%)" },
  { id: "t3", name: "Boas-vindas", preview: "👋 Onboarding de novos clientes", color: "hsl(199 89% 48%)" },
  { id: "t4", name: "Transacional", preview: "📦 Confirmação e atualizações", color: "hsl(142 70% 45%)" },
];

const EmailMarketing = () => {
  const [activeNav, setActiveNav] = useState("email");
  const [tab, setTab] = useState<"campanhas" | "templates">("campanhas");

  const totalSent = mockCampaigns.reduce((s, c) => s + c.sent, 0);
  const totalOpened = mockCampaigns.reduce((s, c) => s + c.opened, 0);
  const avgOpenRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : "0";

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar activeItem={activeNav} onItemClick={setActiveNav} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">E-mail Marketing</h1>
            <p className="text-xs text-muted-foreground">{mockCampaigns.length} campanhas · Taxa de abertura média: {avgOpenRate}%</p>
          </div>
          <Button size="sm" className="gap-1.5 h-8 text-xs">
            <Plus size={13} />
            Nova Campanha
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 p-6 pb-0">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <Send size={18} className="mx-auto mb-1 text-primary" />
            <p className="text-xl font-display font-bold text-foreground">{totalSent.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">E-mails Enviados</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <Eye size={18} className="mx-auto mb-1 text-secondary" />
            <p className="text-xl font-display font-bold text-foreground">{avgOpenRate}%</p>
            <p className="text-[10px] text-muted-foreground">Taxa de Abertura</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <MousePointer size={18} className="mx-auto mb-1 text-accent" />
            <p className="text-xl font-display font-bold text-foreground">{mockCampaigns.reduce((s, c) => s + c.clicked, 0).toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Cliques Totais</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <Users size={18} className="mx-auto mb-1" style={{ color: "hsl(142 70% 45%)" }} />
            <p className="text-xl font-display font-bold text-foreground">{mockCampaigns.reduce((s, c) => s + c.recipients, 0).toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Contatos Alcançados</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 px-6 pt-4">
          <button onClick={() => setTab("campanhas")} className={`text-xs font-medium pb-2 border-b-2 transition-colors ${tab === "campanhas" ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}>
            Campanhas
          </button>
          <button onClick={() => setTab("templates")} className={`text-xs font-medium pb-2 border-b-2 transition-colors ${tab === "templates" ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}>
            Templates
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {tab === "campanhas" ? (
            <div className="space-y-3">
              {mockCampaigns.map((campaign) => (
                <div key={campaign.id} className="rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-elevated transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                        <Mail size={18} className="text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-semibold text-sm text-foreground">{campaign.name}</h3>
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[campaign.status]}`}>
                            {statusLabels[campaign.status]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{campaign.subject}</p>
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={16} /></button>
                  </div>
                  {campaign.sent > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-3 pt-3 border-t border-border/50">
                      <div className="text-center">
                        <p className="text-sm font-bold text-foreground">{campaign.sent.toLocaleString()}</p>
                        <p className="text-[9px] text-muted-foreground">Enviados</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-foreground">{((campaign.opened / campaign.sent) * 100).toFixed(1)}%</p>
                        <p className="text-[9px] text-muted-foreground">Abertos</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-foreground">{((campaign.clicked / campaign.sent) * 100).toFixed(1)}%</p>
                        <p className="text-[9px] text-muted-foreground">Cliques</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-muted-foreground">{campaign.sentAt}</p>
                        <p className="text-[9px] text-muted-foreground">Data</p>
                      </div>
                    </div>
                  )}
                  {campaign.scheduledAt && campaign.status === "agendada" && (
                    <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                      <Clock size={12} /> Agendada para {campaign.scheduledAt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {templates.map((tpl) => (
                <div key={tpl.id} className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-all cursor-pointer">
                  <div className="h-32 rounded-lg mb-3 flex items-center justify-center" style={{ background: `${tpl.color}15` }}>
                    <FileText size={32} style={{ color: tpl.color }} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground">{tpl.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{tpl.preview}</p>
                  <Button variant="outline" size="sm" className="w-full mt-3 text-xs h-8">Usar Template</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailMarketing;
