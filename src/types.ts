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

export interface InverterConfig {
  serial: string;
  panels: PanelConfig[];
}

export interface OpenDTUMonitorCardConfig {
  type: string;
  title?: string;
  layout: "grid" | "freeform";
  columns: number;
  show_labels: boolean;
  show_yield: boolean;
  inverters: InverterConfig[];
  background?: {
    image: string;
    width: number;
    height: number;
  };
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
  string: number;
  label: string;
  power: number | null;
  voltage: number | null;
  current: number | null;
  yieldDay: number | null;
  yieldTotal: number | null;
  producing: boolean;
  reachable: boolean;
}
