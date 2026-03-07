import { Conversation, Channel } from "@/lib/mockData";
import { ChannelBadge } from "./ChannelBadge";
import { Search, Filter, Inbox, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

type StatusFilter = "all" | "open" | "pending" | "resolved";
type ChannelFilter = "all" | Channel;

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");

  const filtered = conversations.filter((c) => {
    const matchSearch = c.contact.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchChannel = channelFilter === "all" || c.contact.channel === channelFilter;
    return matchSearch && matchStatus && matchChannel;
  });

  const statusTabs: { key: StatusFilter; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "Todas", icon: <Inbox size={14} /> },
    { key: "open", label: "Abertas", icon: <Inbox size={14} /> },
    { key: "pending", label: "Pendentes", icon: <Clock size={14} /> },
    { key: "resolved", label: "Resolvidas", icon: <CheckCircle2 size={14} /> },
  ];

  return (
    <div className="flex h-full flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h2 className="mb-3 text-lg font-display font-bold text-card-foreground">Conversas</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar conversas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 border-b border-border px-3 py-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === tab.key
                ? "gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Channel filter */}
      <div className="flex gap-1 border-b border-border px-3 py-2">
        {(["all", "whatsapp", "instagram", "messenger"] as ChannelFilter[]).map((ch) => (
          <button
            key={ch}
            onClick={() => setChannelFilter(ch)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
              channelFilter === ch ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            {ch === "all" ? "Todos" : ch === "whatsapp" ? "💬 WA" : ch === "instagram" ? "📸 IG" : "💭 MSG"}
          </button>
        ))}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`w-full border-b border-border px-4 py-3 text-left transition-colors animate-fade-in ${
              selectedId === conv.id ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/50"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                    {conv.contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground animate-pulse-dot">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold truncate ${conv.unreadCount > 0 ? "text-foreground" : "text-muted-foreground"}`}>
                      {conv.contact.name}
                    </span>
                    <ChannelBadge channel={conv.contact.channel} />
                  </div>
                  <p className={`mt-0.5 truncate text-xs ${conv.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
              <span className="flex-shrink-0 text-[11px] text-muted-foreground">{conv.lastMessageTime}</span>
            </div>
            {conv.tags && conv.tags.length > 0 && (
              <div className="mt-1.5 flex gap-1 pl-[52px]">
                {conv.tags.map((tag) => (
                  <span key={tag} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search size={32} className="mb-2 opacity-40" />
            <p className="text-sm">Nenhuma conversa encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
