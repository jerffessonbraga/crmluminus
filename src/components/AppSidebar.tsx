import { Inbox, Users, Bot, BarChart3, Settings, Zap, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "inbox", icon: Inbox, label: "Inbox", path: "/" },
  { id: "contacts", icon: Users, label: "CRM", path: "/crm" },
  { id: "automation", icon: Zap, label: "Automação", path: "#" },
  { id: "ai-agents", icon: Bot, label: "Agentes IA", path: "#" },
  { id: "analytics", icon: BarChart3, label: "Analytics", path: "#" },
];

const bottomItems = [
  { id: "settings", icon: Settings, label: "Configurações" },
];

export function AppSidebar({ activeItem, onItemClick }: AppSidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-16 flex-col items-center gradient-sidebar py-4">
      {/* Logo */}
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
        <MessageSquare size={20} className="text-primary-foreground" />
      </div>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onItemClick(item.id);
                if (item.path !== "#") navigate(item.path);
              }}
              title={item.label}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                isActive
                  ? "gradient-primary text-primary-foreground shadow-elevated"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon size={20} />
              <span className="pointer-events-none absolute left-14 z-50 hidden whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1 text-xs font-medium text-background group-hover:block">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="flex flex-col items-center gap-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              title={item.label}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Icon size={20} />
            </button>
          );
        })}
        <div className="mt-2 flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-xs font-bold text-sidebar-accent-foreground">
          OP
        </div>
      </div>
    </div>
  );
}
