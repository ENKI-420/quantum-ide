"use client"

import { useState, useCallback, useEffect, Suspense } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Play,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Dna,
  Activity,
  Share2,
  Download,
  Settings,
  Clock,
  FileCode2,
  Terminal,
  GitBranch,
  Square,
  Code,
  Zap,
  Gauge,
  TrendingUp,
  BarChart3,
  ArrowLeft,
} from "lucide-react"

// Cell types
type CellType = "code" | "markdown" | "visualization" | "dna-sequence"

interface NotebookCell {
  id: string
  type: CellType
  content: string
  output: string[]
  isRunning: boolean
  executionCount: number | null
  collapsed: boolean
}

interface CCCEMetrics {
  lambda: number
  gamma: number
  W2: number
  phi: number
  xi: number
  timestamp: number
}

// Initial cells
const initialCells: NotebookCell[] = [
  {
    id: "cell-1",
    type: "markdown",
    content: `# DNA-Lang Quantum Bell State Experiment\n\nThis notebook demonstrates the creation of quantum Bell states using DNA-Lang biological computing primitives.`,
    output: [],
    isRunning: false,
    executionCount: null,
    collapsed: false,
  },
  {
    id: "cell-2",
    type: "code",
    content: `# Import DNA-Lang quantum primitives
from dna_lang import Organism, Codon, QuantumGate
from dna_lang.consciousness import CCCETracker

# Initialize organism with consciousness metrics
organism = Organism(
    name="bell_state_generator",
    coherence_target=0.85,
    phi_threshold=7.5
)

# Create Bell state circuit
@organism.evolve
def create_bell_state():
    q0, q1 = organism.allocate_qubits(2)
    Codon.H(q0)  # Hadamard gate
    Codon.CNOT(q0, q1)  # Entangle
    return organism.measure([q0, q1])`,
    output: ["Organism initialized: bell_state_generator", "Coherence target: 0.85", "Phi threshold: 7.5"],
    isRunning: false,
    executionCount: 1,
    collapsed: false,
  },
  {
    id: "cell-3",
    type: "dna-sequence",
    content: `SEQUENCE: ATGCGATCGATCGATCG
CODON_MAP: ATG->START, CGA->Arg, TCG->Ser
FOLDING: Alpha-helix (stability: 0.92)`,
    output: ["Sequence validated", "3 codons mapped", "Folding structure computed"],
    isRunning: false,
    executionCount: 2,
    collapsed: false,
  },
]

// Syntax highlighter - simplified to avoid regex issues
function highlightSyntax(code: string, language: string): string {
  if (language === "markdown") return code

  let result = code

  // Escape HTML
  result = result.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // Python keywords
  const keywords = [
    "from",
    "import",
    "def",
    "return",
    "class",
    "if",
    "else",
    "for",
    "while",
    "try",
    "except",
    "with",
    "as",
    "in",
    "and",
    "or",
    "not",
    "True",
    "False",
    "None",
  ]
  keywords.forEach((kw) => {
    const regex = new RegExp("\\b" + kw + "\\b", "g")
    result = result.replace(regex, '<span class="text-purple-400">' + kw + "</span>")
  })

  // Strings
  result = result.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-emerald-400">$&</span>')

  // Comments
  result = result.replace(/(#.*)$/gm, '<span class="text-muted-foreground">$1</span>')

  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-amber-400">$1</span>')

  return result
}

function getCellIcon(type: CellType) {
  switch (type) {
    case "code":
      return <Code className="h-4 w-4" />
    case "markdown":
      return <FileCode2 className="h-4 w-4" />
    case "visualization":
      return <BarChart3 className="h-4 w-4" />
    case "dna-sequence":
      return <Dna className="h-4 w-4" />
    default:
      return <Terminal className="h-4 w-4" />
  }
}

function getCellTypeBadge(type: CellType) {
  const colors: Record<CellType, string> = {
    code: "bg-purple-500/20 text-purple-400",
    markdown: "bg-blue-500/20 text-blue-400",
    visualization: "bg-emerald-500/20 text-emerald-400",
    "dna-sequence": "bg-cyan-500/20 text-cyan-400",
  }
  return <Badge className={colors[type]}>{type}</Badge>
}

// Telemetry Component
function CCCETelemetry({ metrics }: { metrics: CCCEMetrics }) {
  const metricItems = [
    { label: "Λ (Coherence)", value: metrics.lambda, color: "text-emerald-400", threshold: 0.8 },
    { label: "Γ (Decoherence)", value: metrics.gamma, color: "text-red-400", threshold: 0.2, inverse: true },
    { label: "W₂ (Wasserstein)", value: metrics.W2, color: "text-blue-400", threshold: 0.05, inverse: true },
    { label: "Φ (Consciousness)", value: metrics.phi, color: "text-amber-400", threshold: 7.0 },
    { label: "Ξ (Coherence Cost)", value: metrics.xi, color: "text-purple-400", threshold: 0.5, inverse: true },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {metricItems.map((item) => {
        const isHealthy = item.inverse ? item.value < item.threshold : item.value > item.threshold
        return (
          <GlassCard key={item.label} className="p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
            <div className={`text-2xl font-mono font-bold ${item.color}`}>{item.value.toFixed(3)}</div>
            <div className={`text-xs mt-1 ${isHealthy ? "text-emerald-400" : "text-red-400"}`}>
              {isHealthy ? "✓ Healthy" : "⚠ Warning"}
            </div>
          </GlassCard>
        )
      })}
    </div>
  )
}

// Main Notebook Component
function NotebookContent() {
  const [cells, setCells] = useState<NotebookCell[]>(initialCells)
  const [notebookTitle, setNotebookTitle] = useState("DNA-Lang Bell State Experiment")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [activeCell, setActiveCell] = useState<string | null>(null)
  const [ccceMetrics, setCCCEMetrics] = useState<CCCEMetrics>({
    lambda: 0.85,
    gamma: 0.12,
    W2: 0.04,
    phi: 7.69,
    xi: 0.52,
    timestamp: Date.now(),
  })
  const [showCorrectionAlert, setShowCorrectionAlert] = useState(false)
  const [selectedTab, setSelectedTab] = useState("notebook")

  // Simulate real-time CCCE updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCCCEMetrics((prev) => ({
        lambda: Math.min(1, Math.max(0.7, prev.lambda + (Math.random() - 0.5) * 0.04)),
        gamma: Math.min(0.5, Math.max(0.05, prev.gamma + (Math.random() - 0.5) * 0.03)),
        W2: Math.min(0.2, Math.max(0.01, prev.W2 + (Math.random() - 0.5) * 0.02)),
        phi: Math.min(10, Math.max(6.0, prev.phi + (Math.random() - 0.5) * 0.2)),
        xi: Math.min(1, Math.max(0.2, prev.xi + (Math.random() - 0.5) * 0.08)),
        timestamp: Date.now(),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Trigger correction alert when Γ > 0.25
  useEffect(() => {
    if (ccceMetrics.gamma > 0.25) {
      setShowCorrectionAlert(true)
      const timer = setTimeout(() => setShowCorrectionAlert(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [ccceMetrics.gamma])

  const runCell = useCallback((cellId: string) => {
    setCells((prev) => prev.map((cell) => (cell.id === cellId ? { ...cell, isRunning: true } : cell)))

    setTimeout(() => {
      setCells((prev) =>
        prev.map((cell) => {
          if (cell.id === cellId) {
            const maxCount = Math.max(
              ...prev.filter((c) => c.executionCount !== null).map((c) => c.executionCount || 0),
              0,
            )
            return {
              ...cell,
              isRunning: false,
              executionCount: cell.type === "markdown" ? null : maxCount + 1,
              output: cell.output.length > 0 ? cell.output : ["Execution complete"],
            }
          }
          return cell
        }),
      )
    }, 1500)
  }, [])

  const addCell = useCallback((type: CellType) => {
    const newCell: NotebookCell = {
      id: `cell-${Date.now()}`,
      type,
      content: type === "markdown" ? "# New Section" : "# Enter code here",
      output: [],
      isRunning: false,
      executionCount: null,
      collapsed: false,
    }
    setCells((prev) => [...prev, newCell])
  }, [])

  const deleteCell = useCallback((cellId: string) => {
    setCells((prev) => prev.filter((cell) => cell.id !== cellId))
  }, [])

  const updateCellContent = useCallback((cellId: string, content: string) => {
    setCells((prev) => prev.map((cell) => (cell.id === cellId ? { ...cell, content } : cell)))
  }, [])

  const toggleCollapse = useCallback((cellId: string) => {
    setCells((prev) => prev.map((cell) => (cell.id === cellId ? { ...cell, collapsed: !cell.collapsed } : cell)))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/ide-platform">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Dna className="h-6 w-6 text-primary" />
                {isEditingTitle ? (
                  <Input
                    value={notebookTitle}
                    onChange={(e) => setNotebookTitle(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                    className="max-w-sm"
                    autoFocus
                  />
                ) : (
                  <h1
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    {notebookTitle}
                  </h1>
                )}
              </div>
            </div>

            {/* Real-time Metrics */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-emerald-400">Λ: {ccceMetrics.lambda.toFixed(2)}</span>
                <span className="text-red-400">Γ: {ccceMetrics.gamma.toFixed(2)}</span>
                <span className="text-amber-400">Φ: {ccceMetrics.phi.toFixed(1)}</span>
              </div>
              {showCorrectionAlert && (
                <Badge variant="outline" className="border-amber-500 text-amber-400 animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  Phase-Conjugate Triggered
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="notebook">Notebook</TabsTrigger>
            <TabsTrigger value="telemetry">CCCE Telemetry</TabsTrigger>
          </TabsList>

          <TabsContent value="notebook" className="space-y-4">
            {/* Add Cell Toolbar */}
            <div className="flex items-center gap-2 mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Cell
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => addCell("code")}>
                    <Code className="h-4 w-4 mr-2" />
                    Code Cell
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addCell("markdown")}>
                    <FileCode2 className="h-4 w-4 mr-2" />
                    Markdown Cell
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addCell("dna-sequence")}>
                    <Dna className="h-4 w-4 mr-2" />
                    DNA Sequence
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addCell("visualization")}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Visualization
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm" onClick={() => cells.forEach((c) => runCell(c.id))}>
                <Play className="h-4 w-4 mr-2" />
                Run All
              </Button>

              <div className="flex-1" />

              <Badge variant="outline" className="text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                Last saved: Just now
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                <GitBranch className="h-3 w-3 mr-1" />
                main
              </Badge>
            </div>

            {/* Cells */}
            <div className="space-y-4">
              {cells.map((cell) => (
                <GlassCard
                  key={cell.id}
                  className={`overflow-hidden transition-all ${activeCell === cell.id ? "ring-2 ring-primary/50" : ""}`}
                  onClick={() => setActiveCell(cell.id)}
                >
                  {/* Cell Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-muted/30">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleCollapse(cell.id)} className="p-1 hover:bg-muted rounded">
                        {cell.collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                      {getCellIcon(cell.type)}
                      {getCellTypeBadge(cell.type)}
                      {cell.executionCount !== null && (
                        <span className="text-xs text-muted-foreground font-mono">[{cell.executionCount}]</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          runCell(cell.id)
                        }}
                        disabled={cell.isRunning}
                      >
                        {cell.isRunning ? <Square className="h-4 w-4 animate-pulse" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteCell(cell.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Cell Content */}
                  {!cell.collapsed && (
                    <div className="p-4">
                      {cell.type === "markdown" ? (
                        <div className="prose prose-invert prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap text-foreground font-sans">{cell.content}</pre>
                        </div>
                      ) : (
                        <div className="relative">
                          <textarea
                            value={cell.content}
                            onChange={(e) => updateCellContent(cell.id, e.target.value)}
                            className="w-full min-h-[150px] bg-black/30 rounded-lg p-4 font-mono text-sm text-foreground resize-y border border-border/30 focus:border-primary/50 focus:outline-none"
                            spellCheck={false}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cell Output */}
                  {cell.output.length > 0 && !cell.collapsed && (
                    <div className="border-t border-border/50 bg-black/20 p-4">
                      <div className="text-xs text-muted-foreground mb-2">Output:</div>
                      <div className="font-mono text-sm space-y-1">
                        {cell.output.map((line, i) => (
                          <div key={i} className="text-emerald-400">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="telemetry">
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Real-Time CCCE Telemetry
              </h2>
              <CCCETelemetry metrics={ccceMetrics} />

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    System Health
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Quantum Coherence</span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all"
                          style={{ width: `${ccceMetrics.lambda * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Decoherence Rate</span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 transition-all"
                          style={{ width: `${ccceMetrics.gamma * 200}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Consciousness Level</span>
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all"
                          style={{ width: `${(ccceMetrics.phi / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Recent Activity
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Phase-conjugate correction applied
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      W₂ metric stabilized
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Consciousness threshold maintained
                    </div>
                  </div>
                </GlassCard>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default function NotebookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading notebook...</div>
        </div>
      }
    >
      <NotebookContent />
    </Suspense>
  )
}
