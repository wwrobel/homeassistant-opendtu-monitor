import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles.js";
import type { HomeAssistant, OpenDTUMonitorCardConfig, PanelData, PanelConfig, InverterConfig } from "./types.js";
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
      inverters: [],
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
        inverters: [],
      },
      ...config,
    };
  }

  public getCardSize(): number {
    const totalPanels = (this._config.inverters || []).reduce(
      (sum, inv) => sum + (inv.panels || []).length,
      0
    );
    const rows = Math.ceil(totalPanels / (this._config.columns || 4));
    return Math.max(rows + 1, 2);
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const panels = this._collectPanelData();

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="card-header">${this._config.title}</div>`
          : ""}
        ${panels.length === 0
          ? html`<div class="empty-state">No panels configured. Edit the card to add inverters and panels.</div>`
          : this._config.layout === "freeform"
            ? this._renderFreeform(panels)
            : this._renderGrid(panels)}
      </ha-card>
    `;
  }

  private _renderGrid(panels: { data: PanelData; config: PanelConfig }[]): TemplateResult {
    const columns = this._config.columns || 4;

    // Determine grid dimensions from panel positions
    let maxRow = 0;
    let maxCol = 0;
    for (const p of panels) {
      maxRow = Math.max(maxRow, p.config.row);
      maxCol = Math.max(maxCol, p.config.col);
    }
    const gridCols = Math.max(columns, maxCol + 1);

    // Build position map
    const posMap = new Map<string, PanelData>();
    for (const p of panels) {
      posMap.set(`${p.config.row}-${p.config.col}`, p.data);
    }

    const rows: TemplateResult[] = [];
    for (let r = 0; r <= maxRow; r++) {
      const cells: TemplateResult[] = [];
      for (let c = 0; c < gridCols; c++) {
        const data = posMap.get(`${r}-${c}`);
        if (data) {
          cells.push(html`
            <opendtu-panel-tile
              .data=${data}
              .showLabel=${this._config.show_labels}
              .showYield=${this._config.show_yield}
            ></opendtu-panel-tile>
          `);
        } else {
          cells.push(html`<div></div>`);
        }
      }
      rows.push(...cells);
    }

    return html`
      <div
        class="grid-container"
        style="grid-template-columns: repeat(${gridCols}, 1fr)"
      >
        ${rows}
      </div>
    `;
  }

  private _renderFreeform(panels: { data: PanelData; config: PanelConfig }[]): TemplateResult {
    const bg = this._config.background;
    const containerStyle = bg
      ? `position: relative; width: 100%; aspect-ratio: ${bg.width}/${bg.height}; background-image: url('${bg.image}'); background-size: contain; background-repeat: no-repeat; background-position: center;`
      : `position: relative; width: 100%; min-height: 400px;`;

    return html`
      <div class="freeform-container" style="${containerStyle}">
        ${panels.map((p) => {
          const x = p.config.x ?? 0;
          const y = p.config.y ?? 0;
          const w = p.config.width ?? 100;
          const h = p.config.height ?? 60;
          const rot = p.config.rotation ?? 0;

          // Convert pixel positions to percentages if background is defined
          let style: string;
          if (bg) {
            const xPct = (x / bg.width) * 100;
            const yPct = (y / bg.height) * 100;
            const wPct = (w / bg.width) * 100;
            const hPct = (h / bg.height) * 100;
            style = `position: absolute; left: ${xPct}%; top: ${yPct}%; width: ${wPct}%; height: ${hPct}%; transform: rotate(${rot}deg);`;
          } else {
            style = `position: absolute; left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px; transform: rotate(${rot}deg);`;
          }

          return html`
            <div style="${style}">
              <opendtu-panel-tile
                .data=${p.data}
                .showLabel=${this._config.show_labels}
                .showYield=${this._config.show_yield}
              ></opendtu-panel-tile>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _collectPanelData(): { data: PanelData; config: PanelConfig }[] {
    const result: { data: PanelData; config: PanelConfig }[] = [];

    for (const inv of this._config.inverters || []) {
      for (const panel of inv.panels || []) {
        const data = this._getPanelData(inv, panel);
        result.push({ data, config: panel });
      }
    }

    return result;
  }

  private _getPanelData(inv: InverterConfig, panel: PanelConfig): PanelData {
    const serial = inv.serial;
    const stringIdx = panel.string;
    const prefix = `sensor.opendtu_`;

    // Find entity states matching this inverter + string
    const power = this._findSensorValue(prefix, serial, `dc_power_string_${stringIdx}`);
    const voltage = this._findSensorValue(prefix, serial, `dc_voltage_string_${stringIdx}`);
    const current = this._findSensorValue(prefix, serial, `dc_current_string_${stringIdx}`);
    const yieldDay = this._findSensorValue(prefix, serial, `dc_yield_day_string_${stringIdx}`);
    const yieldTotal = this._findSensorValue(prefix, serial, `dc_yield_total_string_${stringIdx}`);

    // Get producing/reachable from any sensor's attributes
    let producing = false;
    let reachable = false;

    for (const entityId of Object.keys(this.hass.states)) {
      if (entityId.startsWith(prefix)) {
        const entity = this.hass.states[entityId];
        if (entity.attributes["serial"] === serial) {
          producing = entity.attributes["producing"] as boolean || false;
          reachable = entity.attributes["reachable"] as boolean || false;
          break;
        }
      }
    }

    return {
      serial,
      string: stringIdx,
      label: panel.label,
      power,
      voltage,
      current,
      yieldDay,
      yieldTotal,
      producing,
      reachable,
    };
  }

  private _findSensorValue(
    prefix: string,
    serial: string,
    sensorKey: string,
  ): number | null {
    // Sensor entity IDs: sensor.opendtu_<name>_<key>
    // We need to match by serial attribute since name may vary
    for (const entityId of Object.keys(this.hass.states)) {
      if (!entityId.startsWith(prefix)) continue;
      if (!entityId.endsWith(`_${sensorKey}`)) continue;

      const entity = this.hass.states[entityId];
      if (entity.attributes["serial"] === serial) {
        const val = parseFloat(entity.state);
        return isNaN(val) ? null : val;
      }
    }
    return null;
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
