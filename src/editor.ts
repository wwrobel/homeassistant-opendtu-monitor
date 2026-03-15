import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { editorStyles } from "./styles.js";
import type { HomeAssistant, OpenDTUMonitorCardConfig, InverterConfig, PanelConfig } from "./types.js";

@customElement("opendtu-monitor-card-editor")
export class OpenDTUMonitorCardEditor extends LitElement {
  static styles = editorStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: OpenDTUMonitorCardConfig;

  public setConfig(config: OpenDTUMonitorCardConfig): void {
    this._config = { ...config };
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html``;
    }

    return html`
      <div class="editor-container">
        <div class="form-row">
          <label>Title</label>
          <input
            type="text"
            .value=${this._config.title || ""}
            @input=${this._titleChanged}
          />
        </div>

        <div class="form-row">
          <label>Layout</label>
          <select @change=${this._layoutChanged}>
            <option value="grid" ?selected=${this._config.layout === "grid"}>Grid</option>
            <option value="freeform" ?selected=${this._config.layout === "freeform"}>Freeform</option>
          </select>
        </div>

        ${this._config.layout === "grid"
          ? html`
              <div class="form-row">
                <label>Columns</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  .value=${String(this._config.columns || 4)}
                  @input=${this._columnsChanged}
                />
              </div>
            `
          : html`
              <h3>Background Image</h3>
              <div class="form-row">
                <label>Image URL</label>
                <input
                  type="text"
                  .value=${this._config.background?.image || ""}
                  @input=${this._bgImageChanged}
                  placeholder="/local/rooftop.jpg"
                />
              </div>
              <div class="form-row">
                <label>Width (px)</label>
                <input
                  type="number"
                  min="100"
                  .value=${String(this._config.background?.width || 800)}
                  @input=${this._bgWidthChanged}
                />
              </div>
              <div class="form-row">
                <label>Height (px)</label>
                <input
                  type="number"
                  min="100"
                  .value=${String(this._config.background?.height || 600)}
                  @input=${this._bgHeightChanged}
                />
              </div>
            `}

        <div class="form-row">
          <label>Show labels</label>
          <input
            type="checkbox"
            .checked=${this._config.show_labels !== false}
            @change=${this._showLabelsChanged}
          />
        </div>

        <div class="form-row">
          <label>Show yield</label>
          <input
            type="checkbox"
            .checked=${this._config.show_yield !== false}
            @change=${this._showYieldChanged}
          />
        </div>

        <h3>Inverters</h3>
        ${this._renderInverterDiscovery()}
        ${(this._config.inverters || []).map((inv, i) =>
          this._renderInverterSection(inv, i)
        )}

        <button @click=${this._addInverter}>+ Add Inverter</button>
      </div>
    `;
  }

  private _renderInverterDiscovery(): TemplateResult {
    // Find opendtu_monitor entities in hass.states
    const serials = new Set<string>();
    for (const entityId of Object.keys(this.hass?.states || {})) {
      if (entityId.startsWith("sensor.opendtu_")) {
        const entity = this.hass.states[entityId];
        const serial = entity.attributes["serial"] as string;
        if (serial) {
          serials.add(serial);
        }
      }
    }

    if (serials.size === 0) return html``;

    const configured = new Set((this._config.inverters || []).map((i) => i.serial));
    const unconfigured = [...serials].filter((s) => !configured.has(s));

    if (unconfigured.length === 0) return html``;

    return html`
      <div style="margin-bottom: 12px; font-size: 0.85em; color: var(--secondary-text-color)">
        Detected inverters: ${unconfigured.map(
          (s) => html`
            <button @click=${() => this._addDetectedInverter(s)}>${s}</button>
          `
        )}
      </div>
    `;
  }

  private _renderInverterSection(inv: InverterConfig, index: number): TemplateResult {
    return html`
      <div class="inverter-section">
        <div class="inverter-header">
          Inverter: ${inv.serial}
          <button @click=${() => this._removeInverter(index)}>Remove</button>
        </div>

        <div class="form-row">
          <label>Serial</label>
          <input
            type="text"
            .value=${inv.serial}
            @input=${(e: Event) => this._inverterSerialChanged(index, e)}
          />
        </div>

        <div class="panel-list">
          ${(inv.panels || []).map((panel, pi) =>
            this._renderPanelRow(index, panel, pi)
          )}
        </div>

        <button @click=${() => this._addPanel(index)}>+ Add Panel</button>
      </div>
    `;
  }

  private _renderPanelRow(
    invIndex: number,
    panel: PanelConfig,
    panelIndex: number
  ): TemplateResult {
    const isFreeform = this._config.layout === "freeform";

    return html`
      <div class="panel-row" style="flex-wrap: wrap;">
        <label>String</label>
        <input
          type="number"
          min="0"
          .value=${String(panel.string)}
          @input=${(e: Event) =>
            this._panelFieldChanged(invIndex, panelIndex, "string", e)}
        />
        <label>Label</label>
        <input
          type="text"
          .value=${panel.label}
          @input=${(e: Event) =>
            this._panelFieldChanged(invIndex, panelIndex, "label", e)}
        />
        ${isFreeform
          ? html`
              <label>X</label>
              <input type="number" .value=${String(panel.x ?? 0)}
                @input=${(e: Event) => this._panelFieldChanged(invIndex, panelIndex, "x", e)} />
              <label>Y</label>
              <input type="number" .value=${String(panel.y ?? 0)}
                @input=${(e: Event) => this._panelFieldChanged(invIndex, panelIndex, "y", e)} />
              <label>W</label>
              <input type="number" .value=${String(panel.width ?? 100)}
                @input=${(e: Event) => this._panelFieldChanged(invIndex, panelIndex, "width", e)} />
              <label>H</label>
              <input type="number" .value=${String(panel.height ?? 60)}
                @input=${(e: Event) => this._panelFieldChanged(invIndex, panelIndex, "height", e)} />
              <label>Rot</label>
              <input type="number" min="-180" max="180" .value=${String(panel.rotation ?? 0)}
                @input=${(e: Event) => this._panelFieldChanged(invIndex, panelIndex, "rotation", e)} />
            `
          : html`
              <label>Row</label>
              <input type="number" min="0" .value=${String(panel.row)}
                @input=${(e: Event) => this._panelFieldChanged(invIndex, panelIndex, "row", e)} />
              <label>Col</label>
              <input type="number" min="0" .value=${String(panel.col)}
                @input=${(e: Event) => this._panelFieldChanged(invIndex, panelIndex, "col", e)} />
            `}
        <button @click=${() => this._removePanel(invIndex, panelIndex)}>X</button>
      </div>
    `;
  }

  private _fireConfigChanged(): void {
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _titleChanged(e: Event): void {
    this._config = { ...this._config, title: (e.target as HTMLInputElement).value };
    this._fireConfigChanged();
  }

  private _layoutChanged(e: Event): void {
    this._config = {
      ...this._config,
      layout: (e.target as HTMLSelectElement).value as "grid" | "freeform",
    };
    this._fireConfigChanged();
  }

  private _columnsChanged(e: Event): void {
    this._config = {
      ...this._config,
      columns: parseInt((e.target as HTMLInputElement).value) || 4,
    };
    this._fireConfigChanged();
  }

  private _showLabelsChanged(e: Event): void {
    this._config = {
      ...this._config,
      show_labels: (e.target as HTMLInputElement).checked,
    };
    this._fireConfigChanged();
  }

  private _showYieldChanged(e: Event): void {
    this._config = {
      ...this._config,
      show_yield: (e.target as HTMLInputElement).checked,
    };
    this._fireConfigChanged();
  }

  private _bgImageChanged(e: Event): void {
    const image = (e.target as HTMLInputElement).value;
    this._config = {
      ...this._config,
      background: {
        ...(this._config.background || { image: "", width: 800, height: 600 }),
        image,
      },
    };
    this._fireConfigChanged();
  }

  private _bgWidthChanged(e: Event): void {
    const width = parseInt((e.target as HTMLInputElement).value) || 800;
    this._config = {
      ...this._config,
      background: {
        ...(this._config.background || { image: "", width: 800, height: 600 }),
        width,
      },
    };
    this._fireConfigChanged();
  }

  private _bgHeightChanged(e: Event): void {
    const height = parseInt((e.target as HTMLInputElement).value) || 600;
    this._config = {
      ...this._config,
      background: {
        ...(this._config.background || { image: "", width: 800, height: 600 }),
        height,
      },
    };
    this._fireConfigChanged();
  }

  private _addInverter(): void {
    const inverters = [...(this._config.inverters || [])];
    inverters.push({ serial: "", panels: [] });
    this._config = { ...this._config, inverters };
    this._fireConfigChanged();
  }

  private _addDetectedInverter(serial: string): void {
    const inverters = [...(this._config.inverters || [])];
    inverters.push({ serial, panels: [{ string: 0, label: "Panel 1", row: 0, col: 0 }] });
    this._config = { ...this._config, inverters };
    this._fireConfigChanged();
  }

  private _removeInverter(index: number): void {
    const inverters = [...(this._config.inverters || [])];
    inverters.splice(index, 1);
    this._config = { ...this._config, inverters };
    this._fireConfigChanged();
  }

  private _inverterSerialChanged(index: number, e: Event): void {
    const inverters = [...(this._config.inverters || [])];
    inverters[index] = { ...inverters[index], serial: (e.target as HTMLInputElement).value };
    this._config = { ...this._config, inverters };
    this._fireConfigChanged();
  }

  private _addPanel(invIndex: number): void {
    const inverters = [...(this._config.inverters || [])];
    const panels = [...(inverters[invIndex].panels || [])];
    panels.push({ string: panels.length, label: `Panel ${panels.length + 1}`, row: 0, col: panels.length });
    inverters[invIndex] = { ...inverters[invIndex], panels };
    this._config = { ...this._config, inverters };
    this._fireConfigChanged();
  }

  private _removePanel(invIndex: number, panelIndex: number): void {
    const inverters = [...(this._config.inverters || [])];
    const panels = [...(inverters[invIndex].panels || [])];
    panels.splice(panelIndex, 1);
    inverters[invIndex] = { ...inverters[invIndex], panels };
    this._config = { ...this._config, inverters };
    this._fireConfigChanged();
  }

  private _panelFieldChanged(
    invIndex: number,
    panelIndex: number,
    field: keyof PanelConfig,
    e: Event,
  ): void {
    const inverters = [...(this._config.inverters || [])];
    const panels = [...(inverters[invIndex].panels || [])];
    const value = (e.target as HTMLInputElement).value;
    panels[panelIndex] = {
      ...panels[panelIndex],
      [field]: field === "label" ? value : parseInt(value) || 0,
    };
    inverters[invIndex] = { ...inverters[invIndex], panels };
    this._config = { ...this._config, inverters };
    this._fireConfigChanged();
  }
}
