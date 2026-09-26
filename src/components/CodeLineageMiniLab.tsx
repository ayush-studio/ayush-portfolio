"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "./Toast";

interface PresetNode {
  id: string;
  name: string;
  type: "entry" | "component" | "service" | "util" | "api";
  x: number;
  y: number;
  dependencies: string[];
}

interface Preset {
  id: string;
  label: string;
  description: string;
  parseTime: string;
  tokenCount: number;
  nodes: PresetNode[];
  mermaidCode: string;
}

const PRESETS: Preset[] = [
  {
    id: "nextjs",
    label: "Next.js App Router (Full-Stack)",
    description: "App router page with Server Actions, Client components, and deterministic API pipeline.",
    parseTime: "3.8ms",
    tokenCount: 1420,
    nodes: [
      { id: "layout", name: "app/layout.tsx", type: "entry", x: 40, y: 30, dependencies: ["navbar", "globals"] },
      { id: "page", name: "app/page.tsx", type: "entry", x: 40, y: 110, dependencies: ["hero", "scannerApi"] },
      { id: "hero", name: "components/Hero.tsx", type: "component", x: 230, y: 60, dependencies: ["toast", "data"] },
      { id: "scannerApi", name: "api/scan/route.ts", type: "api", x: 230, y: 150, dependencies: ["astParser", "dag"] },
      { id: "navbar", name: "components/Navbar.tsx", type: "component", x: 230, y: 20, dependencies: ["data"] },
      { id: "globals", name: "styles/globals.css", type: "util", x: 420, y: 10, dependencies: [] },
      { id: "toast", name: "components/Toast.tsx", type: "component", x: 420, y: 60, dependencies: [] },
      { id: "data", name: "data/config.ts", type: "util", x: 420, y: 100, dependencies: [] },
      { id: "astParser", name: "lib/ast-tokenizer.ts", type: "service", x: 420, y: 140, dependencies: [] },
      { id: "dag", name: "lib/dag-lineage.ts", type: "service", x: 420, y: 180, dependencies: [] },
    ],
    mermaidCode: `graph TD
  Layout["app/layout.tsx"] --> Navbar["components/Navbar.tsx"]
  Layout --> Globals["styles/globals.css"]
  Page["app/page.tsx"] --> Hero["components/Hero.tsx"]
  Page --> ScanApi["api/scan/route.ts"]
  Hero --> Toast["components/Toast.tsx"]
  Hero --> Data["data/config.ts"]
  ScanApi --> AST["lib/ast-tokenizer.ts"]
  ScanApi --> DAG["lib/dag-lineage.ts"]`,
  },
  {
    id: "genai",
    label: "FastAPI + GenAI Healthcare Bot",
    description: "Enterprise healthcare LLM translation service with streaming SQL translation.",
    parseTime: "4.4ms",
    tokenCount: 2180,
    nodes: [
      { id: "main", name: "main.py (FastAPI)", type: "entry", x: 40, y: 60, dependencies: ["chatRouter", "auth"] },
      { id: "auth", name: "core/security.py", type: "util", x: 230, y: 20, dependencies: [] },
      { id: "chatRouter", name: "routers/chat.py", type: "api", x: 230, y: 110, dependencies: ["nlpEngine", "sqlGen"] },
      { id: "nlpEngine", name: "services/nlp_parser.py", type: "service", x: 420, y: 70, dependencies: ["vectorDb"] },
      { id: "sqlGen", name: "services/sql_synthesizer.py", type: "service", x: 420, y: 140, dependencies: ["schemaValidator"] },
      { id: "vectorDb", name: "db/vector_store.py", type: "util", x: 580, y: 70, dependencies: [] },
      { id: "schemaValidator", name: "models/schema.py", type: "util", x: 580, y: 140, dependencies: [] },
    ],
    mermaidCode: `graph TD
  Main["main.py"] --> Auth["core/security.py"]
  Main --> Chat["routers/chat.py"]
  Chat --> NLP["services/nlp_parser.py"]
  Chat --> SQL["services/sql_synthesizer.py"]
  NLP --> VectorDB["db/vector_store.py"]
  SQL --> Schema["models/schema.py"]`,
  },
  {
    id: "signals",
    label: "Angular 17 Signals Store (Nexus Forge)",
    description: "Fine-grained reactive signals state machine for e-commerce cart & 3D checkout.",
    parseTime: "2.9ms",
    tokenCount: 960,
    nodes: [
      { id: "app", name: "app.component.ts", type: "entry", x: 40, y: 70, dependencies: ["cartState", "catalog"] },
      { id: "cartState", name: "stores/cart.signal.ts", type: "service", x: 230, y: 40, dependencies: ["checkout3d"] },
      { id: "catalog", name: "components/catalog.ts", type: "component", x: 230, y: 120, dependencies: ["gameCard"] },
      { id: "checkout3d", name: "components/checkout-flip.ts", type: "component", x: 420, y: 40, dependencies: ["canvasScratch"] },
      { id: "gameCard", name: "components/game-card.ts", type: "component", x: 420, y: 120, dependencies: [] },
      { id: "canvasScratch", name: "widgets/scratch-reveal.ts", type: "util", x: 580, y: 40, dependencies: [] },
    ],
    mermaidCode: `graph TD
  App["app.component.ts"] --> CartStore["stores/cart.signal.ts"]
  App --> Catalog["components/catalog.ts"]
  CartStore --> Checkout3D["components/checkout-flip.ts"]
  Catalog --> GameCard["components/game-card.ts"]
  Checkout3D --> CanvasScratch["widgets/scratch-reveal.ts"]`,
  },
];

export default function CodeLineageMiniLab() {
  const { showToast } = useToast();
  const [selectedPresetId, setSelectedPresetId] = useState("nextjs");
  const [activeTab, setActiveTab] = useState<"graph" | "mermaid">("graph");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("page");
  const [copiedCode, setCopiedCode] = useState(false);

  const preset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const handleCopyMermaid = () => {
    navigator.clipboard.writeText(preset.mermaidCode);
    setCopiedCode(true);
    showToast("Mermaid diagram syntax copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const selectedNode = preset.nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="rounded-2xl glass border border-[var(--border-color)] overflow-hidden bg-[var(--bg-secondary)]/80 mt-6 shadow-xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/40 gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--accent)]">
            LIVE MINI-LAB // Deterministic AST Lineage Engine
          </span>
        </div>

        {/* View Switcher: Graph vs Mermaid */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg glass border border-[var(--border-color)] text-xs font-mono">
          <button
            onClick={() => setActiveTab("graph")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "graph"
                ? "bg-[var(--accent)] text-white font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Interactive Graph
          </button>
          <button
            onClick={() => setActiveTab("mermaid")}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "mermaid"
                ? "bg-[var(--accent)] text-white font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Mermaid AST
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap items-center gap-2 px-4 sm:px-6 py-3 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/20">
        <span className="text-xs font-mono text-[var(--text-secondary)] mr-1">Select Architecture:</span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPresetId(p.id);
              setSelectedNodeId(p.nodes[0]?.id || null);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedPresetId === p.id
                ? "bg-[var(--accent)]/15 border border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Live Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 sm:px-6 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/10 text-xs font-mono">
        <div>
          <span className="text-[var(--text-secondary)]">Parse Latency: </span>
          <span className="text-emerald-400 font-bold">{preset.parseTime}</span>
        </div>
        <div>
          <span className="text-[var(--text-secondary)]">AST Tokens: </span>
          <span className="text-indigo-400 font-bold">{preset.tokenCount}</span>
        </div>
        <div>
          <span className="text-[var(--text-secondary)]">LLM Token Cost: </span>
          <span className="text-emerald-400 font-bold">$0.0000</span>
        </div>
        <div>
          <span className="text-[var(--text-secondary)]">Cyclic Coupling: </span>
          <span className="text-amber-400 font-bold">0 (Clean DAG)</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-4 sm:p-6 min-h-[260px] relative flex flex-col justify-center">
        {activeTab === "graph" ? (
          <div>
            {/* SVG Interactive Canvas */}
            <div className="relative w-full h-[220px] overflow-x-auto overflow-y-hidden rounded-xl bg-[var(--bg-primary)]/40 border border-[var(--border-color)]/60 flex items-center justify-center p-2">
              <svg className="w-full h-full min-w-[620px]" viewBox="0 0 650 210">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 3, 0 6" fill="var(--accent)" opacity="0.6" />
                  </marker>
                </defs>

                {/* Connecting lines */}
                {preset.nodes.map((source) =>
                  source.dependencies.map((targetId) => {
                    const target = preset.nodes.find((n) => n.id === targetId);
                    if (!target) return null;
                    const isConnected =
                      selectedNodeId === source.id || selectedNodeId === target.id;

                    return (
                      <g key={`${source.id}-${target.id}`}>
                        <line
                          x1={source.x + 50}
                          y1={source.y + 12}
                          x2={target.x}
                          y2={target.y + 12}
                          stroke={isConnected ? "var(--accent)" : "var(--border-color)"}
                          strokeWidth={isConnected ? 2 : 1}
                          strokeDasharray={isConnected ? "4 2" : "none"}
                          markerEnd="url(#arrowhead)"
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })
                )}

                {/* Nodes */}
                {preset.nodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer"
                    >
                      <rect
                        x={node.x}
                        y={node.y}
                        width="110"
                        height="26"
                        rx="6"
                        fill={
                          isSelected
                            ? "var(--accent)"
                            : node.type === "entry"
                            ? "rgba(99, 102, 241, 0.15)"
                            : "rgba(255, 255, 255, 0.05)"
                        }
                        stroke={isSelected ? "var(--accent)" : "var(--border-color)"}
                        strokeWidth={isSelected ? "1.5" : "1"}
                        className="transition-all duration-200 hover:brightness-125"
                      />
                      <text
                        x={node.x + 8}
                        y={node.y + 17}
                        fill={isSelected ? "#ffffff" : "var(--text-primary)"}
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight={isSelected ? "bold" : "normal"}
                      >
                        {node.name.length > 15 ? node.name.slice(0, 14) + "…" : node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Node Details Bar */}
            {selectedNode && (
              <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-mono text-[var(--text-secondary)] px-2">
                <span>
                  Selected: <strong className="text-[var(--text-primary)]">{selectedNode.name}</strong> ({selectedNode.type})
                </span>
                <span>
                  Outgoing dependencies:{" "}
                  <strong className="text-[var(--accent)]">
                    {selectedNode.dependencies.length > 0
                      ? selectedNode.dependencies.join(", ")
                      : "None (Leaf Node)"}
                  </strong>
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Mermaid Code View */
          <div className="relative">
            <pre className="p-4 rounded-xl bg-[var(--bg-primary)]/80 border border-[var(--border-color)] font-mono text-xs text-[var(--accent)] overflow-x-auto leading-relaxed">
              <code>{preset.mermaidCode}</code>
            </pre>
            <button
              onClick={handleCopyMermaid}
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono glass border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
            >
              {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedCode ? "Copied" : "Copy Mermaid"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
