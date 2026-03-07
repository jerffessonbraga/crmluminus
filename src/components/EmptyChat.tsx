import { MessageSquare, Zap, Bot } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background px-8 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-elevated">
        <MessageSquare size={36} className="text-primary-foreground" />
      </div>
      <h2 className="mb-2 text-xl font-display font-bold text-foreground">Central de Atendimento</h2>
      <p className="mb-8 max-w-sm text-sm text-muted-foreground">
        Selecione uma conversa para começar a atender seus clientes via WhatsApp, Instagram e Messenger.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-card p-3 shadow-card">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-whatsapp/10">
            <Zap size={16} className="text-whatsapp" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-card-foreground">Automação</p>
            <p className="text-[10px] text-muted-foreground">Respostas rápidas</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-card p-3 shadow-card">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bot size={16} className="text-primary" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-card-foreground">Agentes IA</p>
            <p className="text-[10px] text-muted-foreground">Atendimento 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
