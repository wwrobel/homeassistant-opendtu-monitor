import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tileStyles } from "../styles.js";
import type { PanelData } from "../types.js";

@customElement("opendtu-panel-tile")
export class PanelTile extends LitElement {
  static styles = tileStyles;

  @property({ attribute: false }) public data!: PanelData;
  @property({ type: Boolean }) public showLabel = true;
  @property({ type: Boolean }) public showYield = true;

  protected render(): TemplateResult {
    const status = this._getStatus();
    const powerStr = this._formatPower();

    return html`
      <div class="panel-tile ${status}">
        <span class="status-dot ${status}"></span>
        ${this.showLabel
          ? html`<span class="panel-label">${this.data.label}</span>`
          : ""}
        <span class="panel-power ${status}">${powerStr}</span>
        ${this.showYield && this.data.yieldDay != null
          ? html`<span class="panel-yield">${this.data.yieldDay} Wh today</span>`
          : ""}
        <div class="panel-details">
          ${this.data.voltage != null
            ? html`<span>${this.data.voltage}V</span>`
            : ""}
          ${this.data.current != null
            ? html`<span>${this.data.current}A</span>`
            : ""}
        </div>
      </div>
    `;
  }

  private _getStatus(): string {
    if (!this.data.reachable) return "unreachable";
    if (this.data.producing) return "producing";
    return "idle";
  }

  private _formatPower(): string {
    if (this.data.power == null) return "-- W";
    return `${Math.round(this.data.power)} W`;
  }
}
