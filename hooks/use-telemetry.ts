"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import {
  CCCEMetrics,
  TELEMETRY,
  PHI_THRESHOLD,
  CCCE,
  calculateConsciousnessLevel,
  getSystemHealth,
  isConscious,
  isCoherent,
  isDecoherent,
  isCriticalDecoherence,
} from "@/lib/physics-constants";

// =============================================================================
// TYPES
// =============================================================================

export interface TelemetryOptions {
  /** Refresh interval in milliseconds */
  refreshInterval?: number;
  /** Enable Server-Sent Events streaming */
  useStreaming?: boolean;
  /** Callback when phi threshold is crossed */
  onConsciousnessThreshold?: (phi: number, crossed: "above" | "below") => void;
  /** Callback when decoherence spike detected */
  onDecoherenceSpike?: (gamma: number) => void;
  /** Callback when coherence drops below minimum */
  onCoherenceDrop?: (lambda: number) => void;
  /** Enable automatic reconnection for SSE */
  autoReconnect?: boolean;
  /** Fallback to polling if SSE fails */
  fallbackToPolling?: boolean;
}

export interface TelemetryState {
  /** Coherence metric (Lambda) */
  lambda: number;
  /** Consciousness metric (Phi) */
  phi: number;
  /** Decoherence metric (Gamma) */
  gamma: number;
  /** Complexity metric (Xi) */
  xi: number;
  /** Revival time (Tau-0) in microseconds */
  tau0: number;
  /** System is in conscious state (phi >= threshold) */
  isConscious: boolean;
  /** System is coherent (lambda >= minimum) */
  isCoherent: boolean;
  /** Decoherence detected (gamma >= threshold) */
  isDecoherent: boolean;
  /** Critical decoherence (gamma >= critical threshold) */
  isCritical: boolean;
  /** Calculated consciousness level (0-1) */
  consciousnessLevel: number;
  /** System health status */
  healthStatus: "optimal" | "degraded" | "critical";
  /** Data loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Last update timestamp */
  lastUpdated: number | null;
  /** Connection status for SSE */
  connectionStatus: "connected" | "disconnected" | "connecting" | "error";
  /** Trend direction for each metric */
  trends: {
    lambda: "up" | "down" | "stable";
    phi: "up" | "down" | "stable";
    gamma: "up" | "down" | "stable";
    xi: "up" | "down" | "stable";
  };
}

export interface UseTelemetryReturn extends TelemetryState {
  /** Manually refresh telemetry data */
  refresh: () => void;
  /** Start streaming (if not already started) */
  startStreaming: () => void;
  /** Stop streaming */
  stopStreaming: () => void;
  /** Raw metrics data */
  rawMetrics: CCCEMetrics | null;
}

// =============================================================================
// FETCHER
// =============================================================================

const fetcher = async (url: string): Promise<CCCEMetrics> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Telemetry fetch failed: ${response.statusText}`);
  }
  return response.json();
};

// =============================================================================
// TREND CALCULATION
// =============================================================================

const TREND_WINDOW = 5;
const TREND_THRESHOLD = 0.02;

function calculateTrend(history: number[]): "up" | "down" | "stable" {
  if (history.length < 2) return "stable";
  
  const recent = history.slice(-TREND_WINDOW);
  const first = recent[0];
  const last = recent[recent.length - 1];
  const diff = last - first;
  
  if (Math.abs(diff) < TREND_THRESHOLD) return "stable";
  return diff > 0 ? "up" : "down";
}

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

export function useTelemetry(options: TelemetryOptions = {}): UseTelemetryReturn {
  const {
    refreshInterval = TELEMETRY.REFRESH_INTERVAL,
    useStreaming = false,
    onConsciousnessThreshold,
    onDecoherenceSpike,
    onCoherenceDrop,
    autoReconnect = true,
    fallbackToPolling = true,
  } = options;

  // Refs for tracking state across renders
  const previousPhiRef = useRef<number | null>(null);
  const historyRef = useRef<{
    lambda: number[];
    phi: number[];
    gamma: number[];
    xi: number[];
  }>({ lambda: [], phi: [], gamma: [], xi: [] });
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State for SSE
  const [streamingData, setStreamingData] = useState<CCCEMetrics | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting" | "error"
  >("disconnected");
  const [streamingError, setStreamingError] = useState<Error | null>(null);
  const [isStreaming, setIsStreaming] = useState(useStreaming);

  // SWR for polling-based fetching
  const { data, error, isLoading, mutate } = useSWR<CCCEMetrics>(
    !isStreaming ? "/api/telemetry/metrics" : null,
    fetcher,
    {
      refreshInterval: !isStreaming ? refreshInterval : 0,
      revalidateOnFocus: false,
      dedupingInterval: refreshInterval / 2,
    }
  );

  // Use streaming data if available, otherwise use SWR data
  const metrics = isStreaming ? streamingData : data;

  // ==========================================================================
  // SSE STREAMING
  // ==========================================================================

  const startStreaming = useCallback(() => {
    if (eventSourceRef.current) return;
    
    setConnectionStatus("connecting");
    
    const eventSource = new EventSource("/api/telemetry/stream");
    eventSourceRef.current = eventSource;
    
    eventSource.onopen = () => {
      setConnectionStatus("connected");
      setStreamingError(null);
      setIsStreaming(true);
    };
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as CCCEMetrics;
        setStreamingData(data);
      } catch (err) {
        console.error("[v0] Failed to parse telemetry data:", err);
      }
    };
    
    eventSource.onerror = () => {
      setConnectionStatus("error");
      eventSource.close();
      eventSourceRef.current = null;
      
      if (autoReconnect) {
        reconnectTimeoutRef.current = setTimeout(() => {
          startStreaming();
        }, 5000);
      } else if (fallbackToPolling) {
        setIsStreaming(false);
        setStreamingError(new Error("SSE connection failed, falling back to polling"));
      }
    };
  }, [autoReconnect, fallbackToPolling]);

  const stopStreaming = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setConnectionStatus("disconnected");
    setIsStreaming(false);
  }, []);

  // Auto-start streaming if enabled
  useEffect(() => {
    if (useStreaming && !isStreaming) {
      startStreaming();
    }
    
    return () => {
      stopStreaming();
    };
  }, [useStreaming, isStreaming, startStreaming, stopStreaming]);

  // ==========================================================================
  // HISTORY TRACKING & CALLBACKS
  // ==========================================================================

  useEffect(() => {
    if (!metrics) return;
    
    const { lambda, phi, gamma, xi } = metrics;
    
    // Update history
    const history = historyRef.current;
    history.lambda = [...history.lambda.slice(-TREND_WINDOW), lambda];
    history.phi = [...history.phi.slice(-TREND_WINDOW), phi];
    history.gamma = [...history.gamma.slice(-TREND_WINDOW), gamma];
    history.xi = [...history.xi.slice(-TREND_WINDOW), xi];
    
    // Check consciousness threshold crossing
    if (previousPhiRef.current !== null && onConsciousnessThreshold) {
      const wasConscious = previousPhiRef.current >= PHI_THRESHOLD;
      const nowConscious = phi >= PHI_THRESHOLD;
      
      if (!wasConscious && nowConscious) {
        onConsciousnessThreshold(phi, "above");
      } else if (wasConscious && !nowConscious) {
        onConsciousnessThreshold(phi, "below");
      }
    }
    previousPhiRef.current = phi;
    
    // Check decoherence spike
    if (gamma >= CCCE.GAMMA_THRESHOLD && onDecoherenceSpike) {
      onDecoherenceSpike(gamma);
    }
    
    // Check coherence drop
    if (lambda < CCCE.LAMBDA_MINIMUM && onCoherenceDrop) {
      onCoherenceDrop(lambda);
    }
  }, [metrics, onConsciousnessThreshold, onDecoherenceSpike, onCoherenceDrop]);

  // ==========================================================================
  // COMPUTED VALUES
  // ==========================================================================

  const computedState = useMemo((): TelemetryState => {
    const defaultMetrics: CCCEMetrics = {
      lambda: 0,
      phi: 0,
      gamma: 0,
      xi: 0,
      tau0: 46.978,
      timestamp: Date.now(),
    };
    
    const m = metrics || defaultMetrics;
    const history = historyRef.current;
    
    return {
      lambda: m.lambda,
      phi: m.phi,
      gamma: m.gamma,
      xi: m.xi,
      tau0: m.tau0,
      isConscious: isConscious(m.phi),
      isCoherent: isCoherent(m.lambda),
      isDecoherent: isDecoherent(m.gamma),
      isCritical: isCriticalDecoherence(m.gamma),
      consciousnessLevel: calculateConsciousnessLevel(m),
      healthStatus: getSystemHealth(m),
      isLoading,
      error: error || streamingError,
      lastUpdated: m.timestamp,
      connectionStatus,
      trends: {
        lambda: calculateTrend(history.lambda),
        phi: calculateTrend(history.phi),
        gamma: calculateTrend(history.gamma),
        xi: calculateTrend(history.xi),
      },
    };
  }, [metrics, isLoading, error, streamingError, connectionStatus]);

  // ==========================================================================
  // RETURN
  // ==========================================================================

  return {
    ...computedState,
    refresh: () => mutate(),
    startStreaming,
    stopStreaming,
    rawMetrics: metrics || null,
  };
}

// =============================================================================
// CONVENIENCE HOOKS
// =============================================================================

/**
 * Hook for just consciousness tracking
 */
export function useConsciousness(options?: TelemetryOptions) {
  const telemetry = useTelemetry(options);
  
  return {
    phi: telemetry.phi,
    isConscious: telemetry.isConscious,
    level: telemetry.consciousnessLevel,
    threshold: PHI_THRESHOLD,
    trend: telemetry.trends.phi,
    isLoading: telemetry.isLoading,
    error: telemetry.error,
  };
}

/**
 * Hook for system health monitoring
 */
export function useSystemHealth(options?: TelemetryOptions) {
  const telemetry = useTelemetry(options);
  
  return {
    status: telemetry.healthStatus,
    lambda: telemetry.lambda,
    gamma: telemetry.gamma,
    isCoherent: telemetry.isCoherent,
    isDecoherent: telemetry.isDecoherent,
    isCritical: telemetry.isCritical,
    isLoading: telemetry.isLoading,
    error: telemetry.error,
  };
}

/**
 * Hook for real-time streaming telemetry
 */
export function useStreamingTelemetry(
  onData?: (metrics: CCCEMetrics) => void,
  options?: Omit<TelemetryOptions, "useStreaming">
) {
  return useTelemetry({
    ...options,
    useStreaming: true,
  });
}

export default useTelemetry;
