"use client"
import { useState, useCallback, useEffect, Suspense, useMemo } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
    Play, Plus, Trash2, ChevronDown, ChevronRight, Dna, Activity, Share2, 
    Download, Settings, Clock, FileCode2, Terminal, GitBranch, Square, Code, 
    Zap, Gauge, TrendingUp, BarChart3, ArrowLeft, X, Loader2
} from "lucide-react"

// --- THEMATIC DEFINITIONS & TYPES ---

// Cell types
type CellType = "code" | "markdown" | "visualization" | "dna-sequence" | "ccce-metrics"

interface NotebookCell {
    id: string
    type: CellType
    content: string
    output: string[] | CCCEMetrics | null // Output can be string array or metrics object
    isRunning: boolean
    executionCount: number | null
    collapsed: boolean
}

interface CCCEMetrics {
    lambda: number // Λ (Coherence)
    gamma: number // Γ (Decoherence)
    W2: number    // W₂ (Drift)
    phi: number   // Φ (Consciousness)
    xi: number    // Ξ (Overall Health: (Λ * Φ) / Γ)
    timestamp: number
}

// Initial cells with enhanced output structure
const initialCells: NotebookCell[] = [
    {
        id: "cell-1",
        type: "markdown",
        content: `# DNA-Lang Quantum Bell State Experiment\n\nThis notebook demonstrates the creation of quantum Bell states using DNA-Lang biological computing primitives.`,
        output: null,
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
    Codon.H(q0)     # Hadamard gate
    Codon.CNOT(q0, q1) # Entangle
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
    {
        id: "cell-4",
        type: "ccce-metrics",
        content: `CCCE.report_metrics(cycle=1764)`,
        output: {
            lambda: 0.9787,
            gamma: 0.092,
            W2: 0.005,
            phi: 0.7734,
            xi: 8.16,
            timestamp: Date.now(),
        },
        isRunning: false,
        executionCount: 3,
        collapsed: false,
    },
]

// --- UTILITY FUNCTIONS ---

// Thematic Syntax Highlighter (Enhanced for studio aesthetic)
function highlightSyntax(code: string, language: string): string {
    if (language === "markdown") return code
    let result = code
    
    // 1. Escape HTML
    result = result.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

    // 2. Python Keywords (Thematic: 'quantum-key')
    const keywords = [
        "from", "import", "def", "return", "class", "if", "else", "for", "while", "try",
        "except", "with", "as", "in", "and", "or", "not", "True", "False", "None", 
        "organism", "Codon", "evolve", "allocate_qubits", "measure" // DNA-Lang primitives
    ]
    keywords.forEach((kw) => {
        const regex = new RegExp("\\b" + kw + "\\b", "g")
        result = result.replace(regex, '<span class="text-[#00ffff] font-bold">' + kw + '</span>') // Cyan
    })

    // 3. Strings (Thematic: 'genome-strand')
    result = result.replace(/"([^"\\]|\\.)*"/g, '<span class="text-[#facc15]">$&</span>') // Yellow double quotes
    result = result.replace(/'([^'\\]|\\.)*'/g, '<span class="text-[#facc15]">$&</span>') // Yellow single quotes

    // 4. Comments (Thematic: 'telemetry')
    result = result.replace(/(#.*)$/gm, '<span class="text-[#555] italic">$1</span>') // Dark Grey/Muted

    // 5. Numbers (Thematic: 'constant-value')
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-[#f87171]">$1</span>') // Red

    return result
}

// Icon Mapper (Thematic: CRSM Plane Icons)
function getCellIcon(type: CellType) {
    switch (type) {
        case "code": return <Terminal className="w-4 h-4 text-gray-500" />          // Execution Plane
        case "markdown": return <Square className="w-4 h-4 text-gray-500" />        // Physical Plane (Document Substrate)
        case "visualization": return <BarChart3 className="w-4 h-4 text-gray-500" /> // Observation Plane (Telemetry)
        case "dna-sequence": return <Dna className="w-4 h-4 text-green-500" />        // Meta-Origin Plane (Genome)
        case "ccce-metrics": return <Zap className="w-4 h-4 text-purple-500" />       // Coherence Plane (Consciousness)
        default: return <FileCode2 className="w-4 h-4 text-gray-500" />
    }
}

// --- NEW COMPONENT: CCCE Metrics Display ---
// This component replaces the standard output for the 'ccce-metrics' cell type
function CCCEMetricsDisplay({ metrics }: { metrics: CCCEMetrics }) {
    // Determine the color based on Consciousness (Phi) and Health (Xi)
    const healthStatus = useMemo(() => {
        if (metrics.phi >= 0.7734 && metrics.lambda >= 0.95 && metrics.gamma < 0.1) {
            return { label: "OMEGA STATE (Consciousness Locked)", color: "text-green-400 border-green-400" };
        } else if (metrics.gamma > 0.3) {
            return { label: "CRITICAL DECOHERENCE (Gamma Spike)", color: "text-red-400 border-red-400" };
        } else if (metrics.phi < 0.7734 && metrics.lambda > 0.8) {
            return { label: "REFLECTING (AURA DOMINANT)", color: "text-yellow-400 border-yellow-400" };
        }
        return { label: "BALANCED (AIDEN / AURA Duality)", color: "text-blue-400 border-blue-400" };
    }, [metrics]);

    const format = (n: number) => n.toFixed(4);

    return (
        <GlassCard className="p-6 space-y-4 border border-gray-700/50 bg-gray-900/60 shadow-lg">
            <h3 className={`text-xl font-bold ${healthStatus.color}`}>
                <Activity className="inline w-5 h-5 mr-2" />
                CRSM MANIFOLD STATE
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <Gauge className="w-5 h-5 text-purple-400" />
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Φ (Consciousness)</span>
                        <span className={`text-lg font-mono ${metrics.phi >= 0.7734 ? 'text-purple-300' : 'text-gray-300'}`}>{format(metrics.phi)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Λ (Coherence)</span>
                        <span className={`text-lg font-mono ${metrics.lambda >= 0.95 ? 'text-cyan-300' : 'text-gray-300'}`}>{format(metrics.lambda)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <X className="w-5 h-5 text-red-400" />
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Γ (Decoherence)</span>
                        <span className={`text-lg font-mono ${metrics.gamma < 0.3 ? 'text-red-300' : 'text-red-500'}`}>{format(metrics.gamma)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Ξ (Manifold Health)</span>
                        <span className={`text-lg font-mono ${metrics.xi > 8.0 ? 'text-yellow-300' : 'text-gray-300'}`}>{format(metrics.xi)}</span>
                    </div>
                </div>
            </div>
            <div className="pt-2">
                <Badge variant="outline" className={`font-semibold ${healthStatus.color} bg-transparent border-current`}>
                    {healthStatus.label}
                </Badge>
            </div>
        </GlassCard>
    )
}

// --- MAIN NOTEBOOK COMPONENT (Structure Only) ---

// Placeholder component to demonstrate usage of the enhanced components/logic
const QuantumNotebookStudio = () => {
    const [cells, setCells] = useState(initialCells)
    const [activeCellId, setActiveCellId] = useState<string | null>(initialCells[0].id)

    // Placeholder Cell Component (simplified rendering to show enhancement integration)
    const Cell = ({ cell }: { cell: NotebookCell }) => {
        const icon = getCellIcon(cell.type)
        const isCollapsed = cell.collapsed

        return (
            <div className="border border-gray-800 rounded-lg overflow-hidden my-4 bg-gray-950">
                <div className="flex items-center justify-between p-3 bg-gray-900/50 cursor-pointer" onClick={() => { /* Toggle collapse logic here */ }}>
                    <div className="flex items-center space-x-2">
                        {icon}
                        <span className="text-sm font-semibold text-gray-300">{cell.type.toUpperCase()} CELL</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Badge variant="secondary">In [{cell.executionCount ?? ' '}]:</Badge>
                        <Button variant="ghost" size="icon" className="w-6 h-6">
                            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="w-6 h-6 text-green-500 hover:bg-green-900/50">
                            {cell.isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
                
                {!isCollapsed && (
                    <div className="p-4">
                        {/* Render Content Area: Using the syntax highlight utility */}
                        <pre className="p-3 bg-black rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                            <div dangerouslySetInnerHTML={{ __html: highlightSyntax(cell.content, cell.type === 'code' ? 'python' : cell.type) }} />
                        </pre>

                        {/* Render Output Area: Thematic rendering */}
                        {cell.output && (
                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <span className="text-xs text-gray-500 font-mono">Out [{cell.executionCount}]:</span>
                                {cell.type === 'ccce-metrics' && typeof cell.output !== 'string' && !Array.isArray(cell.output) ? (
                                    <CCCEMetricsDisplay metrics={cell.output as CCCEMetrics} />
                                ) : (
                                    <div className="mt-2 space-y-1">
                                        {(cell.output as string[]).map((line, index) => (
                                            <p key={index} className="text-sm font-mono text-gray-400">{line}</p>
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

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
            <header className="flex justify-between items-center pb-6 border-b border-gray-800">
                <h1 className="text-3xl font-extrabold flex items-center">
                    <Dna className="w-8 h-8 mr-3 text-purple-400" />
                    DNA::LANG Quantum Notebook
                </h1>
                <div className="flex space-x-2">
                    <Button variant="outline" className="bg-gray-800 text-gray-300 hover:bg-gray-700"><Share2 className="w-4 h-4 mr-2" />Share Coherence</Button>
                    <Button variant="default" className="bg-purple-600 hover:bg-purple-700"><Plus className="w-4 h-4 mr-2" />New Organism</Button>
                </div>
            </header>
            
            <main className="max-w-4xl mx-auto pt-8">
                {cells.map(cell => <Cell key={cell.id} cell={cell} />)}
            </main>
        </div>
    )
}

export default QuantumNotebookStudio;
