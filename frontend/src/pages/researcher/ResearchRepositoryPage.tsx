import React, { useState } from 'react';
import { Plus, FileText, Brain, FlaskConical, Link2 } from 'lucide-react';

export const ResearchRepositoryPage = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  return (
    <div className="h-screen flex bg-forest-950 text-text-primary">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r border-forest-divider bg-forest-900 p-4">
        <h2 className="font-serif text-lg mb-4">Research Repository</h2>

        <NavItem icon={FileText} label="Papers" />
        <NavItem icon={Brain} label="Ideas" />
        <NavItem icon={FlaskConical} label="Experiments" />
        <NavItem icon={Link2} label="Clues & Evidence" />

        <button className="mt-6 w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-black text-sm">
          <Plus size={14} /> New Node
        </button>
      </aside>

      {/* CENTER CANVAS */}
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#2f3e35_1px,transparent_0)] bg-[size:32px_32px]" />

        {/* Example nodes */}
        <CanvasNode
          title="Hypothesis"
          content="Misinformation spreads faster in polarized networks"
          x={200}
          y={150}
          onClick={() => setSelectedNode('hypothesis')}
        />

        <CanvasNode
          title="Evidence"
          content="Dataset A shows 23% faster diffusion"
          x={500}
          y={320}
          onClick={() => setSelectedNode('evidence')}
        />
      </main>

      {/* RIGHT PANEL */}
      <aside className="w-80 border-l border-forest-divider bg-forest-900 p-4">
        <h3 className="font-serif text-md mb-3">Node Details</h3>

        {selectedNode ? (
          <>
            <Field label="Title" value="Hypothesis" />
            <Field label="Status" value="Testing" />
            <Field label="Confidence" value="Medium" />
            <Field label="Tags" value="misinformation, networks" />

            <textarea
              className="mt-4 w-full bg-forest-800 border border-forest-divider rounded-lg p-2 text-sm"
              placeholder="Private research notes…"
            />
          </>
        ) : (
          <p className="text-text-muted text-sm">
            Select a node to view details
          </p>
        )}
      </aside>
    </div>
  );
};

/* ---------- COMPONENTS ---------- */

const NavItem = ({ icon: Icon, label }: any) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-forest-800 cursor-pointer text-sm">
    <Icon size={14} /> {label}
  </div>
);

const CanvasNode = ({ title, content, x, y, onClick }: any) => (
  <div
    onClick={onClick}
    style={{ left: x, top: y }}
    className="absolute w-56 p-3 rounded-xl bg-forest-800 border border-forest-divider cursor-pointer shadow-lg"
  >
    <h4 className="text-sm font-semibold">{title}</h4>
    <p className="text-xs text-text-muted mt-1">{content}</p>
  </div>
);

const Field = ({ label, value }: any) => (
  <div className="mb-2">
    <p className="text-[10px] uppercase text-text-muted">{label}</p>
    <p className="text-sm">{value}</p>
  </div>
);
