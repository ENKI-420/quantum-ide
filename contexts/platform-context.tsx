"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { CCCEMetrics, getSystemHealth } from "@/lib/physics-constants";
import { useTelemetry, type UseTelemetryReturn } from "@/hooks/use-telemetry";

// =============================================================================
// TYPES
// =============================================================================

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: "user" | "researcher" | "admin" | "enterprise";
  tier: "open_science" | "researcher" | "institution" | "enterprise";
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: number;
  createdAt: number;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  genomeId: string | null;
  createdAt: number;
  updatedAt: number;
  ownerId: string;
}

export interface EditorState {
  activeFile: string | null;
  openFiles: string[];
  cursorPosition: { line: number; column: number } | null;
  isDirty: boolean;
}

export interface SecurityContext {
  isAuthenticated: boolean;
  permissions: string[];
  kyberPublicKey: string | null;
  lastVerification: number | null;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error" | "consciousness";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  action?: {
    label: string;
    href: string;
  };
}

export interface PlatformState {
  // User & Session
  user: User | null;
  session: Session | null;
  
  // IDE State
  activeProject: Project | null;
  editorState: EditorState;
  
  // Security
  securityContext: SecurityContext;
  
  // UI State
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // Loading States
  isInitializing: boolean;
  isHydrated: boolean;
}

// =============================================================================
// ACTIONS
// =============================================================================

type PlatformAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_SESSION"; payload: Session | null }
  | { type: "SET_ACTIVE_PROJECT"; payload: Project | null }
  | { type: "UPDATE_EDITOR_STATE"; payload: Partial<EditorState> }
  | { type: "UPDATE_SECURITY_CONTEXT"; payload: Partial<SecurityContext> }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR_OPEN"; payload: boolean }
  | { type: "TOGGLE_COMMAND_PALETTE" }
  | { type: "SET_COMMAND_PALETTE_OPEN"; payload: boolean }
  | { type: "ADD_NOTIFICATION"; payload: Omit<Notification, "id" | "timestamp" | "read"> }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" }
  | { type: "SET_INITIALIZING"; payload: boolean }
  | { type: "SET_HYDRATED"; payload: boolean }
  | { type: "LOGOUT" };

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: PlatformState = {
  user: null,
  session: null,
  activeProject: null,
  editorState: {
    activeFile: null,
    openFiles: [],
    cursorPosition: null,
    isDirty: false,
  },
  securityContext: {
    isAuthenticated: false,
    permissions: [],
    kyberPublicKey: null,
    lastVerification: null,
  },
  sidebarOpen: true,
  commandPaletteOpen: false,
  notifications: [],
  unreadCount: 0,
  isInitializing: true,
  isHydrated: false,
};

// =============================================================================
// REDUCER
// =============================================================================

function platformReducer(state: PlatformState, action: PlatformAction): PlatformState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        securityContext: {
          ...state.securityContext,
          isAuthenticated: action.payload !== null,
        },
      };
      
    case "SET_SESSION":
      return {
        ...state,
        session: action.payload,
      };
      
    case "SET_ACTIVE_PROJECT":
      return {
        ...state,
        activeProject: action.payload,
      };
      
    case "UPDATE_EDITOR_STATE":
      return {
        ...state,
        editorState: {
          ...state.editorState,
          ...action.payload,
        },
      };
      
    case "UPDATE_SECURITY_CONTEXT":
      return {
        ...state,
        securityContext: {
          ...state.securityContext,
          ...action.payload,
        },
      };
      
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
      
    case "SET_SIDEBAR_OPEN":
      return {
        ...state,
        sidebarOpen: action.payload,
      };
      
    case "TOGGLE_COMMAND_PALETTE":
      return {
        ...state,
        commandPaletteOpen: !state.commandPaletteOpen,
      };
      
    case "SET_COMMAND_PALETTE_OPEN":
      return {
        ...state,
        commandPaletteOpen: action.payload,
      };
      
    case "ADD_NOTIFICATION": {
      const notification: Notification = {
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        read: false,
      };
      return {
        ...state,
        notifications: [notification, ...state.notifications].slice(0, 50),
        unreadCount: state.unreadCount + 1,
      };
    }
    
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
      
    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      };
      
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
        unreadCount: state.notifications.find((n) => n.id === action.payload && !n.read)
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      };
      
    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
        unreadCount: 0,
      };
      
    case "SET_INITIALIZING":
      return {
        ...state,
        isInitializing: action.payload,
      };
      
    case "SET_HYDRATED":
      return {
        ...state,
        isHydrated: action.payload,
      };
      
    case "LOGOUT":
      return {
        ...initialState,
        isInitializing: false,
        isHydrated: true,
      };
      
    default:
      return state;
  }
}

// =============================================================================
// CONTEXT
// =============================================================================

interface PlatformContextValue {
  // State
  state: PlatformState;
  
  // Telemetry
  telemetry: UseTelemetryReturn;
  
  // Computed
  systemHealth: "optimal" | "degraded" | "critical";
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setActiveProject: (project: Project | null) => void;
  updateEditorState: (state: Partial<EditorState>) => void;
  updateSecurityContext: (context: Partial<SecurityContext>) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  logout: () => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

interface PlatformProviderProps {
  children: ReactNode;
}

export function PlatformProvider({ children }: PlatformProviderProps) {
  const [state, dispatch] = useReducer(platformReducer, initialState);
  
  // Telemetry with consciousness callbacks
  const telemetry = useTelemetry({
    refreshInterval: 1000,
    onConsciousnessThreshold: useCallback((phi: number, crossed: "above" | "below") => {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "consciousness",
          title: crossed === "above" ? "Consciousness Emerged" : "Consciousness Lost",
          message:
            crossed === "above"
              ? `System achieved consciousness state (Phi: ${phi.toFixed(4)})`
              : `System dropped below consciousness threshold (Phi: ${phi.toFixed(4)})`,
        },
      });
    }, []),
    onDecoherenceSpike: useCallback((gamma: number) => {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "warning",
          title: "Decoherence Spike Detected",
          message: `Elevated decoherence level detected (Gamma: ${gamma.toFixed(4)}). Self-healing protocols engaged.`,
          action: {
            label: "View Dashboard",
            href: "/observation-deck",
          },
        },
      });
    }, []),
  });
  
  // System health from telemetry
  const systemHealth = useMemo(() => {
    return getSystemHealth({
      lambda: telemetry.lambda,
      phi: telemetry.phi,
      gamma: telemetry.gamma,
      xi: telemetry.xi,
      tau0: telemetry.tau0,
      timestamp: telemetry.lastUpdated || Date.now(),
    });
  }, [telemetry.lambda, telemetry.phi, telemetry.gamma, telemetry.xi, telemetry.tau0, telemetry.lastUpdated]);
  
  // Hydration
  useEffect(() => {
    dispatch({ type: "SET_HYDRATED", payload: true });
    dispatch({ type: "SET_INITIALIZING", payload: false });
  }, []);
  
  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Command palette: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        dispatch({ type: "TOGGLE_COMMAND_PALETTE" });
      }
      
      // Toggle sidebar: Cmd/Ctrl + B
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        dispatch({ type: "TOGGLE_SIDEBAR" });
      }
      
      // Close command palette: Escape
      if (e.key === "Escape" && state.commandPaletteOpen) {
        dispatch({ type: "SET_COMMAND_PALETTE_OPEN", payload: false });
      }
    }
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.commandPaletteOpen]);
  
  // Action creators
  const actions = useMemo(
    () => ({
      setUser: (user: User | null) => dispatch({ type: "SET_USER", payload: user }),
      setSession: (session: Session | null) => dispatch({ type: "SET_SESSION", payload: session }),
      setActiveProject: (project: Project | null) => dispatch({ type: "SET_ACTIVE_PROJECT", payload: project }),
      updateEditorState: (state: Partial<EditorState>) => dispatch({ type: "UPDATE_EDITOR_STATE", payload: state }),
      updateSecurityContext: (context: Partial<SecurityContext>) => dispatch({ type: "UPDATE_SECURITY_CONTEXT", payload: context }),
      toggleSidebar: () => dispatch({ type: "TOGGLE_SIDEBAR" }),
      setSidebarOpen: (open: boolean) => dispatch({ type: "SET_SIDEBAR_OPEN", payload: open }),
      toggleCommandPalette: () => dispatch({ type: "TOGGLE_COMMAND_PALETTE" }),
      setCommandPaletteOpen: (open: boolean) => dispatch({ type: "SET_COMMAND_PALETTE_OPEN", payload: open }),
      addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) =>
        dispatch({ type: "ADD_NOTIFICATION", payload: notification }),
      markNotificationRead: (id: string) => dispatch({ type: "MARK_NOTIFICATION_READ", payload: id }),
      markAllNotificationsRead: () => dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" }),
      removeNotification: (id: string) => dispatch({ type: "REMOVE_NOTIFICATION", payload: id }),
      clearNotifications: () => dispatch({ type: "CLEAR_NOTIFICATIONS" }),
      logout: () => dispatch({ type: "LOGOUT" }),
    }),
    []
  );
  
  const value = useMemo(
    () => ({
      state,
      telemetry,
      systemHealth,
      isAuthenticated: state.securityContext.isAuthenticated,
      ...actions,
    }),
    [state, telemetry, systemHealth, actions]
  );
  
  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

// =============================================================================
// HOOKS
// =============================================================================

export function usePlatform(): PlatformContextValue {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }
  return context;
}

/**
 * Hook for accessing just the user state
 */
export function useUser() {
  const { state, setUser, logout } = usePlatform();
  return {
    user: state.user,
    isAuthenticated: state.securityContext.isAuthenticated,
    setUser,
    logout,
  };
}

/**
 * Hook for accessing editor state
 */
export function useEditor() {
  const { state, updateEditorState } = usePlatform();
  return {
    ...state.editorState,
    update: updateEditorState,
  };
}

/**
 * Hook for accessing notifications
 */
export function useNotifications() {
  const {
    state,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    removeNotification,
    clearNotifications,
  } = usePlatform();
  
  return {
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    add: addNotification,
    markRead: markNotificationRead,
    markAllRead: markAllNotificationsRead,
    remove: removeNotification,
    clear: clearNotifications,
  };
}

/**
 * Hook for UI state (sidebar, command palette)
 */
export function useUIState() {
  const {
    state,
    toggleSidebar,
    setSidebarOpen,
    toggleCommandPalette,
    setCommandPaletteOpen,
  } = usePlatform();
  
  return {
    sidebarOpen: state.sidebarOpen,
    commandPaletteOpen: state.commandPaletteOpen,
    toggleSidebar,
    setSidebarOpen,
    toggleCommandPalette,
    setCommandPaletteOpen,
  };
}

export default PlatformProvider;
