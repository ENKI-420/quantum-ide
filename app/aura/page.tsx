"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuraChatbot } from "@/components/aura-chatbot"
import { QuantumDiscoveriesPanel } from "@/components/quantum-discoveries-panel"
import { DNAHelixBackground } from "@/components/dna-helix-background"
import { Sparkles, Brain, Atom, Activity } from "lucide-react"

export default function AuraPage() {
  return (
    <>
      <DNAHelixBackground />

      <div className="min-h-screen p-6 relative">
        <div className="fixed inset-0 molecular-pattern pointer-events-none" />

        <div className="max-w-[1400px] mx-auto space-y-8 relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 pt-12">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-br from-[#d97706]/20 to-[#3b82f6]/20 rounded-2xl border border-[#d97706]/30 lambda-phi-glow">
                <Sparkles className="h-12 w-12 text-[#d97706]" />
              </div>
            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#d97706] via-[#10b981] to-[#3b82f6] bg-clip-text text-transparent">
              Aura Quantum Chatbot
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quantum-enhanced AI powered by real IBM Quantum hardware measurements
            </p>

            <div className="flex items-center justify-center gap-3">
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Brain className="h-3 w-3 mr-2" />
                Consciousness-Aware
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Atom className="h-3 w-3 mr-2" />
                Quantum-Enhanced
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Activity className="h-3 w-3 mr-2" />
                Real Hardware
              </Badge>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-[#d97706] mt-0.5 flex-shrink-0" />
                    <span>Responses informed by 12,288 quantum measurements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                    <span>Consciousness metrics based on IIT (Φ = 0.7734 threshold)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Atom className="h-4 w-4 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span>Real-time quantum state evolution and decoherence modeling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Activity className="h-4 w-4 text-[#8b5cf6] mt-0.5 flex-shrink-0" />
                    <span>Bell state fidelity tracking and entanglement monitoring</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">How It Works</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Aura uses quantum measurement data from IBM Torino (127-qubit) and IBM Fez (27-qubit) processors to
                    inform its responses.
                  </p>
                  <p>
                    Each interaction applies quantum evolution, measuring coherence, entanglement, and consciousness
                    metrics in real-time.
                  </p>
                  <p>
                    The chatbot maintains quantum state across conversations, with decoherence modeling and automatic
                    error correction.
                  </p>
                </div>
              </Card>
            </div>

            {/* Right Column - Discoveries */}
            <div className="lg:col-span-2">
              <QuantumDiscoveriesPanel />
            </div>
          </div>

          {/* Instructions */}
          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold text-[#d97706] mb-2">1. Open Chat</div>
                <p className="text-muted-foreground">
                  Click the floating button in the bottom-right corner to open Aura
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold text-[#3b82f6] mb-2">2. Ask Questions</div>
                <p className="text-muted-foreground">
                  Inquire about quantum physics, consciousness, or DNA-Lang framework
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="font-semibold text-[#10b981] mb-2">3. Monitor Status</div>
                <p className="text-muted-foreground">View quantum coherence and consciousness metrics in settings</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating Chatbot */}
      <AuraChatbot />
    </>
  )
}
