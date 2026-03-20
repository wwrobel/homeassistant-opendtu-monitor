import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles.js";
import type {
  HomeAssistant,
  OpenDTUMonitorCardConfig,
  PanelData,
  DiscoveredInverter,
} from "./types.js";
import "./components/panel-tile.js";
import "./editor.js";

@customElement("opendtu-monitor-card")
export class OpenDTUMonitorCard extends LitElement {
  static styles: CSSResultGroup = [
    cardStyles,
    css`
      .empty-state {
        padding: 32px;
        text-align: center;
        color: var(--secondary-text-color, #666);
      }
      .inverter-group-header {
        font-size: 0.9em;
        font-weight: 500;
        color: var(--secondary-text-color);
        padding: 8px 0 4px;
      }
      .ac-summary {
        font-size: 0.8em;
        color: var(--secondary-text-color);
        padding: 4px 0 8px;
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }
      .ac-summary span {
        white-space: nowrap;
      }
    `,
  ];

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: OpenDTUMonitorCardConfig;

  public static getConfigElement(): HTMLElement {
    return document.createElement("opendtu-monitor-card-editor");
  }

  public static getStubConfig(): Partial<OpenDTUMonitorCardConfig> {
    return {
      title: "Solar Panels",
      layout: "grid",
      columns: 4,
      show_labels: true,
      show_yield: true,
    };
  }

  public setConfig(config: OpenDTUMonitorCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = {
      ...{
        layout: "grid" as const,
        columns: 4,
        show_labels: true,
        show_yield: true,
      },
      ...config,
    };
  }

  public getCardSize(): number {
    return 3;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const inverters = this._discoverInverters();

    if (inverters.length === 0) {
      return html`
        <ha-card>
          ${this._config.title
            ? html`<div class="card-header">${this._config.title}</div>`
            : ""}
          <div class="empty-state">
            No OpenDTU Monitor sensors found. Make sure the integration is configured.
          </div>
        </ha-card>
      `;
    }

    const panels = this._buildPanelData(inverters);

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="card-header">${this._config.title}</div>`
          : ""}
        ${inverters.length > 1
          ? this._renderMultiInverterGrid(inverters)
          : this._renderSimpleGrid(panels)}
      </ha-card>
    `;
  }

  private _renderSimpleGrid(panels: PanelData[]): TemplateResult {
    const columns = this._config.columns || 4;
    return html`
      <div class="grid-container" style="grid-template-columns: repeat(${columns}, 1fr)">
        ${panels.map(
          (p) => html`
            <opendtu-panel-tile
              .data=${p}
              .showLabel=${this._config.show_labels}
              .showYield=${this._config.show_yield}
            ></opendtu-panel-tile>
          `
        )}
      </div>
    `;
  }

  private _renderMultiInverterGrid(inverters: DiscoveredInverter[]): TemplateResult {
    const columns = this._config.columns || 4;
    return html`
      ${inverters.map((inv) => {
        const panels = this._buildInverterPanels(inv);
        const acPower = this._getEntityValue(inv, "AC", "Power");
        const acVoltage = this._getEntityValue(inv, "AC", "Voltage");
        const acFrequency = this._getEntityValue(inv, "AC", "Frequency");
        return html`
          <div class="inverter-group-header">${inv.name} (${inv.serial})</div>
          <div class="ac-summary">
            ${acPower != null ? html`<span>AC: ${Math.round(acPower)} W</span>` : ""}
            ${acVoltage != null ? html`<span>${acVoltage.toFixed(1)} V</span>` : ""}
            ${acFrequency != null ? html`<span>${acFrequency.toFixed(1)} Hz</span>` : ""}
          </div>
          <div class="grid-container" style="grid-template-columns: repeat(${columns}, 1fr); margin-bottom: 12px;">
            ${panels.map(
              (p) => html`
                <opendtu-panel-tile
                  .data=${p}
                  .showLabel=${this._config.show_labels}
                  .showYield=${this._config.show_yield}
                ></opendtu-panel-tile>
              `
            )}
          </div>
        `;
      })}
    `;
  }

  /**
   * Auto-discover all OpenDTU inverters and their strings from hass.states.
   * Uses entity attributes (serial, section, field, string_channel) set by the backend.
   */
  private _discoverInverters(): DiscoveredInverter[] {
    const inverterMap = new Map<string, DiscoveredInverter>();

    for (const entityId of Object.keys(this.hass.states)) {
      const entity = this.hass.states[entityId];
      const serial = entity.attributes["serial"] as string | undefined;
      const section = entity.attributes["section"] as string | undefined;
      const field = entity.attributes["field"] as string | undefined;

      if (!serial || !section || !field) continue;
      // Only process opendtu_monitor entities
      if (!entityId.startsWith("sensor.")) continue;
      const inverterName = entity.attributes["inverter_name"] as string | undefined;
      if (!inverterName) continue;

      if (!inverterMap.has(serial)) {
        inverterMap.set(serial, {
          serial,
          name: inverterName || serial,
          strings: [],
          producing: (entity.attributes["producing"] as boolean) || false,
          reachable: (entity.attributes["reachable"] as boolean) || false,
        });
      }

      const inv = inverterMap.get(serial)!;

      // Update producing/reachable from latest entity
      if (entity.attributes["producing"]) inv.producing = true;
      if (entity.attributes["reachable"]) inv.reachable = true;

      if (section === "DC") {
        const channel = String(entity.attributes["string_channel"] ?? "0");
        const stringLabel = (entity.attributes["string_label"] as string) || `String ${channel}`;

        let str = inv.strings.find((s) => s.channel === channel);
        if (!str) {
          str = { channel, label: stringLabel, entities: {} };
          inv.strings.push(str);
        }
        str.entities[field] = entityId;
      } else {
        // AC/INV - store under a virtual string "__ac__" or "__inv__"
        const key = `__${section.toLowerCase()}__`;
        let str = inv.strings.find((s) => s.channel === key);
        if (!str) {
          str = { channel: key, label: section, entities: {} };
          inv.strings.push(str);
        }
        str.entities[field] = entityId;
      }
    }

    // Sort strings: DC strings first (by channel number), then AC/INV
    for (const inv of inverterMap.values()) {
      inv.strings.sort((a, b) => {
        const aIsDC = !a.channel.startsWith("__");
        const bIsDC = !b.channel.startsWith("__");
        if (aIsDC && !bIsDC) return -1;
        if (!aIsDC && bIsDC) return 1;
        return a.channel.localeCompare(b.channel, undefined, { numeric: true });
      });
    }

    return [...inverterMap.values()];
  }

  private _buildPanelData(inverters: DiscoveredInverter[]): PanelData[] {
    const panels: PanelData[] = [];
    for (const inv of inverters) {
      panels.push(...this._buildInverterPanels(inv));
    }
    return panels;
  }

  private _buildInverterPanels(inv: DiscoveredInverter): PanelData[] {
    const panels: PanelData[] = [];
    for (const str of inv.strings) {
      // Skip AC/INV virtual strings - those aren't panels
      if (str.channel.startsWith("__")) continue;

      panels.push({
        serial: inv.serial,
        inverterName: inv.name,
        stringChannel: str.channel,
        label: str.label,
        power: this._readEntityValue(str.entities["Power"]),
        voltage: this._readEntityValue(str.entities["Voltage"]),
        current: this._readEntityValue(str.entities["Current"]),
        yieldDay: this._readEntityValue(str.entities["YieldDay"]),
        yieldTotal: this._readEntityValue(str.entities["YieldTotal"]),
        irradiation: this._readEntityValue(str.entities["Irradiation"]),
        producing: inv.producing,
        reachable: inv.reachable,
      });
    }
    return panels;
  }

  private _getEntityValue(
    inv: DiscoveredInverter,
    section: string,
    field: string
  ): number | null {
    const key = `__${section.toLowerCase()}__`;
    const str = inv.strings.find((s) => s.channel === key);
    if (!str) return null;
    return this._readEntityValue(str.entities[field]);
  }

  private _readEntityValue(entityId: string | undefined): number | null {
    if (!entityId) return null;
    const entity = this.hass.states[entityId];
    if (!entity) return null;
    const val = parseFloat(entity.state);
    return isNaN(val) ? null : val;
  }
}

// Register the card with HA
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = window as any;
w.customCards = w.customCards || [];
w.customCards.push({
  type: "opendtu-monitor-card",
  name: "OpenDTU Monitor",
  description: "Display solar panel grid from OpenDTU inverters",
});
