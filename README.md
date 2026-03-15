# OpenDTU Monitor

Home Assistant integration with a custom Lovelace card for monitoring solar panels via [OpenDTU](https://github.com/tbnobody/OpenDTU).

## Features

- Connects to OpenDTU REST API to fetch inverter and panel data
- Creates Home Assistant sensor entities for each inverter and DC string
- Custom Lovelace card with configurable grid layout
- **Grid mode**: arrange panels in rows and columns
- **Freeform mode**: place panels on a background image (e.g., rooftop photo) with position, size, and rotation
- Visual card editor for easy configuration
- Auto-discovery of configured inverters

## Installation

### HACS (recommended)

1. Open HACS in Home Assistant
2. Click the three dots menu and select "Custom repositories"
3. Add this repository URL and select "Integration" as the category
4. Click "Install"
5. Restart Home Assistant

### Manual

1. Copy the `custom_components/opendtu_monitor` folder to your Home Assistant `custom_components` directory
2. Restart Home Assistant

## Configuration

1. Go to **Settings > Devices & Services > Add Integration**
2. Search for "OpenDTU Monitor"
3. Enter your OpenDTU host (IP address or hostname) and port
4. The integration will discover your inverters and create sensor entities

## Card Setup

1. Go to your dashboard and click "Edit Dashboard"
2. Click "Add Card" and search for "OpenDTU Monitor"
3. Use the visual editor to:
   - Choose layout mode (Grid or Freeform)
   - Add inverters (auto-detected from the integration)
   - Configure panel positions and labels

### Grid Mode Example

```yaml
type: custom:opendtu-monitor-card
title: Solar Array
layout: grid
columns: 4
show_labels: true
show_yield: true
inverters:
  - serial: "1234567890"
    panels:
      - string: 0
        label: Panel A1
        row: 0
        col: 0
      - string: 1
        label: Panel A2
        row: 0
        col: 1
```

### Freeform Mode Example

```yaml
type: custom:opendtu-monitor-card
title: Rooftop Layout
layout: freeform
show_labels: true
show_yield: true
background:
  image: /local/rooftop.jpg
  width: 800
  height: 600
inverters:
  - serial: "1234567890"
    panels:
      - string: 0
        label: Panel A1
        x: 120
        y: 85
        width: 80
        height: 40
        rotation: 15
```

## Sensors

The integration creates the following sensors per inverter:

**AC**: Power (W), Voltage (V), Current (A), Frequency (Hz)

**Per DC String**: Power (W), Voltage (V), Current (A), Yield Day (Wh), Yield Total (kWh), Irradiation (%)

**Inverter**: Temperature, Efficiency, Yield Day, Yield Total

## Development

```bash
# Install dependencies
npm install

# Build the Lovelace card
npm run build

# Watch mode for development
npm run dev
```

## License

MIT
