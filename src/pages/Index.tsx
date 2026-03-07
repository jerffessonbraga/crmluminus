import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { ConversationList } from "@/components/ConversationList";
import { ChatArea } from "@/components/ChatArea";
import { ContactPanel } from "@/components/ContactPanel";
import { EmptyChat } from "@/components/EmptyChat";
import { mockConversations } from "@/lib/mockData";

const Index = () => {
  const [activeNav, setActiveNav] = useState("inbox");
  const [selectedConvId, setSelectedConvId] = useState<string | undefined>();
  const [showContact, setShowContact] = useState(true);

  const selectedConv = mockConversations.find((c) => c.id === selectedConvId);

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
