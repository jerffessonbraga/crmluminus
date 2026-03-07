import { MessageSquare, Zap, Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function EmptyChat() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center bg-background px-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-elevated"
      >
        <MessageSquare size={36} className="text-primary-foreground" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-2 text-xl font-display font-bold text-foreground"
      >
        Central de Atendimento
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-8 max-w-sm text-sm text-muted-foreground"
      >
        Selecione uma conversa para começar a atender seus clientes via WhatsApp, Instagram e Messenger.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="grid grid-cols-2 gap-3"
      >
        <div className="flex items-center gap-2 rounded-xl bg-card p-3 shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-whatsapp/10">
            <Zap size={16} className="text-whatsapp" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-card-foreground">Automação</p>
            <p className="text-[10px] text-muted-foreground">Respostas rápidas</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-card p-3 shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bot size={16} className="text-primary" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-card-foreground">Agentes IA</p>
            <p className="text-[10px] text-muted-foreground">Atendimento 24/7</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-medium text-primary"
      >
        <Sparkles size={14} />
        Agentes IA disponíveis para ajudar
      </motion.div>
    </div>
  );
}
