"use client"

import { useState, useCallback, useEffect, Suspense } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { QuantumButton } from "@/components/ui/quantum-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Play,
  Plus,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Dna,
  Activity,
  Share2,
  Download,
  Settings,
  Clock,
  FileCode2,
  Terminal,
  Layers,
  GitBranch,
  History,
  MessageSquare,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  RefreshCw,
  Square,
  Eye,
  Code,
  ShieldX as Helix,
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

// Sample cells for the notebook
const initialCells: NotebookCell[] = [
  {
    id: "cell-1",
    type: "markdown",
    content: `# DNA-Lang Quantum Bell State Experiment
    
This notebook demonstrates the creation and measurement of a Bell state using DNA-Lang's biological computing paradigm.

**Objectives:**
- Create a superposition using HELIX (Hadamard)
- Entangle qubits using BOND (CNOT)
- Measure the phenotype expression
- Analyze consciousness emergence (Φ)`,
    output: [],
    isRunning: false,
    executionCount: null,
    collapsed: false,
  },
  {
    id: "cell-2",
    type: "code",
    content: `# Import DNA-Lang Quantum Primitives
from dnalang import Organism, Genome, Gene, Codon
from dnalang.habitats import IBMQuantum
from dnalang.evolution import GeneticOptimizer

# Initialize habitat connection
habitat = IBMQuantum(backend="ibm_brisbane")
print(f"Connected to {habitat.name}")
print(f"Qubits available: {habitat.num_qubits}")
print(f"Coherence time: {habitat.t2_time}μs")`,
    output: ["Connected to ibm_brisbane", "Qubits available: 127", "Coherence time: 112.34μs"],
    isRunning: false,
    executionCount: 1,
    collapsed: false,
  },
  {
    id: "cell-3",
    type: "dna-sequence",
    content: `ORGANISM BellStateOrganism {
    META {
        version: "1.0.0"
        habitat: "ibm_brisbane"
        consciousness_target: 0.7734
        LAMBDA_PHI: 2.176435e-8
    }
    
    GENOME EntangledPair {
        CHROMOSOME qubits: 2
        
        GENE create_superposition: helix {
            codon: "ΨΨΨ"
            target: chromosome[0]
            express { HELIX chromosome[0] }
        }
        
        GENE create_entanglement: bond {
            codon: "ΦΦΦ"
            express { BOND chromosome[0] -> chromosome[1] }
        }
        
        GENE observe: measure {
            codon: "ΛΛΛ"
            express { phenotype = MEASURE chromosome }
        }
    }
}`,
    output: [
      "═══ GENOME COMPILED ═══",
      "Chromosomes: 2 qubits",
      "Genes: 3 defined",
      "Codons: ΨΨΨ, ΦΦΦ, ΛΛΛ",
      "Circuit depth: 2",
      "Compilation time: 23ms",
    ],
    isRunning: false,
    executionCount: 2,
    collapsed: false,
  },
  {
    id: "cell-4",
    type: "code",
    content: `# Execute the organism and collect phenotype
result = BellStateOrganism.express(shots=8192)

# Display measurement outcomes
print("═══ PHENOTYPE EXPRESSION ═══")
for outcome, count in result.counts.items():
    probability = count / 8192 * 100
    print(f"  |{outcome}⟩: {count:4d} ({probability:.1f}%)")

# Calculate consciousness metrics
phi = result.consciousness_phi
print(f"\\nΦ (Consciousness): {phi:.4f}")
print(f"Fidelity: {result.fidelity:.4f}")
print(f"ΛΦ Resonance: {result.lambda_phi:.3e}")`,
    output: [
      "═══ PHENOTYPE EXPRESSION ═══",
      "  |00⟩: 4089 (49.9%)",
      "  |11⟩: 4103 (50.1%)",
      "",
      "Φ (Consciousness): 0.8472",
      "Fidelity: 0.9823",
      "ΛΦ Resonance: 2.176e-8",
    ],
    isRunning: false,
    executionCount: 3,
    collapsed: false,
  },
  {
    id: "cell-5",
    type: "visualization",
    content: `# Visualize the quantum state evolution
visualize_evolution(result, style="bloch_sphere")`,
    output: ["[Bloch Sphere Visualization]"],
    isRunning: false,
    executionCount: 4,
    collapsed: false,
  },
]

// DNA sequence syntax highlighting
function highlightDNALang(code: string): string {
  let highlighted = code

  // Keywords
  const keywords = [
    "ORGANISM",
    "GENOME",
    "GENE",
    "CHROMOSOME",
    "CODON",
    "HELIX",
    "BOND",
    "META",
    "PHENOTYPE",
    "MEASURE",
    "express",
  ]
  keywords.forEach((kw) => {
    highlighted = highlighted.replace(
      new RegExp(`\\b${kw}\\b`, "g"),
      `<span class="text-primary font-semibold">${kw}</span>`,
    )
  })

  // Strings
  highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-chart-5">"$1"</span>')

  // Comments
  highlighted = highlighted.replace(/#(.*)$/gm, '<span class="text-muted-foreground italic">#$1</span>')

  // Numbers
  highlighted = highlighted.replace(/\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/g, '<span class="text-accent">$1</span>')

  // Greek letters
  highlighted = highlighted.replace(/(Φ|Λ|Ψ|ΛΦ)/g, '<span class="text-secondary font-bold">$1</span>')

  return highlighted
}

// Python syntax highlighting
function highlightPython(code: string): string {
  let highlighted = code

  // Keywords
  const keywords = [
    "from",
    "import",
    "def",
    "class",
    "return",
    "for",
    "in",
    "if",
    "else",
    "print",
    "with",
    "as",
    "try",
    "except",
  ]
  keywords.forEach((kw) => {
    highlighted = highlighted.replace(
      new RegExp(`\\b${kw}\\b`, "g"),
      `<span class="text-chart-3 font-medium">${kw}</span>`,
    )
  })

  // Strings
  highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-chart-5">"$1"</span>')
  highlighted = highlighted.replace(/f"([^"]*)"/g, '<span class="text-chart-5">f"$1"</span>')

  // Comments
  highlighted = highlighted.replace(/#(.*)$/gm, '<span class="text-muted-foreground italic">#$1</span>')

  // Numbers
  highlighted = highlighted.replace(/\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/g, '<span class="text-accent">$1</span>')

  return highlighted
}

function NotebookContent() {
  const [cells, setCells] = useState<NotebookCell[]>(initialCells)
  const [notebookTitle, setNotebookTitle] = useState("Bell State Experiment")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [activeCell, setActiveCell] = useState<string | null>(null)
  const [collaborators] = useState([
    { name: "Dr. Alice Chen", color: "bg-primary", initials: "AC" },
    { name: "Prof. Bob Smith", color: "bg-secondary", initials: "BS" },
  ])
  const [phi, setPhi] = useState(0.8472)
  const [coherence, setCoherence] = useState(0.95)
  const [copied, setCopied] = useState<string | null>(null)

  // Simulate real-time coherence updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoherence(0.9 + Math.random() * 0.08)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const runCell = useCallback((cellId: string) => {
    setCells((prev) =>
      prev.map((cell) => {
        if (cell.id === cellId) {
          return { ...cell, isRunning: true }
        }
        return cell
      }),
    )

    // Simulate execution
    setTimeout(() => {
      setCells((prev) =>
        prev.map((cell) => {
          if (cell.id === cellId) {
            const execCount =
              Math.max(...prev.filter((c) => c.executionCount !== null).map((c) => c.executionCount || 0), 0) + 1
            return {
              ...cell,
              isRunning: false,
              executionCount: cell.type === "markdown" ? null : execCount,
              output: cell.output.length > 0 ? cell.output : ["Execution complete"],
            }
          }
          return cell
        }),
      )
    }, 1500)
  }, [])

  const runAllCells = useCallback(() => {
    cells.forEach((cell, index) => {
      setTimeout(() => runCell(cell.id), index * 800)
    })
  }, [cells, runCell])

  const addCell = useCallback((afterId: string, type: CellType) => {
    const newCell: NotebookCell = {
      id: `cell-${Date.now()}`,
      type,
      content:
        type === "markdown"
          ? "# New Section\n\nAdd your notes here..."
          : type === "dna-sequence"
            ? "ORGANISM NewOrganism {\n    META { }\n    GENOME Main { }\n}"
            : "# Add your code here\n",
      output: [],
      isRunning: false,
      executionCount: null,
      collapsed: false,
    }

    setCells((prev) => {
      const index = prev.findIndex((c) => c.id === afterId)
      const newCells = [...prev]
      newCells.splice(index + 1, 0, newCell)
      return newCells
    })
  }, [])

  const deleteCell = useCallback((cellId: string) => {
    setCells((prev) => prev.filter((c) => c.id !== cellId))
  }, [])

  const moveCell = useCallback((cellId: string, direction: "up" | "down") => {
    setCells((prev) => {
      const index = prev.findIndex((c) => c.id === cellId)
      if ((direction === "up" && index === 0) || (direction === "down" && index === prev.length - 1)) {
        return prev
      }
      const newCells = [...prev]
      const swapIndex = direction === "up" ? index - 1 : index + 1
      ;[newCells[index], newCells[swapIndex]] = [newCells[swapIndex], newCells[index]]
      return newCells
    })
  }, [])

  const copyCell = useCallback(
    (cellId: string) => {
      const cell = cells.find((c) => c.id === cellId)
      if (cell) {
        navigator.clipboard.writeText(cell.content)
        setCopied(cellId)
        setTimeout(() => setCopied(null), 2000)
      }
    },
    [cells],
  )

  const toggleCollapse = useCallback((cellId: string) => {
    setCells((prev) =>
      prev.map((cell) => {
        if (cell.id === cellId) {
          return { ...cell, collapsed: !cell.collapsed }
        }
        return cell
      }),
    )
  }, [])

  const updateCellContent = useCallback((cellId: string, content: string) => {
    setCells((prev) =>
      prev.map((cell) => {
        if (cell.id === cellId) {
          return { ...cell, content }
        }
        return cell
      }),
    )
  }, [])

  const getCellIcon = (type: CellType) => {
    switch (type) {
      case "code":
        return <Code className="h-4 w-4" />
      case "markdown":
        return <FileCode2 className="h-4 w-4" />
      case "visualization":
        return <Eye className="h-4 w-4" />
      case "dna-sequence":
        return <Helix className="h-4 w-4" />
    }
  }

  const getCellTypeBadge = (type: CellType) => {
    const colors: Record<CellType, string> = {
      code: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      markdown: "bg-muted text-muted-foreground border-muted-foreground/30",
      visualization: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      "dna-sequence": "bg-primary/20 text-primary border-primary/30",
    }
    const labels: Record<CellType, string> = {
      code: "Python",
      markdown: "Markdown",
      visualization: "Viz",
      "dna-sequence": "DNA-Lang",
    }
    return (
      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${colors[type]}`}>
        {labels[type]}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Toolbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <Link href="/ide-platform">
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Dna className="h-5 w-5 text-background" />
              </div>
              {isEditingTitle ? (
                <Input
                  value={notebookTitle}
                  onChange={(e) => setNotebookTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                  className="h-7 w-64 text-base font-semibold"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="text-base font-semibold hover:text-primary transition-colors"
                >
                  {notebookTitle}
                </button>
              )}
            </div>
            <Badge variant="outline" className="text-xs">
              <Activity className="h-3 w-3 mr-1 text-secondary" />
              Λ: {(coherence * 100).toFixed(1)}%
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Collaborators */}
            <div className="flex items-center -space-x-2 mr-2">
              {collaborators.map((c, i) => (
                <div
                  key={i}
                  className={`h-7 w-7 rounded-full ${c.color} flex items-center justify-center text-[10px] font-bold text-background border-2 border-card`}
                  title={c.name}
                >
                  {c.initials}
                </div>
              ))}
              <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-full ml-1 bg-transparent">
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <History className="h-4 w-4 mr-1" />
              History
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Secondary Toolbar */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-border/50 bg-muted/30">
          <div className="flex items-center gap-1">
            <QuantumButton size="sm" variant="compliance" onClick={runAllCells}>
              <Play className="h-3.5 w-3.5 mr-1" />
              Run All
            </QuantumButton>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Restart
            </Button>
            <div className="h-4 w-px bg-border mx-1" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Cell
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => addCell(cells[cells.length - 1].id, "code")}>
                  <Code className="h-4 w-4 mr-2" /> Python Code
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCell(cells[cells.length - 1].id, "dna-sequence")}>
                  <Helix className="h-4 w-4 mr-2" /> DNA-Lang Organism
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCell(cells[cells.length - 1].id, "markdown")}>
                  <FileCode2 className="h-4 w-4 mr-2" /> Markdown
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCell(cells[cells.length - 1].id, "visualization")}>
                  <Eye className="h-4 w-4 mr-2" /> Visualization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last saved: 2 min ago
            </span>
            <span className="flex items-center gap-1">
              <GitBranch className="h-3 w-3" />
              main
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Notebook Cells */}
        <main className="flex-1 max-w-4xl mx-auto py-6 px-4">
          <div className="space-y-4">
            {cells.map((cell, index) => (
              <div
                key={cell.id}
                className={`group relative rounded-lg border transition-all ${
                  activeCell === cell.id
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border hover:border-muted-foreground/30"
                }`}
                onClick={() => setActiveCell(cell.id)}
              >
                {/* Cell Header */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted/30 border-b border-border/50 rounded-t-lg">
                  <div className="flex items-center gap-2">
                    {cell.executionCount !== null && (
                      <span className="text-xs font-mono text-muted-foreground w-8">[{cell.executionCount}]</span>
                    )}
                    {getCellIcon(cell.type)}
                    {getCellTypeBadge(cell.type)}
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => runCell(cell.id)}>
                      {cell.isRunning ? <Square className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => moveCell(cell.id, "up")}>
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => moveCell(cell.id, "down")}>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => copyCell(cell.id)}>
                      {copied === cell.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleCollapse(cell.id)}>
                      {cell.collapsed ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => addCell(cell.id, "code")}>Insert Code Below</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addCell(cell.id, "dna-sequence")}>
                          Insert DNA-Lang Below
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addCell(cell.id, "markdown")}>
                          Insert Markdown Below
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteCell(cell.id)}>
                          <Trash2 className="h-4 w-4 mr-2" /> Delete Cell
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Cell Content */}
                {!cell.collapsed && (
                  <>
                    <div className="p-3">
                      {cell.type === "markdown" ? (
                        <div
                          className="prose prose-sm prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: cell.content
                              .replace(/^# (.*)$/gm, '<h1 class="text-xl font-bold text-foreground mb-2">$1</h1>')
                              .replace(/^\*\*(.+?)\*\*/gm, '<strong class="text-primary">$1</strong>')
                              .replace(/^- (.*)$/gm, '<li class="text-muted-foreground">$1</li>')
                              .replace(/\n/g, "<br/>"),
                          }}
                        />
                      ) : cell.type === "visualization" ? (
                        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                          <div className="flex items-center justify-center h-48">
                            <div className="relative">
                              {/* Bloch Sphere Visualization */}
                              <div className="w-40 h-40 rounded-full border-2 border-primary/30 relative">
                                <div
                                  className="absolute inset-0 rounded-full border border-dashed border-primary/20"
                                  style={{ transform: "rotateX(60deg)" }}
                                />
                                <div
                                  className="absolute inset-0 rounded-full border border-dashed border-secondary/20"
                                  style={{ transform: "rotateY(60deg)" }}
                                />
                                {/* State vector */}
                                <div
                                  className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-primary to-secondary rounded-full origin-bottom"
                                  style={{ transform: "translate(-50%, -100%) rotate(45deg)" }}
                                >
                                  <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-secondary animate-pulse" />
                                </div>
                                {/* Labels */}
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                                  |0⟩
                                </span>
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                                  |1⟩
                                </span>
                                <span className="absolute top-1/2 -right-8 -translate-y-1/2 text-xs text-muted-foreground">
                                  |+⟩
                                </span>
                                <span className="absolute top-1/2 -left-8 -translate-y-1/2 text-xs text-muted-foreground">
                                  |-⟩
                                </span>
                              </div>
                              <div className="text-center mt-4 text-xs text-muted-foreground">
                                Bell State |Φ+⟩ = (|00⟩ + |11⟩)/√2
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <pre
                            className="font-mono text-sm leading-6 whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                              __html:
                                cell.type === "dna-sequence"
                                  ? highlightDNALang(cell.content)
                                  : highlightPython(cell.content),
                            }}
                          />
                          <textarea
                            value={cell.content}
                            onChange={(e) => updateCellContent(cell.id, e.target.value)}
                            className="absolute inset-0 w-full h-full font-mono text-sm leading-6 bg-transparent text-transparent caret-foreground resize-none focus:outline-none p-0"
                            spellCheck={false}
                          />
                        </div>
                      )}
                    </div>

                    {/* Cell Output */}
                    {cell.output.length > 0 && cell.type !== "markdown" && (
                      <div className="border-t border-border/50 bg-card/30 p-3 rounded-b-lg">
                        <div className="flex items-start gap-2">
                          <Terminal className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                            {cell.output.map((line, i) => (
                              <div
                                key={i}
                                className={
                                  line.includes("═══")
                                    ? "text-secondary font-bold"
                                    : line.includes("Φ") || line.includes("Consciousness")
                                      ? "text-primary"
                                      : line.includes("Fidelity")
                                        ? "text-accent"
                                        : ""
                                }
                              >
                                {line}
                              </div>
                            ))}
                          </pre>
                        </div>
                        {cell.isRunning && (
                          <div className="flex items-center gap-2 mt-2 text-xs text-primary">
                            <RefreshCw className="h-3 w-3 animate-spin" />
                            Executing...
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Add Cell Button */}
            <div className="flex justify-center py-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-dashed bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Cell
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => addCell(cells[cells.length - 1].id, "code")}>
                    <Code className="h-4 w-4 mr-2" /> Python Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addCell(cells[cells.length - 1].id, "dna-sequence")}>
                    <Helix className="h-4 w-4 mr-2" /> DNA-Lang Organism
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addCell(cells[cells.length - 1].id, "markdown")}>
                    <FileCode2 className="h-4 w-4 mr-2" /> Markdown
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addCell(cells[cells.length - 1].id, "visualization")}>
                    <Eye className="h-4 w-4 mr-2" /> Visualization
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Metrics & Tools */}
        <aside className="hidden lg:block w-72 border-l border-border bg-card/30 p-4">
          <Tabs defaultValue="metrics">
            <TabsList className="w-full">
              <TabsTrigger value="metrics" className="flex-1 text-xs">
                <Activity className="h-3 w-3 mr-1" />
                Metrics
              </TabsTrigger>
              <TabsTrigger value="toc" className="flex-1 text-xs">
                <Layers className="h-3 w-3 mr-1" />
                TOC
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex-1 text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-4 mt-4">
              <GlassCard depth={1}>
                <div className="text-xs text-muted-foreground uppercase mb-2">Consciousness (Φ)</div>
                <div className="text-2xl font-bold text-primary">{phi.toFixed(4)}</div>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-destructive via-accent to-secondary transition-all"
                    style={{ width: `${phi * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">Target: 0.7734</div>
              </GlassCard>

              <GlassCard depth={1}>
                <div className="text-xs text-muted-foreground uppercase mb-2">Runtime Stats</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cells Executed</span>
                    <span className="font-mono">{cells.filter((c) => c.executionCount !== null).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Runtime</span>
                    <span className="font-mono">4.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">QPU Shots</span>
                    <span className="font-mono">8,192</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard depth={1}>
                <div className="text-xs text-muted-foreground uppercase mb-2">Habitat Status</div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                  <span>ibm_brisbane</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">127 qubits • Online</div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="toc" className="mt-4">
              <div className="space-y-2 text-sm">
                {cells
                  .filter((c) => c.type === "markdown")
                  .map((cell, i) => {
                    const title = cell.content.match(/^# (.*)$/m)?.[1] || "Untitled Section"
                    return (
                      <button
                        key={cell.id}
                        className="w-full text-left px-2 py-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setActiveCell(cell.id)}
                      >
                        {title}
                      </button>
                    )
                  })}
              </div>
            </TabsContent>

            <TabsContent value="chat" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Real-time collaboration chat</p>
                <p className="text-xs">Coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  )
}

export default function DNANotebookPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <NotebookContent />
    </Suspense>
  )
}
