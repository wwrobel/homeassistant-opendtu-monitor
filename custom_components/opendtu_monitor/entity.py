"""Base entity for OpenDTU Monitor."""

from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import OpenDTUDataUpdateCoordinator


class OpenDTUEntity(CoordinatorEntity[OpenDTUDataUpdateCoordinator]):
    """Base class for OpenDTU entities."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: OpenDTUDataUpdateCoordinator,
        inverter_serial: str,
        inverter_name: str,
    ) -> None:
        super().__init__(coordinator)
        self._serial = inverter_serial
        self._inverter_name = inverter_name
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, inverter_serial)},
            name=inverter_name,
            manufacturer="Hoymiles",
            model=inverter_name,
        )

    @property
    def _inverter_data(self) -> dict | None:
        """Get this inverter's data from coordinator."""
        if not self.coordinator.data:
            return None
        for inv in self.coordinator.data.get("inverters", []):
            if inv.get("serial") == self._serial:
                return inv
        return None
