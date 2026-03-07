import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { User, Bell, Shield, Palette, Globe, CreditCard, Users, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";

const settingsSections = [
  { id: "perfil", icon: User, label: "Perfil" },
  { id: "notificacoes", icon: Bell, label: "Notificações" },
  { id: "seguranca", icon: Shield, label: "Segurança" },
  { id: "aparencia", icon: Palette, label: "Aparência" },
  { id: "idioma", icon: Globe, label: "Idioma" },
  { id: "assinatura", icon: CreditCard, label: "Assinatura" },
  { id: "equipe", icon: Users, label: "Equipe" },
  { id: "integracoes", icon: Plug, label: "Integrações" },
];

const Settings = () => {
  const [activeNav, setActiveNav] = useState("settings");
  const [activeSection, setActiveSection] = useState("perfil");

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar activeItem={activeNav} onItemClick={setActiveNav} />
      <div className="flex flex-1 overflow-hidden">
        {/* Settings sidebar */}
        <div className="w-56 border-r border-border bg-card p-4">
          <h2 className="font-display font-bold text-foreground mb-4">Configurações</h2>
          <nav className="space-y-1">
            {settingsSections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-xs transition-colors ${activeSection === s.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <Icon size={14} />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeSection === "perfil" && (
            <div className="max-w-lg">
              <h1 className="font-display text-lg font-bold text-foreground mb-6">Perfil</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">OP</div>
                <div>
                  <p className="font-display font-semibold text-foreground">Operador Principal</p>
                  <p className="text-xs text-muted-foreground">operador@empresa.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Nome completo</label>
                  <input className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground" defaultValue="Operador Principal" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">E-mail</label>
                  <input className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground" defaultValue="operador@empresa.com" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">Telefone</label>
                  <input className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground" defaultValue="+55 11 99999-0000" />
                </div>
                <Button size="sm" className="text-xs h-8">Salvar Alterações</Button>
              </div>
            </div>
          )}
          {activeSection === "integracoes" && (
            <div className="max-w-lg">
              <h1 className="font-display text-lg font-bold text-foreground mb-6">Integrações</h1>
              <div className="space-y-3">
                {[
                  { name: "WhatsApp Business API", status: "Conectado", color: "hsl(142 70% 45%)" },
                  { name: "Instagram Graph API", status: "Conectado", color: "hsl(330 80% 55%)" },
                  { name: "Messenger Platform", status: "Pendente", color: "hsl(221 80% 55%)" },
                  { name: "Stripe", status: "Não conectado", color: "hsl(220 9% 46%)" },
                  { name: "Google Calendar", status: "Não conectado", color: "hsl(220 9% 46%)" },
                ].map((int) => (
                  <div key={int.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: int.color }}>
                        <Plug size={14} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{int.name}</p>
                        <p className={`text-[10px] ${int.status === "Conectado" ? "text-green-600" : "text-muted-foreground"}`}>{int.status}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      {int.status === "Conectado" ? "Configurar" : "Conectar"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection !== "perfil" && activeSection !== "integracoes" && (
            <div className="max-w-lg">
              <h1 className="font-display text-lg font-bold text-foreground mb-4">{settingsSections.find((s) => s.id === activeSection)?.label}</h1>
              <p className="text-sm text-muted-foreground">Esta seção será implementada em breve.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
