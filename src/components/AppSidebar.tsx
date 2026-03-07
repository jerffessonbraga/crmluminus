import { Inbox, Users, Bot, BarChart3, Settings, Zap, MessageSquare, Mail, Share2, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "inbox", icon: Inbox, label: "Inbox", path: "/" },
  { id: "contacts", icon: Users, label: "CRM", path: "/crm" },
  { id: "automation", icon: Zap, label: "Automação", path: "/automation" },
  { id: "ai-agents", icon: Bot, label: "Agentes IA", path: "/ai-agents" },
  { id: "analytics", icon: BarChart3, label: "Analytics", path: "/analytics" },
  { id: "email", icon: Mail, label: "E-mail Marketing", path: "/email-marketing" },
  { id: "social", icon: Share2, label: "Social Media", path: "/social-media" },
];

const bottomItems = [
  { id: "settings", icon: Settings, label: "Configurações", path: "/settings" },
];

export function AppSidebar({ activeItem, onItemClick }: AppSidebarProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (item: typeof menuItems[0]) => {
    onItemClick(item.id);
    if (item.path !== "#") navigate(item.path);
    setMobileOpen(false);
  };

  // Mobile: hamburger trigger + overlay drawer
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-3 left-3 z-50 flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-elevated"
        >
          <Menu size={20} />
        </button>

        {mobileOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setMobileOpen(false)} />
            <div className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col gradient-sidebar py-4 px-3 animate-slide-in">
              <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                  <MessageSquare size={20} className="text-primary-foreground" />
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-sidebar-foreground">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                        isActive
                          ? "gradient-primary text-primary-foreground shadow-elevated"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-1">
                {bottomItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                <div className="mt-2 flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-xs font-bold text-sidebar-accent-foreground">
                  OP
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop: icon-only sidebar
  return (
    <div className="flex h-full w-16 flex-col items-center gradient-sidebar py-4 flex-shrink-0">
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
        <MessageSquare size={20} className="text-primary-foreground" />
      </div>
      <nav className="flex flex-1 flex-col items-center gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item)}
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
      <div className="flex flex-col items-center gap-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item)}
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
