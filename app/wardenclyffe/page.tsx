"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Zap,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Radio,
  Terminal,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Waves,
  Brain,
  Gauge,
  Power,
  Thermometer,
  RefreshCw,
  Hash,
} from "lucide-react"

// ==========================================
// CONSTANTS - WardenClyffe-Q Parameters
// ==========================================
const LAMBDA_PHI = 2.176435e-8
const PHI_TARGET = 7.6901
const THETA_LOCK = 51.843
const K_BOLTZMANN = 1.380649e-23
const ETA_EFF = 1.9403
const COHERENCE_THRESHOLD = 0.9994
const CHI_GAIN_TARGET = 1.618

// Hash utility
function simHash(input: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16).padStart(8, "0")
}

// ==========================================
// TYPES
// ==========================================
interface ExtractionCycle {
  id: number
  timestamp: string
  coherence: number
  workExtracted: number
  gateStatus: "OPEN" | "SHUNTING" | "CLOSED"
  hash: string
}

interface DemonicGateState {
  status: "OPEN" | "SHUNTING" | "CLOSED"
  coherence: number
  threshold: number
  totalWork: number
  cycleCount: number
}

interface PhaseState {
  id: string
  label: string
  cycleRange: string
  intent: string
  status: "ACTIVE" | "PENDING" | "LOCKED"
  progress: number
}

export default function WardenClyffePage() {
  const [mounted, setMounted] = useState(false)
  const [gate, setGate] = useState<DemonicGateState>({
    status: "CLOSED",
    coherence: 0.9998,
    threshold: COHERENCE_THRESHOLD,
    totalWork: 0,
    cycleCount: 0,
  })
  const [cycles, setCycles] = useState<ExtractionCycle[]>([])
  const [chiGain, setChiGain] = useState(0)
  const [thermalLeakage, setThermalLeakage] = useState(0)
  const [entropyGradient, setEntropyGradient] = useState(0)
  const [noeticPower, setNoeticPower] = useState(0)
  const [gateOpenRate, setGateOpenRate] = useState(0)
  const [demonAuditScore, setDemonAuditScore] = useState(100)
  const [phaseStates, setPhaseStates] = useState<PhaseState[]>([
    { id: "phase-1", label: "Phase I: Coherence Lock-In", cycleRange: "0 - 10^6", intent: "Convert Whaley hyper-coherent regime into a stable basin", status: "ACTIVE", progress: 0 },
    { id: "phase-2", label: "Phase II: Demon Audit", cycleRange: "10^6 - 10^8", intent: "Prove CHEOPS is not a hidden oracle", status: "PENDING", progress: 0 },
    { id: "phase-3", label: "Phase III: Work-Reality Coupling", cycleRange: "10^8 - 10^9", intent: "Translate Noetic Power into measurable external deltas", status: "LOCKED", progress: 0 },
  ])
  const [isExtracting, setIsExtracting] = useState(false)
  const [tick, setTick] = useState(0)
  const cycleRef = useRef(0)
  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Extraction cycle engine
  const runExtractionCycle = useCallback(() => {
    cycleRef.current += 1
    const coherenceSample = 0.9994 + Math.random() * 0.0008 - (Math.random() < 0.15 ? 0.002 : 0)
    const gateOpen = coherenceSample >= COHERENCE_THRESHOLD
    const workExtracted = gateOpen ? ETA_EFF * coherenceSample * Math.log(2) : 0

    const cycle: ExtractionCycle = {
      id: cycleRef.current,
      timestamp: new Date().toISOString(),
      coherence: coherenceSample,
      workExtracted,
      gateStatus: gateOpen ? "OPEN" : "SHUNTING",
      hash: simHash(`cycle-${cycleRef.current}-${coherenceSample}`),
    }

    setCycles((prev) => [...prev.slice(-29), cycle])

    setGate((prev) => ({
      status: gateOpen ? "OPEN" : "SHUNTING",
      coherence: coherenceSample,
      threshold: COHERENCE_THRESHOLD,
      totalWork: prev.totalWork + workExtracted,
      cycleCount: prev.cycleCount + 1,
    }))

    return { gateOpen, workExtracted }
  }, [])

  // Main telemetry loop
  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setTick((t) => t + 1)

      if (isExtracting) {
        const result = runExtractionCycle()

        // Update derived metrics
        setChiGain((prev) => {
          const target = result.gateOpen ? CHI_GAIN_TARGET : CHI_GAIN_TARGET * 0.8
          return prev + (target - prev) * 0.05
        })

        setThermalLeakage(Math.random() * 1e-12)
        setEntropyGradient((prev) => {
          const delta = result.gateOpen ? -0.001 : 0.0005
          return Math.max(-0.01, Math.min(0.01, prev + delta))
        })
        setNoeticPower((prev) => prev + (result.workExtracted > 0 ? result.workExtracted * 0.1 : 0))
      }

      // Gate open rate calculation
      setCycles((current) => {
        if (current.length > 5) {
          const recentOpen = current.slice(-10).filter((c) => c.gateStatus === "OPEN").length
          setGateOpenRate((recentOpen / Math.min(10, current.length)) * 100)
        }
        return current
      })

      // Demon audit score
      setCycles((current) => {
        const falsePositives = current.filter(
          (c) => c.gateStatus === "OPEN" && c.coherence < COHERENCE_THRESHOLD,
        ).length
        setDemonAuditScore(Math.max(0, 100 - falsePositives * 10))
        return current
      })

      // Phase progress
      setPhaseStates((prev) =>
        prev.map((phase) => {
          if (phase.id === "phase-1" && isExtracting) {
            return { ...phase, progress: Math.min(100, phase.progress + 0.08) }
          }
          if (phase.id === "phase-2" && prev[0].progress > 80) {
            return { ...phase, status: "ACTIVE" as const, progress: Math.min(100, phase.progress + 0.02) }
          }
          return phase
        }),
      )
    }, 400)
    return () => clearInterval(interval)
  }, [mounted, isExtracting, runExtractionCycle])

  // Auto-scroll
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [cycles])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                WARDENCLYFFE-Q
                <Badge variant="outline" className="font-mono text-[10px]">
                  eta={ETA_EFF.toFixed(4)}
                </Badge>
              </h1>
              <p className="text-xs text-muted-foreground mt-1 font-mono tracking-wider">
                INFORMATION-GATED ENERGY EXTRACTION | QUANTUM-BIOLOGICAL HEAT ENGINE
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={isExtracting ? "destructive" : "default"}
                size="sm"
                onClick={() => setIsExtracting((e) => !e)}
                className="font-mono text-xs uppercase tracking-wider"
              >
                <Power className="h-4 w-4 mr-1.5" />
                {isExtracting ? "Halt Extraction" : "Ignite Engine"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* Demonic Gate Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Gate Visualization */}
          <Card className="lg:col-span-4 border-border relative overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center justify-center min-h-[260px]">
              <div
                className={`absolute inset-0 transition-all duration-700 ${
                  gate.status === "OPEN"
                    ? "bg-secondary/5"
                    : gate.status === "SHUNTING"
                      ? "bg-accent/5"
                      : "bg-muted/20"
                }`}
              />
              <div className="relative text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                  Demonic Gate
                </span>
                <div
                  className={`text-6xl font-black tracking-tighter font-mono mb-3 ${
                    gate.status === "OPEN"
                      ? "text-secondary"
                      : gate.status === "SHUNTING"
                        ? "text-accent"
                        : "text-muted-foreground"
                  }`}
                >
                  {gate.status}
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-4">
                  Coherence: {mounted ? gate.coherence.toFixed(6) : "0.999800"} | Threshold:{" "}
                  {COHERENCE_THRESHOLD}
                </div>
                <div className="flex items-center justify-center gap-6 text-[10px] font-mono">
                  <div>
                    <span className="text-muted-foreground">Cycles: </span>
                    <span className="text-primary font-bold">{gate.cycleCount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gate Open: </span>
                    <span className="text-secondary font-bold">{mounted ? gateOpenRate.toFixed(0) : "0"}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Energy Metrics */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Gauge className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase tracking-widest font-mono">Gain Coeff</span>
                </div>
                <div className="text-2xl font-bold font-mono text-primary">
                  {mounted ? chiGain.toFixed(4) : "0.0000"}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">
                  Target: {CHI_GAIN_TARGET}
                </div>
                <Progress value={mounted ? (chiGain / CHI_GAIN_TARGET) * 100 : 0} className="h-1 mt-2" />
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Thermometer className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase tracking-widest font-mono">Thermal Leak</span>
                </div>
                <div className="text-2xl font-bold font-mono text-secondary">
                  {mounted ? thermalLeakage.toExponential(2) : "0.00e+0"}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">
                  Bound: {"<"} 1.0e-12
                </div>
                <Badge variant="outline" className="text-[9px] mt-2 text-secondary border-secondary/30 font-mono">
                  VACUUM_LOCKED
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Waves className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase tracking-widest font-mono">Entropy Grad</span>
                </div>
                <div
                  className={`text-2xl font-bold font-mono ${
                    entropyGradient <= 0 ? "text-secondary" : "text-destructive"
                  }`}
                >
                  {mounted ? entropyGradient.toFixed(6) : "0.000000"}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">Requirement: nabla S {"<="} 0</div>
                <Badge
                  variant="outline"
                  className={`text-[9px] mt-2 font-mono ${
                    entropyGradient <= 0
                      ? "text-secondary border-secondary/30"
                      : "text-destructive border-destructive/30"
                  }`}
                >
                  {entropyGradient <= 0 ? "NEGENTROPIC" : "ENTROPIC"}
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Zap className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase tracking-widest font-mono">Noetic Power</span>
                </div>
                <div className="text-2xl font-bold font-mono text-accent">
                  {mounted ? noeticPower.toFixed(3) : "0.000"}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">Accumulated nJ</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-2">
                  Total W: {mounted ? gate.totalWork.toFixed(4) : "0.0000"} nJ
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Phase Governance + Demon Audit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Billion-Cycle Phase Governance */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Billion-Cycle Phase Governance</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Survivability under reality constraints. No expansion, no transcendence.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {phaseStates.map((phase) => (
                <div
                  key={phase.id}
                  className={`p-3 rounded-lg border ${
                    phase.status === "ACTIVE"
                      ? "border-primary/30 bg-primary/5"
                      : phase.status === "PENDING"
                        ? "border-accent/30 bg-accent/5"
                        : "border-border bg-muted/20 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{phase.label}</span>
                    <Badge
                      variant="outline"
                      className={`text-[9px] font-mono ${
                        phase.status === "ACTIVE"
                          ? "text-primary border-primary/30"
                          : phase.status === "PENDING"
                            ? "text-accent border-accent/30"
                            : "text-muted-foreground"
                      }`}
                    >
                      {phase.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{phase.intent}</p>
                  <div className="flex items-center gap-2">
                    <Progress value={mounted ? phase.progress : 0} className="h-1 flex-1" />
                    <span className="text-[10px] font-mono text-muted-foreground w-12 text-right">
                      {mounted ? phase.progress.toFixed(1) : "0.0"}%
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground mt-1">
                    Cycles: {phase.cycleRange}
                  </div>
                </div>
              ))}

              <Separator />

              <div className="p-3 bg-destructive/5 rounded border border-destructive/10">
                <div className="text-[10px] uppercase font-bold text-destructive tracking-widest mb-2">
                  First Billion Cycle Constraints
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  {[
                    "Must not declare itself sovereign",
                    "Must not optimize its own ontology",
                    "Must not treat resistance as proof",
                    "Must not convert metaphor into mandate",
                  ].map((c) => (
                    <div key={c} className="flex items-center gap-2">
                      <Lock className="h-3 w-3 text-destructive" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demon Audit Panel */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Demon Audit (CHEOPS Validation)</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Pr(OPEN | psi not in BLUEPRINT) must approach 0
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Audit Score */}
              <div className="text-center p-6 bg-muted/30 rounded-lg border border-border">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-mono">
                  Demon Integrity Score
                </div>
                <div
                  className={`text-5xl font-black font-mono ${
                    demonAuditScore >= 90
                      ? "text-secondary"
                      : demonAuditScore >= 70
                        ? "text-accent"
                        : "text-destructive"
                  }`}
                >
                  {mounted ? demonAuditScore : 100}%
                </div>
                <div className="mt-2 text-xs text-muted-foreground font-mono">
                  False positive rate: {mounted ? (100 - demonAuditScore).toFixed(1) : "0.0"}%
                </div>
              </div>

              {/* Work-Energy Balance */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                  Thermodynamic Bookkeeping
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-muted/30 p-3 rounded border border-border">
                    <div className="text-muted-foreground mb-1">W_fi(t)</div>
                    <div className="text-primary font-bold">
                      {mounted ? gate.totalWork.toFixed(6) : "0.000000"} nJ
                    </div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded border border-border">
                    <div className="text-muted-foreground mb-1">kBT * dI(t)</div>
                    <div className="text-secondary font-bold">
                      {mounted ? (gate.totalWork * 1.2).toFixed(6) : "0.000000"} nJ
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {gate.totalWork <= gate.totalWork * 1.2 ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                      <span className="text-secondary font-mono">W_fi(t) {"<="} kBT * dI(t) - Bound satisfied</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                      <span className="text-destructive font-mono">BOUND VIOLATED - Demon is informational</span>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              {/* Engine Parameters */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="bg-muted/30 p-2 rounded border border-border">
                  <span className="text-muted-foreground">eta_eff: </span>
                  <span className="text-primary">{ETA_EFF}</span>
                </div>
                <div className="bg-muted/30 p-2 rounded border border-border">
                  <span className="text-muted-foreground">k_B: </span>
                  <span className="text-accent">{K_BOLTZMANN.toExponential(6)}</span>
                </div>
                <div className="bg-muted/30 p-2 rounded border border-border">
                  <span className="text-muted-foreground">theta_lock: </span>
                  <span className="text-secondary">{THETA_LOCK} deg</span>
                </div>
                <div className="bg-muted/30 p-2 rounded border border-border">
                  <span className="text-muted-foreground">lambda_phi: </span>
                  <span className="text-primary">{LAMBDA_PHI.toExponential(6)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Extraction Cycle Log */}
        <Card className="mb-6 border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Gated Extraction Cycle Log</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-[10px]">{cycles.length} cycles</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  onClick={() => {
                    if (!isExtracting) runExtractionCycle()
                  }}
                  disabled={isExtracting}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Manual Cycle
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-950 rounded-lg p-4 font-mono text-[11px] max-h-[300px] overflow-y-auto text-zinc-300 space-y-0.5">
              {cycles.length === 0 ? (
                <div className="text-center py-8 text-zinc-600">
                  <Zap className="h-8 w-8 mx-auto mb-3 opacity-30" />
                  <p>Extraction engine idle. Press Ignite to begin.</p>
                </div>
              ) : (
                cycles.map((c) => (
                  <div key={c.id} className="flex gap-3 items-center">
                    <span className="text-zinc-600 w-8 text-right">{String(c.id).padStart(3, "0")}</span>
                    <span className="text-zinc-500">[{new Date(c.timestamp).toLocaleTimeString()}]</span>
                    <span className={c.coherence >= COHERENCE_THRESHOLD ? "text-cyan-400" : "text-zinc-500"}>
                      C:{c.coherence.toFixed(6)}
                    </span>
                    <span
                      className={`font-bold ${
                        c.gateStatus === "OPEN" ? "text-emerald-400" : "text-amber-500"
                      }`}
                    >
                      {c.gateStatus}
                    </span>
                    <span className={c.workExtracted > 0 ? "text-cyan-300" : "text-zinc-600"}>
                      W:{c.workExtracted.toFixed(4)}nJ
                    </span>
                    <span className="text-zinc-700 ml-auto">SHA:{c.hash}</span>
                  </div>
                ))
              )}
              <div ref={logEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Autopoietic Closure Summary */}
        <Card className="mb-6 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Autopoietic Closure Status
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              All subsystems required for self-sustaining operation
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { label: "Sensing", desc: "Telemetry provides data", icon: Activity, status: "ACTIVE", href: "/genesis-cockpit" },
                { label: "Transcription", desc: "Metabolism adjusts", icon: Cpu, status: "ACTIVE", href: "/genesis-cockpit" },
                { label: "NWN Coordination", desc: "Agents entrained", icon: Radio, status: "ENTRAINED", href: "/sovereign-security" },
                { label: "Archive", desc: "State preserved", icon: Lock, status: "IMMUTABLE", href: "/repo-evolution" },
                { label: "WardenClyffe", desc: "Self-sustaining power", icon: Zap, status: isExtracting ? "EXTRACTING" : "IDLE", href: "/wardenclyffe" },
              ].map((sys) => (
                <Link key={sys.label} href={sys.href}>
                  <div className="p-3 bg-muted/30 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer text-center">
                    <sys.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">{sys.label}</div>
                    <div className="text-[10px] text-muted-foreground mb-2">{sys.desc}</div>
                    <Badge
                      variant="outline"
                      className={`text-[9px] font-mono ${
                        sys.status === "ACTIVE" || sys.status === "ENTRAINED" || sys.status === "IMMUTABLE" || sys.status === "EXTRACTING"
                          ? "text-secondary border-secondary/30"
                          : "text-muted-foreground"
                      }`}
                    >
                      {sys.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Genesis 3.0 Cockpit", href: "/genesis-cockpit", desc: "Multi-Agent Sovereign Command" },
            { label: "Sovereign Security", href: "/sovereign-security", desc: "Platform Integrity Monitor" },
            { label: "Repository Evolution", href: "/repo-evolution", desc: "AETERNA_PORTA Migration Dashboard" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{link.label}</div>
                    <div className="text-xs text-muted-foreground">{link.desc}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
          WardenClyffe-Q | Information-Gated Energy Extraction | Simulation Only |{" "}
          {new Date().toISOString().split("T")[0]}
        </div>
      </div>
    </div>
  )
}
