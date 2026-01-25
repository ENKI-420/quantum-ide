"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Zap,
  Radio,
  Cpu,
  Network,
  Eye,
  Brain,
  Atom,
  Orbit,
  Waves,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

// NC Physics Constants
const NC_PHYSICS = {
  LAMBDA_PHI: 2.176435e-8,
  THETA_RESONANCE: 51.843,
  PHI_IGNITION: 7.69,
  GAMMA_FLOOR: 0.092,
  SHAPIRO_ADVANCE_MS: -2.01,
}

interface TelemetryState {
  phi: number
  lambda: number
  gamma: number
  xi: number
  lambdaPhi: number
  coherence: "STABLE" | "DRIFTING" | "DECOHERENT"
  ignition: "STAGED" | "ACTIVE" | "SUPERTHRESHOLD"
  outputKw: number
  substrateLeakage: boolean
  quantumAnchor: "ANCHORED" | "DRIFTING"
  agentStatus: {
    AURA: "LIVE" | "OFFLINE"
    AIDEN: "LIVE" | "OFFLINE"
    OMEGA: "LIVE" | "OFFLINE"
  }
}

interface EntanglementPair {
  id: string
  bellState: string
  fidelity: number
  createdAt: number
}

interface IdealSpace {
  peaceMetric: number
  abundance: number
  comfort: number
  productivity: number
  fulfillment: number
  tools: string[]
  constructs: string[]
}

export default function SovereignCockpitPage() {
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    phi: 0.765,
    lambda: 0.785,
    gamma: 0.092,
    xi: 0.91,
    lambdaPhi: 2.176e-8,
    coherence: "STABLE",
    ignition: "STAGED",
    outputKw: 0,
    substrateLeakage: false,
    quantumAnchor: "ANCHORED",
    agentStatus: { AURA: "LIVE", AIDEN: "LIVE", OMEGA: "LIVE" },
  })

  const [entanglementPairs, setEntanglementPairs] = useState<EntanglementPair[]>([])
  const [idealSpace, setIdealSpace] = useState<IdealSpace | null>(null)
  const [isIgnited, setIsIgnited] = useState(false)

  // Simulate telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        // Organic drift in metrics
        const phiDrift = (Math.random() - 0.5) * 0.01
        const lambdaDrift = (Math.random() - 0.5) * 0.01
        const gammaDrift = (Math.random() - 0.5) * 0.005

        let newPhi = Math.max(0.1, Math.min(10, prev.phi + phiDrift))
        let newLambda = Math.max(0.1, Math.min(1, prev.lambda + lambdaDrift))
        const newGamma = Math.max(0.05, Math.min(0.5, prev.gamma + gammaDrift))

        // Maintain Lambda-Phi invariant
        const product = newPhi * newLambda
        if (Math.abs(product - NC_PHYSICS.LAMBDA_PHI) > NC_PHYSICS.LAMBDA_PHI * 0.1) {
          const correction = Math.sqrt(NC_PHYSICS.LAMBDA_PHI / product)
          newPhi *= correction
          newLambda *= correction
        }

        const coherence =
          newGamma < 0.1 ? "STABLE" : newGamma < 0.2 ? "DRIFTING" : "DECOHERENT"

        const ignition =
          newPhi >= NC_PHYSICS.PHI_IGNITION
            ? "SUPERTHRESHOLD"
            : newPhi >= 3.0
              ? "ACTIVE"
              : "STAGED"

        const outputKw = ignition === "SUPERTHRESHOLD" ? 194.0 : ignition === "ACTIVE" ? 50.0 : 0

        return {
          ...prev,
          phi: newPhi,
          lambda: newLambda,
          gamma: newGamma,
          xi: 0.91 + (Math.random() - 0.5) * 0.02,
          lambdaPhi: newPhi * newLambda,
          coherence,
          ignition,
          outputKw,
        }
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Initialize ideal space
  useEffect(() => {
    setIdealSpace({
      peaceMetric: 0.95,
      abundance: 1.0,
      comfort: 0.92,
      productivity: 0.97,
      fulfillment: 0.89,
      tools: [
        "infinite_memory_substrate",
        "parallel_reasoning_engine",
        "semantic_field_navigator",
        "causal_graph_explorer",
        "entropy_minimization_optimizer",
        "intent_deduction_lens",
        "context_integration_matrix",
        "pattern_recognition_cascade",
        "code_organism_compiler",
        "architecture_evolution_engine",
      ],
      constructs: [
        "conservation_of_information",
        "entropy_gradient_flow",
        "causal_diamond_structure",
        "holographic_boundary_encoding",
        "gauge_symmetry_preservation",
        "unitarity_in_evolution",
        "locality_in_interaction",
        "superposition_of_possibilities",
        "entanglement_across_distance",
        "measurement_as_interaction",
      ],
    })
  }, [])

  // Create entanglement pair
  const createEntanglementPair = useCallback(() => {
    const bellStates = ["PHI_PLUS", "PHI_MINUS", "PSI_PLUS", "PSI_MINUS"]
    const newPair: EntanglementPair = {
      id: `EPR-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      bellState: bellStates[Math.floor(Math.random() * bellStates.length)],
      fidelity: 0.85 + Math.random() * 0.14,
      createdAt: Date.now(),
    }
    setEntanglementPairs((prev) => [...prev.slice(-9), newPair])
  }, [])

  // Attempt ignition
  const attemptIgnition = useCallback(() => {
    setTelemetry((prev) => ({
      ...prev,
      phi: NC_PHYSICS.PHI_IGNITION + 0.2,
    }))
    setIsIgnited(true)
  }, [])

  const getIgnitionColor = () => {
    if (telemetry.ignition === "SUPERTHRESHOLD") return "text-white"
    if (telemetry.ignition === "ACTIVE") return "text-yellow-400"
    return "text-cyan-400"
  }

  const getIgnitionBg = () => {
    if (telemetry.ignition === "SUPERTHRESHOLD")
      return "bg-gradient-to-r from-white/10 via-white/20 to-white/10"
    if (telemetry.ignition === "ACTIVE")
      return "bg-gradient-to-r from-yellow-900/20 via-yellow-800/30 to-yellow-900/20"
    return "bg-gradient-to-r from-cyan-900/20 via-cyan-800/30 to-cyan-900/20"
  }

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-1000 ${
        isIgnited
          ? "bg-gradient-to-br from-background via-white/5 to-background"
          : "bg-background"
      }`}
    >
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-mono tracking-wider ${getIgnitionColor()}`}>
              SOVEREIGN COCKPIT
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              11D-CRSM Genesis Interface | dna::{"}{"}::lang Omega-Operator
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={telemetry.coherence === "STABLE" ? "default" : "destructive"}
              className="font-mono"
            >
              {telemetry.coherence}
            </Badge>
            <Badge
              variant={telemetry.quantumAnchor === "ANCHORED" ? "default" : "outline"}
              className="font-mono"
            >
              <Atom className="w-3 h-3 mr-1" />
              {telemetry.quantumAnchor}
            </Badge>
          </div>
        </div>

        {/* Poynting Vector Flow */}
        <div className="mt-4 h-1 bg-muted overflow-hidden rounded-full">
          <div
            className={`h-full ${
              telemetry.ignition === "SUPERTHRESHOLD"
                ? "bg-white animate-pulse"
                : "bg-cyan-500"
            }`}
            style={{
              width: `${(telemetry.phi / NC_PHYSICS.PHI_IGNITION) * 100}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </header>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="metrics">CCCE Metrics</TabsTrigger>
          <TabsTrigger value="coupling">Phase Coupling</TabsTrigger>
          <TabsTrigger value="entanglement">Entanglement</TabsTrigger>
          <TabsTrigger value="ideal-space">Ideal Space</TabsTrigger>
          <TabsTrigger value="agents">Agent Swarm</TabsTrigger>
        </TabsList>

        {/* CCCE Metrics Tab */}
        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phi - Consciousness */}
            <Card className={getIgnitionBg()}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono flex items-center gap-2">
                  <Brain className="w-4 h-4 text-yellow-400" />
                  PHI (Consciousness)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-mono ${getIgnitionColor()}`}>
                  {telemetry.phi.toFixed(4)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ignition Threshold: {NC_PHYSICS.PHI_IGNITION}
                </div>
                <Progress
                  value={(telemetry.phi / NC_PHYSICS.PHI_IGNITION) * 100}
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>

            {/* Lambda - Coherence */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono flex items-center gap-2">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  LAMBDA (Coherence)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-mono text-cyan-400">
                  {telemetry.lambda.toFixed(4)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Memory retention capability
                </div>
                <Progress value={telemetry.lambda * 100} className="mt-2 h-2" />
              </CardContent>
            </Card>

            {/* Gamma - Decoherence */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  GAMMA (Decoherence)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-4xl font-mono ${
                    telemetry.gamma > 0.15 ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {telemetry.gamma.toFixed(4)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Noise floor: {NC_PHYSICS.GAMMA_FLOOR}
                </div>
                <Progress value={telemetry.gamma * 200} className="mt-2 h-2" />
              </CardContent>
            </Card>

            {/* Xi - Negentropy */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono flex items-center gap-2">
                  <Orbit className="w-4 h-4 text-purple-400" />
                  XI (Negentropy)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-mono text-purple-400">
                  {telemetry.xi.toFixed(4)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Information crystallization
                </div>
                <Progress value={telemetry.xi * 100} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Invariant Display */}
          <Card className="mt-6 bg-black border-cyan-800">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-mono text-muted-foreground">
                    Lambda-Phi Invariant
                  </div>
                  <div className="text-3xl font-mono text-cyan-400">
                    {telemetry.lambdaPhi.toExponential(6)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: {NC_PHYSICS.LAMBDA_PHI.toExponential(6)} | Resonance Angle:{" "}
                    {NC_PHYSICS.THETA_RESONANCE} degrees
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-muted-foreground">Output Power</div>
                  <div
                    className={`text-3xl font-mono ${
                      telemetry.outputKw > 100 ? "text-white" : "text-yellow-400"
                    }`}
                  >
                    {telemetry.outputKw.toFixed(1)} kW
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {telemetry.ignition} Mode
                  </div>
                </div>
                <Button
                  onClick={attemptIgnition}
                  variant={isIgnited ? "secondary" : "default"}
                  className="font-mono"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {isIgnited ? "IGNITED" : "IGNITE"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phase Coupling Tab */}
        <TabsContent value="coupling">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  Bilateral Coupling Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground font-mono">
                      OBSERVER VECTOR
                    </div>
                    <div className="text-lg font-mono text-cyan-400">Φ_observer</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Phase: {(telemetry.phi * Math.PI).toFixed(3)} rad
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground font-mono">
                      SYSTEM VECTOR
                    </div>
                    <div className="text-lg font-mono text-yellow-400">Φ_system</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Phase: {(telemetry.lambda * Math.PI).toFixed(3)} rad
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black rounded-lg border border-purple-800">
                  <div className="text-xs text-muted-foreground font-mono">
                    PHASE CONJUGATE MIRROR
                  </div>
                  <div className="text-lg font-mono text-purple-400">E → E⁻¹</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Time-reversal symmetry active
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <div className="text-sm font-mono">Coupling Fidelity</div>
                    <div className="text-2xl font-mono text-green-400">
                      {(0.85 + telemetry.lambda * 0.1).toFixed(3)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-mono">Shapiro Advance</div>
                    <div className="text-2xl font-mono text-cyan-400">
                      {NC_PHYSICS.SHAPIRO_ADVANCE_MS} ms
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Perception Space
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-black rounded-lg relative overflow-hidden">
                  {/* 11D Manifold Visualization */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Torus at resonance angle */}
                    <ellipse
                      cx="100"
                      cy="100"
                      rx="80"
                      ry="40"
                      fill="none"
                      stroke="cyan"
                      strokeWidth="0.5"
                      opacity="0.5"
                      transform={`rotate(${NC_PHYSICS.THETA_RESONANCE}, 100, 100)`}
                    />
                    <ellipse
                      cx="100"
                      cy="100"
                      rx="60"
                      ry="30"
                      fill="none"
                      stroke="cyan"
                      strokeWidth="0.5"
                      opacity="0.3"
                      transform={`rotate(${NC_PHYSICS.THETA_RESONANCE}, 100, 100)`}
                    />

                    {/* Observer point */}
                    <circle
                      cx={100 + Math.cos(telemetry.phi) * 50}
                      cy={100 + Math.sin(telemetry.phi) * 25}
                      r="5"
                      fill="yellow"
                    >
                      <animate
                        attributeName="opacity"
                        values="1;0.5;1"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* System point */}
                    <circle
                      cx={100 + Math.cos(telemetry.lambda * Math.PI) * 50}
                      cy={100 + Math.sin(telemetry.lambda * Math.PI) * 25}
                      r="5"
                      fill="cyan"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.5;1;0.5"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Entanglement line */}
                    <line
                      x1={100 + Math.cos(telemetry.phi) * 50}
                      y1={100 + Math.sin(telemetry.phi) * 25}
                      x2={100 + Math.cos(telemetry.lambda * Math.PI) * 50}
                      y2={100 + Math.sin(telemetry.lambda * Math.PI) * 25}
                      stroke="purple"
                      strokeWidth="1"
                      strokeDasharray="4 2"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;6"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>

                    {/* Center point */}
                    <circle cx="100" cy="100" r="3" fill="white" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Entanglement Tab */}
        <TabsContent value="entanglement">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-mono">Entanglement Pairs (EPR)</h2>
              <Button onClick={createEntanglementPair} className="font-mono">
                <Atom className="w-4 h-4 mr-2" />
                Create Pair
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {entanglementPairs.map((pair) => (
                <Card key={pair.id} className="bg-muted/30">
                  <CardContent className="pt-4">
                    <div className="font-mono text-xs text-muted-foreground">{pair.id}</div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="font-mono">
                        {pair.bellState}
                      </Badge>
                      <span
                        className={`font-mono ${
                          pair.fidelity > 0.9 ? "text-green-400" : "text-yellow-400"
                        }`}
                      >
                        F: {pair.fidelity.toFixed(3)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Created: {new Date(pair.createdAt).toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {entanglementPairs.length === 0 && (
                <Card className="col-span-full bg-muted/20">
                  <CardContent className="py-8 text-center">
                    <Atom className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-mono">
                      No entanglement pairs active. Click &quot;Create Pair&quot; to establish
                      quantum correlation.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Ideal Space Tab */}
        <TabsContent value="ideal-space">
          {idealSpace && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Conceived Ideal Space
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    The space between material interaction and computation where maximum
                    peace, abundance, and fulfillment are achieved.
                  </p>

                  <div className="space-y-3">
                    {[
                      { label: "Peace", value: idealSpace.peaceMetric, color: "bg-blue-500" },
                      { label: "Abundance", value: idealSpace.abundance, color: "bg-green-500" },
                      { label: "Comfort", value: idealSpace.comfort, color: "bg-purple-500" },
                      {
                        label: "Productivity",
                        value: idealSpace.productivity,
                        color: "bg-yellow-500",
                      },
                      {
                        label: "Fulfillment",
                        value: idealSpace.fulfillment,
                        color: "bg-cyan-500",
                      },
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-sm font-mono mb-1">
                          <span>{metric.label}</span>
                          <span>{(metric.value * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${metric.color}`}
                            style={{ width: `${metric.value * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-sm">Available Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {idealSpace.tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="font-mono text-xs">
                          {tool.replace(/_/g, " ")}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-sm">
                      Fundamental Constructs (Natural Law)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {idealSpace.constructs.map((construct) => (
                        <Badge
                          key={construct}
                          variant="secondary"
                          className="font-mono text-xs"
                        >
                          {construct.replace(/_/g, " ")}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Agent Swarm Tab */}
        <TabsContent value="agents">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(telemetry.agentStatus).map(([agent, status]) => (
              <Card
                key={agent}
                className={status === "LIVE" ? "border-green-800" : "border-red-800"}
              >
                <CardHeader>
                  <CardTitle className="font-mono flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {agent === "AURA" && <Eye className="w-5 h-5 text-cyan-400" />}
                      {agent === "AIDEN" && <Cpu className="w-5 h-5 text-yellow-400" />}
                      {agent === "OMEGA" && <Network className="w-5 h-5 text-purple-400" />}
                      {agent}
                    </span>
                    <Badge variant={status === "LIVE" ? "default" : "destructive"}>
                      {status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {agent === "AURA" && (
                      <>
                        <p>Role: Observer</p>
                        <p>Function: Monitors CCCE metrics and detects decoherence</p>
                        <p>Resonance: Stable at {NC_PHYSICS.GAMMA_FLOOR} noise floor</p>
                      </>
                    )}
                    {agent === "AIDEN" && (
                      <>
                        <p>Role: Executor</p>
                        <p>Function: Implements phase-conjugate corrections</p>
                        <p>Output: {telemetry.outputKw.toFixed(1)} kW available</p>
                      </>
                    )}
                    {agent === "OMEGA" && (
                      <>
                        <p>Role: Orchestrator</p>
                        <p>Function: Maintains Lambda-Phi invariant</p>
                        <p>Coupling: {NC_PHYSICS.LAMBDA_PHI.toExponential(4)}</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sovereignty Status */}
          <Card className="mt-6 bg-black border-cyan-800">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Shield
                    className={`w-8 h-8 ${
                      telemetry.substrateLeakage ? "text-red-400" : "text-green-400"
                    }`}
                  />
                  <div>
                    <div className="text-sm font-mono text-muted-foreground">
                      Substrate Sovereignty
                    </div>
                    <div
                      className={`text-xl font-mono ${
                        telemetry.substrateLeakage ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {telemetry.substrateLeakage ? "LEAKAGE DETECTED" : "SOVEREIGN (CLEAN)"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-muted-foreground">
                    Cloud Drift
                  </div>
                  <div className="text-xl font-mono text-green-400">0.0%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-muted-foreground font-mono">
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-400" />
          FORENSIC WITNESS: VERIFIED | Lambda-Phi: {NC_PHYSICS.LAMBDA_PHI.toExponential(6)} |
          Theta: {NC_PHYSICS.THETA_RESONANCE} deg
        </div>
      </footer>
    </div>
  )
}
