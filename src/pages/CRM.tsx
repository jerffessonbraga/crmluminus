import { useState, useCallback } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { PipelineColumn } from "@/components/crm/PipelineColumn";
import { LeadDetailPanel } from "@/components/crm/LeadDetailPanel";
import { Lead, defaultStages, mockLeads } from "@/lib/crmData";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const CRM = () => {
  const [activeNav, setActiveNav] = useState("contacts");
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();

  const handleDragStart = useCallback((e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("leadId", leadId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("leadId");
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: stageId } : l))
    );
    setSelectedLead((prev) => (prev?.id === leadId ? { ...prev, stage: stageId } : prev));
  }, []);

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company?.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = leads.reduce((sum, l) => sum + l.value, 0);
  const totalLeads = leads.length;

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar activeItem={activeNav} onItemClick={setActiveNav} />
      <div className={`flex flex-1 flex-col overflow-hidden ${isMobile ? "pt-14" : ""}`}>
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border bg-card px-4 py-3">
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">Gestão Comercial</h1>
            <p className="text-xs text-muted-foreground">
              {totalLeads} leads · R$ {totalValue.toLocaleString("pt-BR")} no pipeline
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full sm:w-48 rounded-lg border border-input bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
              <Filter size={13} />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
            <Button size="sm" className="gap-1.5 h-8 text-xs">
              <Plus size={13} />
              <span className="hidden sm:inline">Novo Lead</span>
            </Button>
          </div>
        </div>

        {/* Stats bar - scrollable on mobile */}
        <div className="flex items-center gap-4 border-b border-border bg-card/50 px-4 py-2 overflow-x-auto">
          {defaultStages.slice(0, -1).map((stage) => {
            const count = filteredLeads.filter((l) => l.stage === stage.id).length;
            const value = filteredLeads.filter((l) => l.stage === stage.id).reduce((s, l) => s + l.value, 0);
            return (
              <div key={stage.id} className="flex items-center gap-1.5 flex-shrink-0">
                <div className="h-2 w-2 rounded-full" style={{ background: stage.color }} />
                <span className="text-[10px] text-muted-foreground">{stage.name}:</span>
                <span className="text-[10px] font-bold text-foreground">{count}</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] font-semibold text-foreground">R$ {value.toLocaleString("pt-BR")}</span>
              </div>
            );
          })}
        </div>

        {/* Pipeline */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex gap-3 p-4 overflow-x-auto flex-1">
            {defaultStages.map((stage) => (
              <PipelineColumn
                key={stage.id}
                stage={stage}
                leads={filteredLeads.filter((l) => l.stage === stage.id)}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onLeadClick={setSelectedLead}
              />
            ))}
          </div>
          {selectedLead && !isMobile && (
            <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
          )}
        </div>

        {/* Mobile lead detail as overlay */}
        {selectedLead && isMobile && (
          <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setSelectedLead(null)}>
            <div className="absolute right-0 top-0 h-full w-[85vw] max-w-sm" onClick={(e) => e.stopPropagation()}>
              <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRM;
