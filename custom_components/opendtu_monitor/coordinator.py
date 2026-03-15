"""DataUpdateCoordinator for OpenDTU Monitor."""

from __future__ import annotations

import logging
from datetime import timedelta

from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import OpenDTUApiClient
from .const import DOMAIN
from .exceptions import OpenDTUApiError, OpenDTUConnectionError

_LOGGER = logging.getLogger(__name__)


class OpenDTUDataUpdateCoordinator(DataUpdateCoordinator[dict]):
    """Coordinator to fetch data from OpenDTU."""

    def __init__(
        self,
        hass: HomeAssistant,
        client: OpenDTUApiClient,
        scan_interval: int,
    ) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=timedelta(seconds=scan_interval),
        )
        self.client = client

    async def _async_update_data(self) -> dict:
        """Fetch data from OpenDTU API."""
        try:
            data = await self.client.async_get_livedata()
            inverters = data.get("inverters", [])

            for inverter in inverters:
                serial = inverter.get("serial", "")
                if serial:
                    detail = await self.client.async_get_inverter_detail(serial)
                    # Merge detail into inverter data
                    detail_inverters = detail.get("inverters", [])
                    if detail_inverters:
                        inverter["detail"] = detail_inverters[0]

            return data
        except (OpenDTUConnectionError, OpenDTUApiError) as err:
            raise UpdateFailed(str(err)) from err
