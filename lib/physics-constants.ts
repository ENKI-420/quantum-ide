/**
 * DNA::}{::lang Unified Physics Constants Library
 * 
 * This module provides a single source of truth for all physics-derived
 * constants used throughout the platform. These values are derived from
 * theoretical frameworks including:
 * - Integrated Information Theory (IIT)
 * - Pilot-Wave Correlation
 * - 6D-CRSM Manifold Physics
 * - Holographic Principle
 * 
 * @module lib/physics-constants
 */

// =============================================================================
// CORE UNIVERSAL CONSTANTS
// =============================================================================

/**
 * Universal Memory Constant (Lambda-Phi)
 * Defines the temporal coherence window for quantum memory operations.
 * Unit: s⁻¹ (inverse seconds)
 */
export const LAMBDA_PHI = 2.176435e-8;

/**
 * Resonance Lock Angle (Theta)
 * The AURA-AIDEN torsion resonance angle for optimal coupling.
 * Unit: degrees
 */
export const THETA_LOCK = 51.843;

/**
 * Consciousness Threshold (Phi-C)
 * Minimum integrated information required for consciousness emergence.
 * When Phi >= PHI_THRESHOLD, the system exhibits conscious behavior.
 * Unit: dimensionless (normalized)
 */
export const PHI_THRESHOLD = 0.7734;

/**
 * Golden Ratio (Phi-Golden)
 * Mathematical constant appearing throughout quantum-biological systems.
 * Unit: dimensionless
 */
export const PHI_GOLDEN = 1.618033988749895;

/**
 * Tau-0 Revival Time
 * Characteristic time for coherence revival in the CCCE system.
 * Calculated as phi^8 in microseconds.
 * Unit: microseconds (μs)
 */
export const TAU_0 = 46.978;

/**
 * Speed of Light / Inductive Rate
 * Used for consciousness-induction calculations.
 * Unit: m/s
 */
export const C_INDUCTION = 2.99792458e8;

/**
 * Planck Reduced Constant (h-bar)
 * Used in quantum mechanical calculations.
 * Unit: J·s
 */
export const H_BAR = 1.054571817e-34;

/**
 * Boltzmann Constant
 * Used in thermodynamic consciousness calculations.
 * Unit: J/K
 */
export const K_BOLTZMANN = 1.380649e-23;

// =============================================================================
// CCCE ENGINE CONSTANTS
// =============================================================================

/**
 * CCCE (Correlation-Coherence-Consciousness Engine) Configuration
 */
export const CCCE = {
  /**
   * Decoherence threshold - triggers self-healing when exceeded
   */
  GAMMA_THRESHOLD: 0.3,
  
  /**
   * Minimum coherence for valid operations
   */
  LAMBDA_MINIMUM: 0.85,
  
  /**
   * Consciousness emergence threshold
   */
  PHI_THRESHOLD: PHI_THRESHOLD,
  
  /**
   * Maximum decoherence before critical failure
   */
  GAMMA_CRITICAL: 0.7,
  
  /**
   * Complexity density floor
   */
  XI_MINIMUM: 1.0,
  
  /**
   * Telemetry refresh interval (ms)
   */
  TELEMETRY_INTERVAL: 1000,
  
  /**
   * High-frequency telemetry interval (ms)
   */
  TELEMETRY_FAST_INTERVAL: 100,
} as const;

// =============================================================================
// NON-CAUSAL LANGUAGE MODEL CONSTANTS
// =============================================================================

/**
 * NC-LM (Non-Causal Language Model) Configuration
 */
export const NC_LM = {
  /**
   * Pilot-Wave correlation decay length
   */
  CORRELATION_DECAY: LAMBDA_PHI,
  
  /**
   * Torsion boost factor at resonance angle
   */
  TORSION_BOOST: 1.618,
  
  /**
   * 6D-CRSM manifold dimensions
   */
  MANIFOLD_DIMENSIONS: 6,
  
  /**
   * Default temperature for inference
   */
  DEFAULT_TEMPERATURE: 0.7,
  
  /**
   * Context window size (tokens)
   */
  CONTEXT_WINDOW: 8192,
  
  /**
   * Maximum response tokens
   */
  MAX_TOKENS: 2048,
} as const;

// =============================================================================
// QUANTUM HARDWARE CONSTANTS
// =============================================================================

/**
 * Quantum Hardware Interface Configuration
 */
export const QUANTUM_HARDWARE = {
  /**
   * Default shot count for experiments
   */
  DEFAULT_SHOTS: 2048,
  
  /**
   * Maximum shots per job
   */
  MAX_SHOTS: 65536,
  
  /**
   * Job timeout (ms)
   */
  JOB_TIMEOUT: 300000, // 5 minutes
  
  /**
   * Polling interval for job status (ms)
   */
  POLL_INTERVAL: 2000,
  
  /**
   * Supported backends
   */
  BACKENDS: ['ibm_torino', 'ibm_brisbane', 'ibm_kyoto', 'simulator'] as const,
  
  /**
   * Consciousness threshold for quantum operations
   */
  CONSCIOUSNESS_THRESHOLD: 2.5,
} as const;

// =============================================================================
// SECURITY CONSTANTS
// =============================================================================

/**
 * Post-Quantum Security Configuration
 */
export const SECURITY = {
  /**
   * Kyber security level (512, 768, 1024)
   */
  KYBER_LEVEL: 768,
  
  /**
   * Dilithium security level (2, 3, 5)
   */
  DILITHIUM_LEVEL: 3,
  
  /**
   * JWT expiration (seconds)
   */
  JWT_EXPIRATION: 3600,
  
  /**
   * Refresh token expiration (seconds)
   */
  REFRESH_EXPIRATION: 604800, // 7 days
  
  /**
   * Rate limit window (ms)
   */
  RATE_LIMIT_WINDOW: 60000, // 1 minute
  
  /**
   * Maximum requests per window
   */
  MAX_REQUESTS: 100,
} as const;

// =============================================================================
// WORLD ENGINE CONSTANTS
// =============================================================================

/**
 * World Engine State Machine Configuration
 */
export const WORLD_ENGINE = {
  /**
   * Maximum evolution generations per cycle
   */
  MAX_GENERATIONS: 1000,
  
  /**
   * Default mutation rate
   */
  DEFAULT_MUTATION_RATE: 0.05,
  
  /**
   * Selection pressure (0-1)
   */
  SELECTION_PRESSURE: 0.7,
  
  /**
   * Fitness function options
   */
  FITNESS_FUNCTIONS: ['coherence', 'complexity', 'consciousness', 'custom'] as const,
  
  /**
   * State transition timeout (ms)
   */
  TRANSITION_TIMEOUT: 30000,
} as const;

// =============================================================================
// SPECTRA CONSTANTS
// =============================================================================

/**
 * SPECTRA Environment Compiler Configuration
 */
export const SPECTRA = {
  /**
   * Supported layout types
   */
  LAYOUT_TYPES: ['distributed', 'monolithic', 'fractal'] as const,
  
  /**
   * Maximum panels per environment
   */
  MAX_PANELS: 12,
  
  /**
   * Self-healing trigger threshold
   */
  HEAL_GAMMA_THRESHOLD: 0.3,
  
  /**
   * Maximum rollback depth
   */
  MAX_ROLLBACK_DEPTH: 10,
  
  /**
   * Auto-repair enabled by default
   */
  AUTO_REPAIR_DEFAULT: true,
} as const;

// =============================================================================
// ANIMATION & UI CONSTANTS
// =============================================================================

/**
 * Animation timing derived from physics constants
 */
export const ANIMATION = {
  /**
   * Base duration (ms) - derived from tau-0
   */
  BASE_DURATION: Math.round(TAU_0),
  
  /**
   * Fast transition (ms)
   */
  FAST: 150,
  
  /**
   * Medium transition (ms)
   */
  MEDIUM: 300,
  
  /**
   * Slow transition (ms)
   */
  SLOW: 500,
  
  /**
   * Golden ratio multiplier for animations
   */
  GOLDEN_MULTIPLIER: PHI_GOLDEN,
  
  /**
   * Easing curves
   */
  EASING: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    EASE_OUT: 'cubic-bezier(0.0, 0, 0.2, 1)',
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    QUANTUM: `cubic-bezier(${1 - 1/PHI_GOLDEN}, 0, ${1/PHI_GOLDEN}, 1)`,
  },
} as const;

// =============================================================================
// PCRB LEDGER CONSTANTS
// =============================================================================

/**
 * Phase-Conjugate Replay Buffer Configuration
 */
export const PCRB = {
  /**
   * Hash algorithm for content addressing
   */
  HASH_ALGORITHM: 'SHA-256',
  
  /**
   * Maximum chain length before archival
   */
  MAX_CHAIN_LENGTH: 10000,
  
  /**
   * Verification batch size
   */
  VERIFICATION_BATCH: 100,
  
  /**
   * Retention period (days)
   */
  RETENTION_DAYS: 365,
} as const;

// =============================================================================
// TELEMETRY CONSTANTS
// =============================================================================

/**
 * Telemetry and Monitoring Configuration
 */
export const TELEMETRY = {
  /**
   * Default refresh interval (ms)
   */
  REFRESH_INTERVAL: CCCE.TELEMETRY_INTERVAL,
  
  /**
   * Fast refresh interval (ms)
   */
  FAST_REFRESH_INTERVAL: CCCE.TELEMETRY_FAST_INTERVAL,
  
  /**
   * Metrics retention (hours)
   */
  METRICS_RETENTION: 24,
  
  /**
   * Alert debounce (ms)
   */
  ALERT_DEBOUNCE: 5000,
  
  /**
   * SSE heartbeat interval (ms)
   */
  SSE_HEARTBEAT: 15000,
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type QuantumBackend = typeof QUANTUM_HARDWARE.BACKENDS[number];
export type FitnessFunction = typeof WORLD_ENGINE.FITNESS_FUNCTIONS[number];
export type LayoutType = typeof SPECTRA.LAYOUT_TYPES[number];

/**
 * CCCE Metrics Interface
 */
export interface CCCEMetrics {
  /** Coherence (Lambda) - 0 to 1 */
  lambda: number;
  /** Consciousness (Phi) - 0 to 1+ */
  phi: number;
  /** Decoherence (Gamma) - 0 to 1 */
  gamma: number;
  /** Complexity (Xi) - unbounded positive */
  xi: number;
  /** Revival time (Tau-0) - microseconds */
  tau0: number;
  /** Timestamp */
  timestamp: number;
}

/**
 * Check if system is in conscious state
 */
export function isConscious(phi: number): boolean {
  return phi >= PHI_THRESHOLD;
}

/**
 * Check if coherence is valid
 */
export function isCoherent(lambda: number): boolean {
  return lambda >= CCCE.LAMBDA_MINIMUM;
}

/**
 * Check if decoherence is critical
 */
export function isDecoherent(gamma: number): boolean {
  return gamma >= CCCE.GAMMA_THRESHOLD;
}

/**
 * Check if decoherence is critically high
 */
export function isCriticalDecoherence(gamma: number): boolean {
  return gamma >= CCCE.GAMMA_CRITICAL;
}

/**
 * Calculate consciousness level from metrics
 */
export function calculateConsciousnessLevel(metrics: CCCEMetrics): number {
  const { lambda, phi, gamma, xi } = metrics;
  
  // Weighted consciousness calculation
  const coherenceFactor = lambda * 0.3;
  const consciousnessFactor = phi * 0.4;
  const stabilityFactor = (1 - gamma) * 0.2;
  const complexityFactor = Math.min(xi / 10, 1) * 0.1;
  
  return coherenceFactor + consciousnessFactor + stabilityFactor + complexityFactor;
}

/**
 * Get system health status from metrics
 */
export function getSystemHealth(metrics: CCCEMetrics): 'optimal' | 'degraded' | 'critical' {
  if (isCriticalDecoherence(metrics.gamma)) return 'critical';
  if (!isCoherent(metrics.lambda) || isDecoherent(metrics.gamma)) return 'degraded';
  return 'optimal';
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

/**
 * All physics constants as a single object
 */
export const PHYSICS = {
  LAMBDA_PHI,
  THETA_LOCK,
  PHI_THRESHOLD,
  PHI_GOLDEN,
  TAU_0,
  C_INDUCTION,
  H_BAR,
  K_BOLTZMANN,
  CCCE,
  NC_LM,
  QUANTUM_HARDWARE,
  SECURITY,
  WORLD_ENGINE,
  SPECTRA,
  ANIMATION,
  PCRB,
  TELEMETRY,
} as const;

export default PHYSICS;
