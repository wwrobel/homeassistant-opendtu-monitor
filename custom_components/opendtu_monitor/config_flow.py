"""Config flow for OpenDTU Monitor."""

from __future__ import annotations

import logging
from typing import Any

import aiohttp
import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import OpenDTUApiClient
from .const import (
    CONF_HOST,
    CONF_PORT,
    CONF_SCAN_INTERVAL,
    DEFAULT_PORT,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
)
from .exceptions import OpenDTUApiError, OpenDTUConnectionError

_LOGGER = logging.getLogger(__name__)

STEP_USER_DATA_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_HOST): str,
        vol.Optional(CONF_PORT, default=DEFAULT_PORT): int,
        vol.Optional(CONF_SCAN_INTERVAL, default=DEFAULT_SCAN_INTERVAL): int,
    }
)


class OpenDTUMonitorConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for OpenDTU Monitor."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle the initial step."""
        errors: dict[str, str] = {}

        if user_input is not None:
            host = user_input[CONF_HOST]
            port = user_input.get(CONF_PORT, DEFAULT_PORT)

            # Set unique ID based on host to prevent duplicates
            await self.async_set_unique_id(host)
            self._abort_if_unique_id_configured()

            # Validate connection
            session = async_get_clientsession(self.hass)
            client = OpenDTUApiClient(session, host, port)

            try:
                data = await client.async_get_livedata()
                inverter_count = len(data.get("inverters", []))
                _LOGGER.info(
                    "Connected to OpenDTU at %s:%s, found %d inverter(s)",
                    host, port, inverter_count,
                )
            except OpenDTUConnectionError:
                errors["base"] = "cannot_connect"
            except OpenDTUApiError:
                errors["base"] = "api_error"
            except Exception:
                _LOGGER.exception("Unexpected error")
                errors["base"] = "unknown"
            else:
                return self.async_create_entry(
                    title=f"OpenDTU ({host})",
                    data=user_input,
                )

        return self.async_show_form(
            step_id="user",
            data_schema=STEP_USER_DATA_SCHEMA,
            errors=errors,
        )
