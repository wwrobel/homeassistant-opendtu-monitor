import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { editorStyles } from "./styles.js";
import type { HomeAssistant, OpenDTUMonitorCardConfig } from "./types.js";

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
          <label>Columns</label>
          <input
            type="number"
            min="1"
            max="12"
            .value=${String(this._config.columns || 4)}
            @input=${this._columnsChanged}
          />
        </div>

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

        <p style="font-size: 0.85em; color: var(--secondary-text-color);">
          Panels are auto-discovered from OpenDTU Monitor sensors.
        </p>
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
}
