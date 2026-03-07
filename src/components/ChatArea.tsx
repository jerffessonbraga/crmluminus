import { Conversation, Message, mockMessages } from "@/lib/mockData";
import { ChannelBadge } from "./ChannelBadge";
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatAreaProps {
  conversation: Conversation;
}

export function ChatArea({ conversation }: ChatAreaProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages[conversation.id] || []);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(mockMessages[conversation.id] || []);
  }, [conversation.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      conversationId: conversation.id,
      content: input,
      direction: "outgoing",
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
            {conversation.contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-display font-bold text-card-foreground">{conversation.contact.name}</h3>
              <ChannelBadge channel={conversation.contact.channel} size="md" />
            </div>
            <p className="text-xs text-muted-foreground">
              {conversation.contact.phone || `via ${conversation.contact.channel}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Phone size={18} />
          </button>
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Video size={18} />
          </button>
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Bot size={18} />
          </button>
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="mx-auto max-w-2xl space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex animate-fade-in ${msg.direction === "outgoing" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.direction === "outgoing"
                    ? "gradient-primary text-primary-foreground rounded-br-md"
                    : "bg-card text-card-foreground shadow-card rounded-bl-md"
                }`}
              >
                <p>{msg.content}</p>
                <p
                  className={`mt-1 text-[10px] text-right ${
                    msg.direction === "outgoing" ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-card px-5 py-3">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Paperclip size={20} />
          </button>
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Smile size={20} />
          </button>
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Digite sua mensagem..."
              rows={1}
              className="w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
