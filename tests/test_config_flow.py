"""Tests for OpenDTU Monitor config flow."""

from __future__ import annotations

from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType

from custom_components.opendtu_monitor.const import DOMAIN
from custom_components.opendtu_monitor.exceptions import (
    OpenDTUApiError,
    OpenDTUConnectionError,
)


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    """Enable custom integrations for all tests."""
    yield


async def test_user_flow_success(hass: HomeAssistant, livedata_response):
    """Test successful user config flow."""
    with patch(
        "custom_components.opendtu_monitor.config_flow.OpenDTUApiClient",
    ) as mock_client_class:
        mock_client = AsyncMock()
        mock_client.async_get_livedata.return_value = livedata_response
        mock_client_class.return_value = mock_client

        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": "user"}
        )
        assert result["type"] is FlowResultType.FORM
        assert result["step_id"] == "user"

        result = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            user_input={
                "host": "192.168.1.100",
                "port": 80,
                "scan_interval": 30,
            },
        )

        assert result["type"] is FlowResultType.CREATE_ENTRY
        assert result["title"] == "OpenDTU (192.168.1.100)"
        assert result["data"] == {
            "host": "192.168.1.100",
            "port": 80,
            "scan_interval": 30,
        }


async def test_user_flow_connection_error(hass: HomeAssistant):
    """Test config flow with connection error."""
    with patch(
        "custom_components.opendtu_monitor.config_flow.OpenDTUApiClient",
    ) as mock_client_class:
        mock_client = AsyncMock()
        mock_client.async_get_livedata.side_effect = OpenDTUConnectionError("Timeout")
        mock_client_class.return_value = mock_client

        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": "user"}
        )
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            user_input={"host": "192.168.1.100", "port": 80, "scan_interval": 30},
        )

        assert result["type"] is FlowResultType.FORM
        assert result["errors"] == {"base": "cannot_connect"}


async def test_user_flow_api_error(hass: HomeAssistant):
    """Test config flow with API error."""
    with patch(
        "custom_components.opendtu_monitor.config_flow.OpenDTUApiClient",
    ) as mock_client_class:
        mock_client = AsyncMock()
        mock_client.async_get_livedata.side_effect = OpenDTUApiError("Bad response")
        mock_client_class.return_value = mock_client

        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": "user"}
        )
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            user_input={"host": "192.168.1.100", "port": 80, "scan_interval": 30},
        )

        assert result["type"] is FlowResultType.FORM
        assert result["errors"] == {"base": "api_error"}


async def test_user_flow_already_configured(hass: HomeAssistant, livedata_response):
    """Test config flow when already configured."""
    with patch(
        "custom_components.opendtu_monitor.config_flow.OpenDTUApiClient",
    ) as mock_client_class:
        mock_client = AsyncMock()
        mock_client.async_get_livedata.return_value = livedata_response
        mock_client_class.return_value = mock_client

        # First setup
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": "user"}
        )
        await hass.config_entries.flow.async_configure(
            result["flow_id"],
            user_input={"host": "192.168.1.100", "port": 80, "scan_interval": 30},
        )

        # Try again with same host
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": "user"}
        )
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            user_input={"host": "192.168.1.100", "port": 80, "scan_interval": 30},
        )

        assert result["type"] is FlowResultType.ABORT
        assert result["reason"] == "already_configured"
