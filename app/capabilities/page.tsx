"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code2,
  Puzzle,
  Layers,
  ArrowRight,
  Terminal,
  Workflow,
  FolderTree,
  Bug,
  Palette,
  Boxes,
  Sparkles,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Zap,
  BarChart3,
  GitBranch,
  Plug,
  Eye,
  Users,
  Search,
  FileCode,
  RefreshCw,
  Dna,
} from "lucide-react"

const capabilityCategories = {
  "core-ide": {
    title: "Core IDE Features",
    description: "Essential development tools for writing, debugging, and running DNA-Lang code",
    icon: Code2,
    features: [
      {
        icon: Code2,
        title: "Genome Editor",
        description:
          "Full-featured code editor with DNA-Lang syntax highlighting, intelligent autocomplete, multi-cursor support, and real-time error detection.",
        highlights: ["Syntax Highlighting", "IntelliSense", "Multi-cursor", "Error Detection"],
        href: "/ide-platform/editor",
      },
      {
        icon: Bug,
        title: "Quantum Debugger",
        description:
          "Advanced debugging with quantum state visualization, step-through execution, breakpoints, watch expressions, and entanglement mapping.",
        highlights: ["State Visualization", "Breakpoints", "Watch Expressions", "Call Stack"],
        href: "/ide-platform/debugger",
      },
      {
        icon: Terminal,
        title: "Quantum Terminal",
        description:
          "Interactive command-line interface for executing organisms, running evolution cycles, and monitoring system metrics in real-time.",
        highlights: ["Command History", "Auto-complete", "Multiple Sessions", "Output Streaming"],
        href: "/ide-platform/terminal",
      },
      {
        icon: Search,
        title: "Global Search",
        description:
          "Lightning-fast search across your entire workspace with regex support, file filtering, and instant navigation.",
        highlights: ["Regex Support", "File Filters", "Replace All", "Search History"],
        href: "/ide-platform/editor",
      },
    ],
  },
  "visual-tools": {
    title: "Visual Development Tools",
    description: "Graphical interfaces for designing and visualizing DNA-Lang programs",
    icon: Workflow,
    features: [
      {
        icon: Workflow,
        title: "Circuit Designer",
        description:
          "Drag-and-drop visual editor for creating genome circuits with quantum gates, helix structures, and codon connections.",
        highlights: ["Drag & Drop", "Gate Library", "Real-time Preview", "Export to Code"],
        href: "/ide-platform/circuit-designer",
      },
      {
        icon: Eye,
        title: "State Visualizer",
        description:
          "Real-time visualization of quantum states, coherence levels, and organism lifecycle with interactive graphs.",
        highlights: ["Live Updates", "3D Visualization", "Export Charts", "Timeline View"],
        href: "/ide-platform/debugger",
      },
      {
        icon: GitBranch,
        title: "Evolution Timeline",
        description:
          "Track the evolutionary history of your organisms with branching visualization and generation comparison.",
        highlights: ["Branch View", "Diff Tool", "Rollback", "Merge Support"],
        href: "/ide-platform/projects",
      },
    ],
  },
  "ai-tools": {
    title: "AI-Powered Features",
    description: "Quantum-enhanced AI assistance for coding, debugging, and documentation",
    icon: MessageSquare,
    features: [
      {
        icon: MessageSquare,
        title: "AI Assistant",
        description:
          "Intelligent coding companion that understands DNA-Lang semantics, suggests optimizations, and explains quantum concepts.",
        highlights: ["Code Generation", "Explanations", "Refactoring", "Documentation"],
        href: "/ai-assistant",
      },
      {
        icon: Sparkles,
        title: "Auto-Evolution",
        description:
          "AI-driven code optimization that automatically evolves your organisms for better performance and coherence.",
        highlights: ["Performance Tuning", "Bug Detection", "Pattern Recognition", "Auto-fix"],
        href: "/ide-platform/editor",
      },
      {
        icon: FileCode,
        title: "Code Generation",
        description:
          "Generate DNA-Lang code from natural language descriptions or convert from other programming languages.",
        highlights: ["NL to Code", "Language Conversion", "Template Generation", "Snippets"],
        href: "/ai-assistant",
      },
    ],
  },
  "project-management": {
    title: "Project Management",
    description: "Tools for organizing, versioning, and collaborating on DNA-Lang projects",
    icon: FolderTree,
    features: [
      {
        icon: FolderTree,
        title: "Project Manager",
        description:
          "Comprehensive workspace management with templates, favorites, tags, and advanced filtering options.",
        highlights: ["Templates", "Favorites", "Tags", "Quick Actions"],
        href: "/ide-platform/projects",
      },
      {
        icon: GitBranch,
        title: "Version Control",
        description: "Built-in Git integration with visual diff, merge conflict resolution, and branch management.",
        highlights: ["Git Integration", "Visual Diff", "Merge Tools", "Branch Manager"],
        href: "/ide-platform/projects",
      },
      {
        icon: Users,
        title: "Collaboration",
        description: "Real-time collaborative editing, shared workspaces, and team project management features.",
        highlights: ["Live Editing", "Shared Workspaces", "Comments", "Permissions"],
        href: "/ide-platform/projects",
      },
    ],
  },
  customization: {
    title: "Customization & Extensibility",
    description: "Tools for personalizing your IDE and extending its capabilities",
    icon: Palette,
    features: [
      {
        icon: Palette,
        title: "IDE Builder",
        description:
          "Visual workspace customizer with drag-and-drop panel arrangement, theme editor, and keybinding configuration.",
        highlights: ["Panel Layout", "Theme Editor", "Keybindings", "Profiles"],
        href: "/ide-platform/builder",
      },
      {
        icon: Boxes,
        title: "Template Gallery",
        description: "Browse and use 42+ starter templates for common project types, or create and share your own.",
        highlights: ["42+ Templates", "Custom Templates", "Quick Start", "Sharing"],
        href: "/ide-platform/templates",
      },
      {
        icon: Puzzle,
        title: "Extension Marketplace",
        description:
          "Discover and install 156+ extensions, themes, and plugins to enhance your development experience.",
        highlights: ["156+ Extensions", "Themes", "Language Packs", "Tools"],
        href: "/ide-platform/marketplace",
      },
      {
        icon: Plug,
        title: "Integrations Hub",
        description: "Connect with external tools, CI/CD pipelines, deployment platforms, and third-party services.",
        highlights: ["CI/CD", "Cloud Deploy", "API Connections", "Webhooks"],
        href: "/ide-platform/integrations",
      },
    ],
  },
  observability: {
    title: "Observability & Analytics",
    description: "Monitoring, metrics, and insights for your DNA-Lang applications",
    icon: BarChart3,
    features: [
      {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description:
          "Comprehensive metrics on organism performance, resource usage, coherence levels, and evolution progress.",
        highlights: ["Performance Metrics", "Resource Usage", "Coherence Tracking", "Reports"],
        href: "/analytics",
      },
      {
        icon: Zap,
        title: "Performance Profiler",
        description:
          "Detailed profiling tools to identify bottlenecks, optimize quantum operations, and improve efficiency.",
        highlights: ["CPU Profiling", "Memory Analysis", "Quantum Ops", "Flame Graphs"],
        href: "/analytics",
      },
      {
        icon: RefreshCw,
        title: "Real-time Monitoring",
        description: "Live monitoring of running organisms with alerts, logs, and automatic issue detection.",
        highlights: ["Live Logs", "Alerts", "Auto-detection", "Dashboards"],
        href: "/analytics",
      },
    ],
  },
}

export default function CapabilitiesPage() {
  const [activeTab, setActiveTab] = useState("core-ide")

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            <Layers className="h-3 w-3 mr-1" />
            Platform Capabilities
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Everything You Need to Build IDEs</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of 35+ features designed for creating, customizing, and extending development
            environments.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-8">
            {Object.entries(capabilityCategories).map(([key, category]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-full"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(capabilityCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.features.map((feature) => (
                  <Card key={feature.title} className="p-6 hover:border-primary/50 transition-colors group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {feature.highlights.map((highlight) => (
                            <Badge key={highlight} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                        <Link href={feature.href}>
                          <Button variant="ghost" size="sm" className="gap-1 -ml-2">
                            Learn More <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA */}
        <div className="text-center mt-16 py-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience All Features?</h2>
          <p className="text-muted-foreground mb-6">
            Launch the IDE platform and start building your custom environment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ide-platform">
              <Button size="lg" className="gap-2">
                <Dna className="h-4 w-4" />
                Launch IDE Platform
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ide-platform/docs">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <BookOpen className="h-4 w-4" />
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
