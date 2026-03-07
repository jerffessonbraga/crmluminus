import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { ConversationList } from "@/components/ConversationList";
import { ChatArea } from "@/components/ChatArea";
import { ContactPanel } from "@/components/ContactPanel";
import { EmptyChat } from "@/components/EmptyChat";
import { mockConversations } from "@/lib/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [activeNav, setActiveNav] = useState("inbox");
  const [selectedConvId, setSelectedConvId] = useState<string | undefined>();
  const [showContact, setShowContact] = useState(true);
  const isMobile = useIsMobile();

  const selectedConv = mockConversations.find((c) => c.id === selectedConvId);

  // Mobile: show either list or chat, not both
  if (isMobile) {
    return (
      <div className="flex h-screen flex-col overflow-hidden">
        <AppSidebar activeItem={activeNav} onItemClick={setActiveNav} />
        {selectedConv ? (
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Mobile back button in chat header */}
            <div className="flex items-center gap-2 border-b border-border bg-card px-3 py-2">
              <button onClick={() => setSelectedConvId(undefined)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
                <ArrowLeft size={20} />
              </button>
              <span className="text-sm font-display font-bold text-card-foreground">{selectedConv.contact.name}</span>
            </div>
            <ChatArea conversation={selectedConv} />
          </div>
        ) : (
          <div className="flex-1 overflow-hidden pt-14">
            <ConversationList
              conversations={mockConversations}
              selectedId={selectedConvId}
              onSelect={(id) => {
                setSelectedConvId(id);
                setShowContact(true);
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar activeItem={activeNav} onItemClick={setActiveNav} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 flex-shrink-0">
          <ConversationList
            conversations={mockConversations}
            selectedId={selectedConvId}
            onSelect={(id) => {
              setSelectedConvId(id);
              setShowContact(true);
            }}
          />
        </div>
        <div className="flex flex-1 overflow-hidden">
          {selectedConv ? (
            <>
              <div className="flex-1">
                <ChatArea conversation={selectedConv} />
              </div>
              {showContact && (
                <ContactPanel conversation={selectedConv} onClose={() => setShowContact(false)} />
              )}
            </>
          ) : (
            <EmptyChat />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
