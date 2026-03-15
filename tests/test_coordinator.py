"""Tests for OpenDTU Monitor coordinator."""

from __future__ import annotations

import pytest
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import UpdateFailed

from custom_components.opendtu_monitor.coordinator import OpenDTUDataUpdateCoordinator
from custom_components.opendtu_monitor.exceptions import (
    OpenDTUApiError,
    OpenDTUConnectionError,
)


async def test_coordinator_update_success(
    hass: HomeAssistant, mock_api_client, livedata_response
):
    """Test successful coordinator update."""
    coordinator = OpenDTUDataUpdateCoordinator(hass, mock_api_client, 30)
    await coordinator.async_refresh()

    assert coordinator.data is not None
    assert coordinator.last_update_success is True
    assert "inverters" in coordinator.data
    assert len(coordinator.data["inverters"]) == 1

    inverter = coordinator.data["inverters"][0]
    assert inverter["serial"] == "112345678901"
    assert inverter["name"] == "HM-800"
    assert "detail" in inverter

    mock_api_client.async_get_livedata.assert_called_once()
    mock_api_client.async_get_inverter_detail.assert_called_once_with("112345678901")


async def test_coordinator_merges_detail(
    hass: HomeAssistant, mock_api_client, inverter_detail_response
):
    """Test that coordinator merges detail data into inverter."""
    coordinator = OpenDTUDataUpdateCoordinator(hass, mock_api_client, 30)
    await coordinator.async_refresh()

    inverter = coordinator.data["inverters"][0]
    detail = inverter["detail"]

    assert "AC" in detail
    assert "DC" in detail
    assert "INV" in detail
    assert detail["DC"]["0"]["Power"]["v"] == 230.1
    assert detail["DC"]["1"]["Power"]["v"] == 220.4


async def test_coordinator_connection_error(hass: HomeAssistant, mock_api_client):
    """Test coordinator handles connection errors."""
    mock_api_client.async_get_livedata.side_effect = OpenDTUConnectionError("Timeout")

    coordinator = OpenDTUDataUpdateCoordinator(hass, mock_api_client, 30)
    await coordinator.async_refresh()

    assert coordinator.last_update_success is False


async def test_coordinator_api_error(hass: HomeAssistant, mock_api_client):
    """Test coordinator handles API errors."""
    mock_api_client.async_get_livedata.side_effect = OpenDTUApiError("Bad response")

    coordinator = OpenDTUDataUpdateCoordinator(hass, mock_api_client, 30)
    await coordinator.async_refresh()

    assert coordinator.last_update_success is False


async def test_coordinator_refresh(hass: HomeAssistant, mock_api_client):
    """Test coordinator refresh updates data."""
    coordinator = OpenDTUDataUpdateCoordinator(hass, mock_api_client, 30)
    await coordinator.async_refresh()

    assert coordinator.last_update_success is True

    await coordinator.async_refresh()

    assert coordinator.last_update_success is True
    assert mock_api_client.async_get_livedata.call_count == 2
