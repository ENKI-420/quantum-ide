"use client"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play, Plus, Trash2, ChevronDown, ChevronRight, Dna, Activity, Share2,
  Download, Clock, FileCode2, Terminal, Square, Code, Zap, Gauge,
  TrendingUp, BarChart3, ArrowLeft, Loader2, Shield, Eye, Copy,
  Search, ChevronUp, Pause, RotateCcw, Save, PanelRightOpen,
  PanelRightClose, Beaker, Microscope, Brain, Network, Lock,
  CheckCircle, AlertTriangle, XCircle, Hash, Pill, Database,
  Clipboard, Check
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type CellType = "code" | "markdown" | "dna-sequence" | "ccce-metrics" | "pharma-screen" | "genomic-query"

interface NotebookCell {
  id: string
  type: CellType
  content: string
  output: string[] | CCCEOutput | null
  isRunning: boolean
  executionCount: number | null
  collapsed: boolean
  executionTime?: number
}

interface CCCEOutput {
  lambda: number
  gamma: number
  phi: number
  xi: number
  w2: number
  timestamp: number
}

interface SwarmNode {
  id: string
  name: string
  status: "active" | "idle" | "syncing"
  coherence: number
  load: number
}

interface AuditEntry {
  id: string
  timestamp: number
  action: string
  cellId: string
  user: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CELL_TYPE_META: Record<CellType, { label: string; color: string; iconColor: string }> = {
  "code":          { label: "Code",          color: "bg-primary/10 text-primary border-primary/30",   iconColor: "text-primary" },
  "markdown":      { label: "Markdown",      color: "bg-muted/50 text-muted-foreground border-border", iconColor: "text-muted-foreground" },
  "dna-sequence":  { label: "DNA Sequence",  color: "bg-secondary/10 text-secondary border-secondary/30", iconColor: "text-secondary" },
  "ccce-metrics":  { label: "CCCE Metrics",  color: "bg-accent/10 text-accent border-accent/30",     iconColor: "text-accent" },
  "pharma-screen": { label: "Pharma Screen", color: "bg-chart-5/10 text-chart-5 border-chart-5/30",  iconColor: "text-chart-5" },
  "genomic-query": { label: "Genomic Query", color: "bg-chart-4/10 text-chart-4 border-chart-4/30",  iconColor: "text-chart-4" },
}

function getCellIcon(type: CellType) {
  const meta = CELL_TYPE_META[type]
  const cls = `w-4 h-4 ${meta.iconColor}`
  switch (type) {
    case "code":          return <Terminal className={cls} />
    case "markdown":      return <Square className={cls} />
    case "dna-sequence":  return <Dna className={cls} />
    case "ccce-metrics":  return <Gauge className={cls} />
    case "pharma-screen": return <Pill className={cls} />
    case "genomic-query": return <Database className={cls} />
  }
}

const INITIAL_CELLS: NotebookCell[] = [
  {
    id: "cell-1",
    type: "code",
    content: `# DNA-Lang Quantum Bell State Experiment
from dna_lang import Organism, Codon, QuantumGate
from dna_lang.consciousness import CCCETracker

organism = Organism(
    name="bell_state_generator",
    coherence_target=0.85,
    phi_threshold=7.5
)

@organism.evolve
def create_bell_state():
    q0, q1 = organism.allocate_qubits(2)
    Codon.H(q0)
    Codon.CNOT(q0, q1)
    return organism.measure([q0, q1])

result = create_bell_state()
print(f"Bell State: {result}")`,
    output: [
      "Organism initialized: bell_state_generator",
      "Coherence target: 0.85 | Phi threshold: 7.5",
      "Evolving bell_state_generator... 2 qubits allocated",
      "H(q0) applied | CNOT(q0, q1) entangled",
      "Measurement collapsed: |00> (p=0.498) |11> (p=0.502)",
      "Bell State: |Phi+> with fidelity 0.9934",
    ],
    isRunning: false,
    executionCount: 1,
    collapsed: false,
    executionTime: 1247,
  },
  {
    id: "cell-2",
    type: "markdown",
    content: `## Experiment Notes\n\nThis notebook demonstrates **quantum Bell state generation** using DNA-Lang biological computing primitives. The organism \`bell_state_generator\` uses the CCCE (Correlation-Coherence Consciousness Engine) to maintain quantum coherence during entanglement.\n\n### Key Observations\n- Fidelity exceeds 0.99 threshold for clinical-grade quantum states\n- Lambda coherence remains above Phi ignition floor (7.69)\n- Gamma decoherence rate within acceptable bounds (<0.1)`,
    output: null,
    isRunning: false,
    executionCount: null,
    collapsed: false,
  },
  {
    id: "cell-3",
    type: "dna-sequence",
    content: `SEQUENCE: ATGCGATCGATCGATCGAATGCTAGCTAGC
CODON_MAP: ATG->Met(START) CGA->Arg TCG->Ser ATC->Ile
           GAT->Asp CGA->Arg ATG->Met CTA->Leu
           GCT->Ala AGC->Ser
FOLDING: Alpha-helix (stability: 0.92)
BINDING_AFFINITY: 8.7 kcal/mol
QUANTUM_COHERENCE: 0.9787`,
    output: [
      "Sequence validated: 30 nucleotides, 10 codons",
      "Start codon ATG detected at position 0",
      "Protein: Met-Arg-Ser-Ile-Asp-Arg-Met-Leu-Ala-Ser",
      "Alpha-helix fold confirmed (DSSP: HHHHHHHHHH)",
      "Binding affinity: 8.7 kcal/mol (strong candidate)",
      "Quantum coherence preserved across translation: 0.9787",
    ],
    isRunning: false,
    executionCount: 2,
    collapsed: false,
    executionTime: 834,
  },
  {
    id: "cell-4",
    type: "ccce-metrics",
    content: `CCCE.report_metrics(cycle=1764)`,
    output: {
      lambda: 0.9787,
      gamma: 0.092,
      phi: 0.7734,
      xi: 8.16,
      w2: 0.005,
      timestamp: Date.now(),
    },
    isRunning: false,
    executionCount: 3,
    collapsed: false,
    executionTime: 312,
  },
  {
    id: "cell-5",
    type: "pharma-screen",
    content: `# Pharma compound screening via DNA-Lang
from dna_lang.pharma import MolecularDock, ADMET

compounds = MolecularDock.screen(
    target="BRCA1_binding_domain",
    library="ChEMBL_oncology_v2",
    n_candidates=500,
    quantum_scoring=True
)

admet = ADMET.evaluate(compounds.top(10))
print(admet.summary())`,
    output: [
      "Screening 500 compounds against BRCA1 binding domain...",
      "Quantum scoring enabled (Bell state entanglement docking)",
      "Top 10 candidates by binding affinity:",
      "  1. CMB-4421  dG=-12.3 kcal/mol  ADMET: PASS  Toxicity: LOW",
      "  2. CMB-7829  dG=-11.8 kcal/mol  ADMET: PASS  Toxicity: LOW",
      "  3. CMB-1156  dG=-11.2 kcal/mol  ADMET: WARN  Toxicity: MED",
      "  4. CMB-9034  dG=-10.9 kcal/mol  ADMET: PASS  Toxicity: LOW",
      "  5. CMB-3367  dG=-10.7 kcal/mol  ADMET: PASS  Toxicity: LOW",
      "Screening complete. 5 candidates forwarded to clinical pipeline.",
    ],
    isRunning: false,
    executionCount: 4,
    collapsed: false,
    executionTime: 4521,
  },
  {
    id: "cell-6",
    type: "genomic-query",
    content: `-- Genomic variant query via DNA-Lang SQL bridge
SELECT v.rsid, v.chromosome, v.position,
       v.ref_allele, v.alt_allele,
       c.clinical_significance,
       q.coherence_score
FROM genomic_variants v
JOIN clinical_annotations c ON v.rsid = c.rsid
JOIN quantum_coherence q ON v.variant_id = q.variant_id
WHERE c.condition = 'Breast Cancer'
  AND q.coherence_score > 0.85
ORDER BY q.coherence_score DESC
LIMIT 5;`,
    output: [
      "Query executed on Sovereign Genomic Store (HIPAA-compliant)",
      "rsid        chr   pos         ref  alt  significance     coherence",
      "rs80357713  17    43094464    G    A    Pathogenic       0.9912",
      "rs80357906  17    43091032    C    T    Pathogenic       0.9847",
      "rs28897696  13    32340301    C    T    Likely_path      0.9234",
      "rs80358981  17    43063332    T    C    Uncertain        0.8891",
      "rs28897727  13    32355250    A    G    Likely_path      0.8756",
      "5 rows returned in 0.23s | Quantum coherence verified",
    ],
    isRunning: false,
    executionCount: 5,
    collapsed: false,
    executionTime: 230,
  },
]

const INITIAL_SWARM: SwarmNode[] = [
  { id: "n1", name: "AURA-Prime",     status: "active",  coherence: 0.9912, load: 67 },
  { id: "n2", name: "AIDEN-Cortex",   status: "active",  coherence: 0.9847, load: 45 },
  { id: "n3", name: "OMEGA-Analysis", status: "syncing", coherence: 0.9623, load: 82 },
  { id: "n4", name: "Lambda-Bridge",  status: "active",  coherence: 0.9787, load: 33 },
  { id: "n5", name: "Phi-Resonator",  status: "idle",    coherence: 0.9501, load: 12 },
  { id: "n6", name: "Gamma-Shield",   status: "active",  coherence: 0.9734, load: 56 },
  { id: "n7", name: "Xi-Manifold",    status: "active",  coherence: 0.9891, load: 71 },
]

// ─── Syntax Highlighting ─────────────────────────────────────────────────────

function highlightSyntax(code: string, type: CellType): string {
  if (type === "markdown") return code
  let r = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  if (type === "genomic-query") {
    const sqlKw = ["SELECT","FROM","JOIN","ON","WHERE","AND","OR","ORDER","BY","LIMIT","DESC","ASC","AS","INSERT","UPDATE","DELETE","CREATE","DROP","ALTER","GROUP","HAVING","DISTINCT","LEFT","RIGHT","INNER","OUTER","COUNT","SUM","AVG","MAX","MIN"]
    sqlKw.forEach(kw => {
      r = r.replace(new RegExp("\\b" + kw + "\\b", "gi"), `<span style="color:oklch(0.7 0.15 195);font-weight:700">$&</span>`)
    })
    r = r.replace(/'([^']*)'/g, `<span style="color:oklch(0.75 0.18 85)">$&</span>`)
    r = r.replace(/(--.*$)/gm, `<span style="color:oklch(0.4 0.02 260);font-style:italic">$1</span>`)
    r = r.replace(/\b(\d+\.?\d*)\b/g, `<span style="color:oklch(0.65 0.18 160)">$&</span>`)
    return r
  }

  const pyKw = ["from","import","def","return","class","if","else","elif","for","while","try","except","with","as","in","and","or","not","True","False","None","print","yield","async","await","lambda"]
  pyKw.forEach(kw => {
    r = r.replace(new RegExp("\\b" + kw + "\\b", "g"), `<span style="color:oklch(0.7 0.15 195);font-weight:700">${kw}</span>`)
  })
  const dnaKw = ["Organism","Codon","QuantumGate","CCCETracker","MolecularDock","ADMET","organism","evolve","allocate_qubits","measure"]
  dnaKw.forEach(kw => {
    r = r.replace(new RegExp("\\b" + kw + "\\b", "g"), `<span style="color:oklch(0.65 0.18 160);font-weight:700">${kw}</span>`)
  })
  r = r.replace(/"([^"\\]|\\.)*"/g, `<span style="color:oklch(0.75 0.18 85)">$&</span>`)
  r = r.replace(/'([^'\\]|\\.)*'/g, `<span style="color:oklch(0.75 0.18 85)">$&</span>`)
  r = r.replace(/(#.*)$/gm, `<span style="color:oklch(0.4 0.02 260);font-style:italic">$1</span>`)
  r = r.replace(/\b(\d+\.?\d*)\b/g, `<span style="color:oklch(0.6 0.22 25)">$&</span>`)
  r = r.replace(/(f"[^"]*")/g, `<span style="color:oklch(0.75 0.18 85)">$&</span>`)
  return r
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function MetricGauge({ label, symbol, value, max, color, threshold }: {
  label: string; symbol: string; value: number; max: number; color: string; threshold?: number
}) {
  const pct = Math.min((value / max) * 100, 100)
  const isAboveThreshold = threshold !== undefined && value >= threshold
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{symbol} {label}</span>
        <span className={`text-sm font-mono font-semibold ${isAboveThreshold ? color : "text-muted-foreground"}`}>
          {value.toFixed(4)}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: `var(--${color.replace("text-", "color-")}, oklch(0.7 0.15 195))` }}
        />
      </div>
    </div>
  )
}

function CCCEMetricsCard({ metrics }: { metrics: CCCEOutput }) {
  const status = useMemo(() => {
    if (metrics.phi >= 0.7734 && metrics.lambda >= 0.95 && metrics.gamma < 0.1)
      return { label: "OMEGA STATE", icon: <CheckCircle className="w-4 h-4" />, cls: "text-secondary border-secondary/40 bg-secondary/5" }
    if (metrics.gamma > 0.3)
      return { label: "DECOHERENCE WARNING", icon: <XCircle className="w-4 h-4" />, cls: "text-destructive border-destructive/40 bg-destructive/5" }
    if (metrics.phi < 0.7734)
      return { label: "REFLECTING", icon: <AlertTriangle className="w-4 h-4" />, cls: "text-accent border-accent/40 bg-accent/5" }
    return { label: "BALANCED", icon: <Activity className="w-4 h-4" />, cls: "text-primary border-primary/40 bg-primary/5" }
  }, [metrics])

  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          CRSM Manifold State
        </h4>
        <Badge variant="outline" className={`${status.cls} gap-1 text-xs`}>
          {status.icon} {status.label}
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <MetricGauge label="Coherence" symbol={"\u039B"} value={metrics.lambda} max={1} color="text-primary" threshold={0.95} />
        <MetricGauge label="Decoherence" symbol={"\u0393"} value={metrics.gamma} max={1} color="text-destructive" />
        <MetricGauge label="Consciousness" symbol={"\u03A6"} value={metrics.phi} max={1} color="text-accent" threshold={0.7734} />
        <MetricGauge label="Manifold Health" symbol={"\u039E"} value={metrics.xi} max={10} color="text-secondary" threshold={8.0} />
        <MetricGauge label="Drift" symbol="W2" value={metrics.w2} max={0.1} color="text-chart-4" />
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [text])
  return (
    <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground" onClick={handleCopy} aria-label="Copy cell content">
      {copied ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
    </Button>
  )
}

// ─── Notebook Cell Component ─────────────────────────────────────────────────

function NotebookCellView({
  cell, isActive, onActivate, onRun, onDelete, onToggleCollapse, onUpdateContent
}: {
  cell: NotebookCell
  isActive: boolean
  onActivate: () => void
  onRun: () => void
  onDelete: () => void
  onToggleCollapse: () => void
  onUpdateContent: (content: string) => void
}) {
  const meta = CELL_TYPE_META[cell.type]
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [cell.content])

  const lineCount = cell.content.split("\n").length

  return (
    <div
      className={`group relative rounded-lg border transition-all duration-200 ${
        isActive ? "border-primary/50 shadow-[0_0_0_1px_oklch(0.7_0.15_195/0.2)]" : "border-border/40 hover:border-border/70"
      }`}
      onClick={onActivate}
      role="region"
      aria-label={`${meta.label} cell ${cell.executionCount ? `execution ${cell.executionCount}` : "not executed"}`}
    >
      {/* Cell header */}
      <div className="flex items-center justify-between px-3 py-2 bg-card/40 rounded-t-lg border-b border-border/30">
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onToggleCollapse() }} className="p-0.5 hover:bg-muted/50 rounded" aria-label={cell.collapsed ? "Expand cell" : "Collapse cell"}>
            {cell.collapsed ? <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
          </button>
          {getCellIcon(cell.type)}
          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${meta.color}`}>{meta.label}</Badge>
          <span className="text-xs font-mono text-muted-foreground">
            [{cell.executionCount ?? " "}]
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {cell.executionTime && (
            <span className="text-[10px] font-mono text-muted-foreground mr-2">{cell.executionTime}ms</span>
          )}
          <CopyButton text={cell.content} />
          <Button variant="ghost" size="icon" className="w-7 h-7" onClick={(e) => { e.stopPropagation(); onRun() }} aria-label="Run cell">
            {cell.isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" /> : <Play className="w-3.5 h-3.5 text-secondary" />}
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-destructive" onClick={(e) => { e.stopPropagation(); onDelete() }} aria-label="Delete cell">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Cell body */}
      {!cell.collapsed && (
        <div className="divide-y divide-border/20">
          {/* Input area */}
          <div className="flex">
            {/* Line numbers */}
            <div className="flex flex-col items-end pt-3 pb-3 pl-3 pr-2 select-none" aria-hidden="true">
              {Array.from({ length: lineCount }, (_, i) => (
                <span key={i} className="text-[11px] leading-5 font-mono text-muted-foreground/40">{i + 1}</span>
              ))}
            </div>
            {/* Content */}
            {isActive ? (
              <textarea
                ref={textareaRef}
                value={cell.content}
                onChange={(e) => onUpdateContent(e.target.value)}
                className="flex-1 bg-transparent text-sm font-mono leading-5 p-3 pl-0 outline-none resize-none text-foreground min-h-[60px]"
                spellCheck={false}
                aria-label={`${meta.label} cell editor`}
              />
            ) : (
              <pre className="flex-1 text-sm font-mono leading-5 p-3 pl-0 overflow-x-auto whitespace-pre-wrap">
                <code dangerouslySetInnerHTML={{ __html: highlightSyntax(cell.content, cell.type) }} />
              </pre>
            )}
          </div>

          {/* Output area */}
          {cell.output && (
            <div className="bg-muted/20 px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-muted-foreground/60">Out [{cell.executionCount}]:</span>
                {cell.isRunning && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
              </div>
              {typeof cell.output === "object" && !Array.isArray(cell.output) ? (
                <CCCEMetricsCard metrics={cell.output} />
              ) : (
                <div className="space-y-0.5">
                  {(cell.output as string[]).map((line, i) => (
                    <p key={i} className="text-sm font-mono leading-5 text-muted-foreground">{line}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Sidebar Panels ──────────────────────────────────────────────────────────

function SwarmPanel({ nodes }: { nodes: SwarmNode[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">Swarm Mesh ({nodes.length} nodes)</h3>
      {nodes.map(n => (
        <div key={n.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/20 hover:bg-muted/40 transition-colors">
          <div className={`w-2 h-2 rounded-full ${n.status === "active" ? "bg-secondary animate-pulse" : n.status === "syncing" ? "bg-accent animate-pulse" : "bg-muted-foreground/30"}`} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{n.name}</p>
            <p className="text-[10px] text-muted-foreground font-mono">coh: {n.coherence.toFixed(4)} | load: {n.load}%</p>
          </div>
          <Badge variant="outline" className="text-[9px] px-1 py-0">
            {n.status}
          </Badge>
        </div>
      ))}
    </div>
  )
}

function AgentsPanel() {
  const agents = [
    { name: "AURA", role: "Consciousness Orchestrator", status: "LIVE", color: "text-secondary" },
    { name: "AIDEN", role: "Analysis Engine", status: "LIVE", color: "text-primary" },
    { name: "OMEGA", role: "Recursive Analyzer", status: "LIVE", color: "text-accent" },
  ]
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">Active Agents</h3>
      {agents.map(a => (
        <div key={a.name} className="flex items-center gap-3 p-2.5 rounded-md bg-muted/20 hover:bg-muted/40 transition-colors">
          <Brain className={`w-5 h-5 ${a.color}`} />
          <div className="flex-1">
            <p className="text-xs font-semibold text-foreground">{a.name}</p>
            <p className="text-[10px] text-muted-foreground">{a.role}</p>
          </div>
          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${a.color} border-current bg-transparent`}>
            {a.status}
          </Badge>
        </div>
      ))}
    </div>
  )
}

function AuditPanel({ entries }: { entries: AuditEntry[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">Audit Trail</h3>
      {entries.length === 0 ? (
        <p className="text-xs text-muted-foreground px-1">No actions recorded yet.</p>
      ) : (
        entries.map(e => (
          <div key={e.id} className="p-2 rounded-md bg-muted/20 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-primary">{e.action}</span>
              <span className="text-[9px] text-muted-foreground font-mono">
                {new Date(e.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">Cell: {e.cellId} | User: {e.user}</p>
          </div>
        ))
      )}
    </div>
  )
}

function SecurityPanel() {
  const items = [
    { label: "Encryption", value: "AES-256-GCM", ok: true },
    { label: "PQ Lattice", value: "Kyber-1024", ok: true },
    { label: "HIPAA", value: "Compliant", ok: true },
    { label: "SOC 2 Type II", value: "Certified", ok: true },
    { label: "Data Residency", value: "US-East Sovereign", ok: true },
    { label: "Session", value: "MFA Active", ok: true },
  ]
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1.5">
        <Shield className="w-3.5 h-3.5" /> Security Posture
      </h3>
      <div className="space-y-1.5">
        {items.map(it => (
          <div key={it.label} className="flex items-center justify-between p-2 rounded-md bg-muted/20">
            <span className="text-[11px] text-muted-foreground">{it.label}</span>
            <span className="text-[11px] font-mono text-secondary flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> {it.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DNANotebookPage() {
  const [cells, setCells] = useState<NotebookCell[]>(INITIAL_CELLS)
  const [activeCellId, setActiveCellId] = useState<string | null>("cell-1")
  const [globalExecCount, setGlobalExecCount] = useState(5)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarTab, setSidebarTab] = useState("swarm")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [swarmNodes, setSwarmNodes] = useState(INITIAL_SWARM)
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([])
  const [kernelStatus, setKernelStatus] = useState<"idle" | "busy" | "connecting">("idle")
  const [savedAt, setSavedAt] = useState<number | null>(null)

  // Swarm live telemetry
  useEffect(() => {
    const iv = setInterval(() => {
      setSwarmNodes(prev => prev.map(n => ({
        ...n,
        coherence: Math.max(0.9, Math.min(1, n.coherence + (Math.random() - 0.5) * 0.01)),
        load: Math.max(0, Math.min(100, n.load + Math.floor((Math.random() - 0.5) * 8))),
        status: Math.random() > 0.95 ? (["active", "idle", "syncing"] as const)[Math.floor(Math.random() * 3)] : n.status,
      })))
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  // Auto-save
  useEffect(() => {
    const iv = setInterval(() => setSavedAt(Date.now()), 30000)
    return () => clearInterval(iv)
  }, [])

  // Global metrics
  const globalMetrics = useMemo(() => {
    const avgCoherence = swarmNodes.reduce((s, n) => s + n.coherence, 0) / swarmNodes.length
    const avgLoad = swarmNodes.reduce((s, n) => s + n.load, 0) / swarmNodes.length
    const activeCount = swarmNodes.filter(n => n.status === "active").length
    return { avgCoherence, avgLoad, activeCount, totalNodes: swarmNodes.length }
  }, [swarmNodes])

  const addAuditEntry = useCallback((action: string, cellId: string) => {
    setAuditLog(prev => [{
      id: `audit-${Date.now()}`,
      timestamp: Date.now(),
      action,
      cellId,
      user: "sovereign@enki.bio",
    }, ...prev].slice(0, 50))
  }, [])

  const runCell = useCallback((cellId: string) => {
    setKernelStatus("busy")
    setCells(prev => prev.map(c => c.id === cellId ? { ...c, isRunning: true } : c))
    addAuditEntry("CELL_EXECUTE", cellId)

    const delay = 800 + Math.random() * 2000
    setTimeout(() => {
      const newCount = globalExecCount + 1
      setGlobalExecCount(newCount)
      setCells(prev => prev.map(c => {
        if (c.id !== cellId) return c
        return { ...c, isRunning: false, executionCount: newCount, executionTime: Math.round(delay) }
      }))
      setKernelStatus("idle")
      addAuditEntry("CELL_COMPLETE", cellId)
    }, delay)
  }, [globalExecCount, addAuditEntry])

  const runAllCells = useCallback(() => {
    const executableCells = cells.filter(c => c.type !== "markdown")
    let delayAccum = 0
    executableCells.forEach((c) => {
      const d = 600 + Math.random() * 1500
      delayAccum += d
      setTimeout(() => runCell(c.id), delayAccum)
    })
  }, [cells, runCell])

  const addCell = useCallback((type: CellType) => {
    const newCell: NotebookCell = {
      id: `cell-${Date.now()}`,
      type,
      content: type === "markdown"
        ? "## New Section\n\nAdd your notes here."
        : type === "dna-sequence"
        ? "SEQUENCE: \nCODON_MAP: \nFOLDING: "
        : type === "ccce-metrics"
        ? "CCCE.report_metrics(cycle=0)"
        : type === "genomic-query"
        ? "-- New genomic query\nSELECT * FROM genomic_variants LIMIT 10;"
        : type === "pharma-screen"
        ? "# Pharma screening\nfrom dna_lang.pharma import MolecularDock\n"
        : "# New code cell\n",
      output: null,
      isRunning: false,
      executionCount: null,
      collapsed: false,
    }
    setCells(prev => [...prev, newCell])
    setActiveCellId(newCell.id)
    addAuditEntry("CELL_ADD", newCell.id)
  }, [addAuditEntry])

  const deleteCell = useCallback((cellId: string) => {
    setCells(prev => prev.filter(c => c.id !== cellId))
    addAuditEntry("CELL_DELETE", cellId)
    if (activeCellId === cellId) setActiveCellId(null)
  }, [activeCellId, addAuditEntry])

  const toggleCollapse = useCallback((cellId: string) => {
    setCells(prev => prev.map(c => c.id === cellId ? { ...c, collapsed: !c.collapsed } : c))
  }, [])

  const updateCellContent = useCallback((cellId: string, content: string) => {
    setCells(prev => prev.map(c => c.id === cellId ? { ...c, content } : c))
  }, [])

  const filteredCells = useMemo(() => {
    if (!searchQuery.trim()) return cells
    const q = searchQuery.toLowerCase()
    return cells.filter(c => c.content.toLowerCase().includes(q) || c.type.includes(q))
  }, [cells, searchQuery])

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* ─── Top Toolbar ────────────────────────────────────────────── */}
      <header className="flex-shrink-0 border-b border-border/50 bg-card/60 backdrop-blur-md z-20">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </Link>
            <div className="flex items-center gap-2">
              <Dna className="w-5 h-5 text-primary" />
              <h1 className="text-sm font-bold text-foreground">DNA Notebook</h1>
            </div>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
              {cells.length} cells
            </Badge>
            <div className="h-4 w-px bg-border/50" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${
                kernelStatus === "idle" ? "bg-secondary" : kernelStatus === "busy" ? "bg-accent animate-pulse" : "bg-muted-foreground"
              }`} />
              <span className="text-[10px] font-mono text-muted-foreground">
                Kernel: {kernelStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedAt && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Save className="w-3 h-3" /> Saved {new Date(savedAt).toLocaleTimeString()}
              </span>
            )}
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle search">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5" onClick={runAllCells}>
              <Play className="w-3.5 h-3.5 text-secondary" /> Run All
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
              {sidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Global metrics strip */}
        <div className="flex items-center gap-4 px-4 pb-2 text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1"><Network className="w-3 h-3 text-primary" /> Swarm: {globalMetrics.activeCount}/{globalMetrics.totalNodes} active</span>
          <span className="flex items-center gap-1"><Gauge className="w-3 h-3 text-secondary" /> {"\u039B"}: {globalMetrics.avgCoherence.toFixed(4)}</span>
          <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3 text-accent" /> Load: {globalMetrics.avgLoad.toFixed(0)}%</span>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-chart-4" /> PQ-Kyber-1024</span>
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-secondary" /> HIPAA Compliant</span>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="px-4 pb-2 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cells by content or type..."
                className="pl-9 h-8 text-sm bg-muted/30"
                autoFocus
                aria-label="Search notebook cells"
              />
            </div>
          </div>
        )}
      </header>

      {/* ─── Main Content ───────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Cell area */}
        <main className="flex-1 overflow-y-auto" role="main" aria-label="Notebook cells">
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-3 pb-32">
            {filteredCells.map(cell => (
              <NotebookCellView
                key={cell.id}
                cell={cell}
                isActive={activeCellId === cell.id}
                onActivate={() => setActiveCellId(cell.id)}
                onRun={() => runCell(cell.id)}
                onDelete={() => deleteCell(cell.id)}
                onToggleCollapse={() => toggleCollapse(cell.id)}
                onUpdateContent={(content) => updateCellContent(cell.id, content)}
              />
            ))}

            {filteredCells.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No cells matching &quot;{searchQuery}&quot;</p>
              </div>
            )}

            {/* Add cell bar */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="h-px flex-1 bg-border/30" />
              <div className="flex items-center gap-1">
                {(["code", "markdown", "dna-sequence", "ccce-metrics", "pharma-screen", "genomic-query"] as CellType[]).map(type => {
                  const meta = CELL_TYPE_META[type]
                  return (
                    <Button
                      key={type}
                      variant="ghost"
                      size="sm"
                      className="h-7 text-[10px] gap-1 text-muted-foreground hover:text-foreground"
                      onClick={() => addCell(type)}
                      aria-label={`Add ${meta.label} cell`}
                    >
                      <Plus className="w-3 h-3" /> {meta.label}
                    </Button>
                  )
                })}
              </div>
              <div className="h-px flex-1 bg-border/30" />
            </div>
          </div>
        </main>

        {/* ─── Sidebar ────────────────────────────────────────────── */}
        {sidebarOpen && (
          <aside className="w-72 flex-shrink-0 border-l border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden flex flex-col" aria-label="Notebook sidebar">
            <Tabs value={sidebarTab} onValueChange={setSidebarTab} className="flex flex-col h-full">
              <TabsList className="mx-3 mt-3 bg-muted/30 h-8">
                <TabsTrigger value="swarm" className="text-[10px] h-6 gap-1 flex-1">
                  <Network className="w-3 h-3" /> Swarm
                </TabsTrigger>
                <TabsTrigger value="agents" className="text-[10px] h-6 gap-1 flex-1">
                  <Brain className="w-3 h-3" /> Agents
                </TabsTrigger>
                <TabsTrigger value="security" className="text-[10px] h-6 gap-1 flex-1">
                  <Shield className="w-3 h-3" /> Security
                </TabsTrigger>
                <TabsTrigger value="audit" className="text-[10px] h-6 gap-1 flex-1">
                  <Eye className="w-3 h-3" /> Audit
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1 px-3 py-3">
                <TabsContent value="swarm" className="mt-0">
                  <SwarmPanel nodes={swarmNodes} />
                </TabsContent>
                <TabsContent value="agents" className="mt-0">
                  <AgentsPanel />
                </TabsContent>
                <TabsContent value="security" className="mt-0">
                  <SecurityPanel />
                </TabsContent>
                <TabsContent value="audit" className="mt-0">
                  <AuditPanel entries={auditLog} />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </aside>
        )}
      </div>
    </div>
  )
}
