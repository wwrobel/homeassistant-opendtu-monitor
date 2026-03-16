"""Sensor platform for OpenDTU Monitor."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    PERCENTAGE,
    UnitOfElectricCurrent,
    UnitOfElectricPotential,
    UnitOfEnergy,
    UnitOfFrequency,
    UnitOfPower,
    UnitOfTemperature,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .coordinator import OpenDTUDataUpdateCoordinator
from .entity import OpenDTUEntity


@dataclass(frozen=True, kw_only=True)
class OpenDTUSensorDescription(SensorEntityDescription):
    """Sensor entity description for OpenDTU."""

    section: str  # "AC", "DC", "INV"
    field: str  # e.g. "Power", "Voltage"
    channel: str = "0"


# Per-inverter AC sensors
AC_SENSORS: tuple[OpenDTUSensorDescription, ...] = (
    OpenDTUSensorDescription(
        key="ac_power",
        translation_key="ac_power",
        section="AC",
        field="Power",
        native_unit_of_measurement=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    OpenDTUSensorDescription(
        key="ac_voltage",
        translation_key="ac_voltage",
        section="AC",
        field="Voltage",
        native_unit_of_measurement=UnitOfElectricPotential.VOLT,
        device_class=SensorDeviceClass.VOLTAGE,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    OpenDTUSensorDescription(
        key="ac_current",
        translation_key="ac_current",
        section="AC",
        field="Current",
        native_unit_of_measurement=UnitOfElectricCurrent.AMPERE,
        device_class=SensorDeviceClass.CURRENT,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    OpenDTUSensorDescription(
        key="ac_frequency",
        translation_key="ac_frequency",
        section="AC",
        field="Frequency",
        native_unit_of_measurement=UnitOfFrequency.HERTZ,
        device_class=SensorDeviceClass.FREQUENCY,
        state_class=SensorStateClass.MEASUREMENT,
    ),
)

# Per-inverter INV sensors
INV_SENSORS: tuple[OpenDTUSensorDescription, ...] = (
    OpenDTUSensorDescription(
        key="temperature",
        translation_key="temperature",
        section="INV",
        field="Temperature",
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        device_class=SensorDeviceClass.TEMPERATURE,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    OpenDTUSensorDescription(
        key="efficiency",
        translation_key="efficiency",
        section="INV",
        field="Efficiency",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        icon="mdi:flash-circle",
    ),
    OpenDTUSensorDescription(
        key="yield_day",
        translation_key="yield_day",
        section="INV",
        field="YieldDay",
        native_unit_of_measurement=UnitOfEnergy.WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    OpenDTUSensorDescription(
        key="yield_total",
        translation_key="yield_total",
        section="INV",
        field="YieldTotal",
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
)

# Per-string DC sensor templates (channel filled dynamically)
DC_SENSOR_TEMPLATES: tuple[OpenDTUSensorDescription, ...] = (
    OpenDTUSensorDescription(
        key="dc_power",
        translation_key="dc_power",
        section="DC",
        field="Power",
        native_unit_of_measurement=UnitOfPower.WATT,
        device_class=SensorDeviceClass.POWER,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    OpenDTUSensorDescription(
        key="dc_voltage",
        translation_key="dc_voltage",
        section="DC",
        field="Voltage",
        native_unit_of_measurement=UnitOfElectricPotential.VOLT,
        device_class=SensorDeviceClass.VOLTAGE,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    OpenDTUSensorDescription(
        key="dc_current",
        translation_key="dc_current",
        section="DC",
        field="Current",
        native_unit_of_measurement=UnitOfElectricCurrent.AMPERE,
        device_class=SensorDeviceClass.CURRENT,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    OpenDTUSensorDescription(
        key="dc_yield_day",
        translation_key="dc_yield_day",
        section="DC",
        field="YieldDay",
        native_unit_of_measurement=UnitOfEnergy.WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    OpenDTUSensorDescription(
        key="dc_yield_total",
        translation_key="dc_yield_total",
        section="DC",
        field="YieldTotal",
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        device_class=SensorDeviceClass.ENERGY,
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    OpenDTUSensorDescription(
        key="dc_irradiation",
        translation_key="dc_irradiation",
        section="DC",
        field="Irradiation",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        icon="mdi:sun-wireless",
    ),
)


def _extract_value(data: dict, section: str, channel: str, field: str) -> float | None:
    """Extract a value from inverter detail data."""
    detail = data.get("detail", {})
    section_data = detail.get(section, {})
    channel_data = section_data.get(channel, {})
    field_data = channel_data.get(field, {})
    if isinstance(field_data, dict) and "v" in field_data:
        return field_data["v"]
    return None


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up OpenDTU sensors from a config entry."""
    coordinator: OpenDTUDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    entities: list[OpenDTUSensor] = []

    for inverter in coordinator.data.get("inverters", []):
        serial = inverter.get("serial", "")
        name = inverter.get("name", serial)

        # AC sensors
        for desc in AC_SENSORS:
            entities.append(OpenDTUSensor(coordinator, serial, name, desc))

        # INV sensors
        for desc in INV_SENSORS:
            entities.append(OpenDTUSensor(coordinator, serial, name, desc))

        # DC sensors per string
        detail = inverter.get("detail", {})
        dc_data = detail.get("DC", {})
        for channel_key in sorted(dc_data.keys()):
            channel_name = dc_data[channel_key].get("name", {})
            if isinstance(channel_name, dict):
                channel_label = channel_name.get("u", f"String {channel_key}")
            else:
                channel_label = channel_name or f"String {channel_key}"

            for template in DC_SENSOR_TEMPLATES:
                desc = OpenDTUSensorDescription(
                    key=f"{template.key}_string_{channel_key}",
                    translation_key=template.translation_key,
                    section=template.section,
                    field=template.field,
                    channel=channel_key,
                    native_unit_of_measurement=template.native_unit_of_measurement,
                    device_class=template.device_class,
                    state_class=template.state_class,
                    icon=template.icon,
                )
                entities.append(
                    OpenDTUSensor(
                        coordinator, serial, name, desc,
                        string_label=channel_label,
                    )
                )

    async_add_entities(entities)


class OpenDTUSensor(OpenDTUEntity, SensorEntity):
    """Sensor entity for OpenDTU data."""

    entity_description: OpenDTUSensorDescription

    def __init__(
        self,
        coordinator: OpenDTUDataUpdateCoordinator,
        inverter_serial: str,
        inverter_name: str,
        description: OpenDTUSensorDescription,
        string_label: str | None = None,
    ) -> None:
        super().__init__(coordinator, inverter_serial, inverter_name)
        self.entity_description = description
        self._string_label = string_label
        self._attr_unique_id = f"{inverter_serial}_{description.key}"
        if string_label:
            self._attr_name = f"{string_label} {description.field}"
        else:
            self._attr_name = description.field

    @property
    def native_value(self) -> float | None:
        """Return the sensor value."""
        data = self._inverter_data
        if data is None:
            return None
        return _extract_value(
            data,
            self.entity_description.section,
            self.entity_description.channel,
            self.entity_description.field,
        )

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        if not super().available:
            return False
        return self._inverter_data is not None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        data = self._inverter_data
        if data is None:
            return None
        return {
            "serial": self._serial,
            "producing": data.get("producing", False),
            "reachable": data.get("reachable", False),
        }
