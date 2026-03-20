export interface OpenDTUMonitorCardConfig {
  type: string;
  title?: string;
  layout: "grid" | "freeform";
  columns: number;
  show_labels: boolean;
  show_yield: boolean;
  // Optional: override auto-discovery
  inverters?: InverterConfig[];
  background?: {
    image: string;
    width: number;
    height: number;
  };
}

export interface InverterConfig {
  serial: string;
  panels: PanelConfig[];
}

export interface PanelConfig {
  string: number;
  label: string;
  // Grid mode positioning
  row: number;
  col: number;
  // Freeform mode positioning
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService: (domain: string, service: string, data?: Record<string, unknown>) => Promise<void>;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface PanelData {
  serial: string;
  inverterName: string;
  stringChannel: string;
  label: string;
  power: number | null;
  voltage: number | null;
  current: number | null;
  yieldDay: number | null;
  yieldTotal: number | null;
  irradiation: number | null;
  producing: boolean;
  reachable: boolean;
}

/** Discovered inverter info from hass.states */
export interface DiscoveredInverter {
  serial: string;
  name: string;
  strings: DiscoveredString[];
  producing: boolean;
  reachable: boolean;
}

export interface DiscoveredString {
  channel: string;
  label: string;
  entities: Record<string, string>; // field -> entity_id mapping
}
