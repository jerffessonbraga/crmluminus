import { Conversation } from "@/lib/mockData";
import { ChannelBadge } from "./ChannelBadge";
import { User, Tag, Clock, MessageSquare, X } from "lucide-react";

interface ContactPanelProps {
  conversation: Conversation;
  onClose: () => void;
}

export function ContactPanel({ conversation, onClose }: ContactPanelProps) {
  const { contact } = conversation;

  return (
    <div className="flex h-full w-72 flex-col border-l border-border bg-card animate-slide-in">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-display font-bold text-card-foreground">Detalhes do Contato</h3>
        <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Avatar & name */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-xl font-bold text-primary-foreground mb-3">
            {contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <h4 className="font-display font-bold text-card-foreground">{contact.name}</h4>
          <ChannelBadge channel={contact.channel} size="md" />
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <User size={12} /> Informações
            </div>
            {contact.phone && <p className="text-sm text-card-foreground">{contact.phone}</p>}
            <p className="text-xs text-muted-foreground mt-1">Canal: {contact.channel}</p>
          </div>

          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Clock size={12} /> Status
            </div>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              conversation.status === "open" ? "bg-whatsapp/10 text-whatsapp" :
              conversation.status === "pending" ? "bg-secondary/10 text-secondary" :
              "bg-muted text-muted-foreground"
            }`}>
              {conversation.status === "open" ? "Aberta" : conversation.status === "pending" ? "Pendente" : "Resolvida"}
            </span>
          </div>

          {conversation.tags && conversation.tags.length > 0 && (
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Tag size={12} /> Tags
              </div>
              <div className="flex flex-wrap gap-1">
                {conversation.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <MessageSquare size={12} /> Ações Rápidas
            </div>
            <div className="mt-2 space-y-1.5">
              <button className="w-full rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                Atribuir Agente IA
              </button>
              <button className="w-full rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-accent hover:bg-accent/20 transition-colors">
                Encerrar Conversa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
