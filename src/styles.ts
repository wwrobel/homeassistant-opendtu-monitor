import { css } from "lit";

export const cardStyles = css`
  :host {
    --tile-bg: var(--card-background-color, #fff);
    --tile-border: var(--divider-color, #e0e0e0);
    --status-producing: #4caf50;
    --status-idle: #9e9e9e;
    --status-unreachable: #f44336;
  }

  ha-card {
    padding: 16px;
  }

  .card-header {
    font-size: 1.2em;
    font-weight: 500;
    padding-bottom: 12px;
  }

  .grid-container {
    display: grid;
    gap: 8px;
  }
`;

export const tileStyles = css`
  :host {
    display: block;
  }

  .panel-tile {
    background: var(--tile-bg, var(--card-background-color, #fff));
    border: 1px solid var(--tile-border, var(--divider-color, #e0e0e0));
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    position: relative;
    transition: border-color 0.3s ease;
    min-width: 80px;
  }

  .panel-tile.producing {
    border-color: var(--status-producing, #4caf50);
  }

  .panel-tile.idle {
    border-color: var(--status-idle, #9e9e9e);
  }

  .panel-tile.unreachable {
    border-color: var(--status-unreachable, #f44336);
    opacity: 0.6;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .status-dot.producing {
    background-color: var(--status-producing, #4caf50);
  }

  .status-dot.idle {
    background-color: var(--status-idle, #9e9e9e);
  }

  .status-dot.unreachable {
    background-color: var(--status-unreachable, #f44336);
  }

  .panel-label {
    font-size: 0.85em;
    font-weight: 500;
    color: var(--primary-text-color, #333);
    text-align: center;
  }

  .panel-power {
    font-size: 1.4em;
    font-weight: 700;
    color: var(--primary-text-color, #333);
  }

  .panel-power.producing {
    color: var(--status-producing, #4caf50);
  }

  .panel-yield {
    font-size: 0.75em;
    color: var(--secondary-text-color, #666);
  }

  .panel-details {
    font-size: 0.7em;
    color: var(--secondary-text-color, #666);
    display: flex;
    gap: 8px;
  }
`;

export const editorStyles = css`
  :host {
    display: block;
  }

  .editor-container {
    padding: 16px;
  }

  .form-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .form-row label {
    min-width: 100px;
    font-size: 0.9em;
  }

  .form-row input,
  .form-row select {
    flex: 1;
    padding: 8px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #333);
  }

  .inverter-section {
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
  }

  .inverter-header {
    font-weight: 500;
    margin-bottom: 8px;
  }

  .panel-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .panel-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .panel-row input {
    width: 60px;
    padding: 4px 8px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
  }

  button {
    padding: 6px 12px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #333);
    cursor: pointer;
  }

  button:hover {
    background: var(--secondary-background-color, #f5f5f5);
  }
`;
