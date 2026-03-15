"""Fixtures for OpenDTU Monitor tests."""

from __future__ import annotations

import json
from pathlib import Path
from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.core import HomeAssistant

from custom_components.opendtu_monitor.api import OpenDTUApiClient
from custom_components.opendtu_monitor.const import DOMAIN

FIXTURES_DIR = Path(__file__).parent / "fixtures"


def load_fixture(filename: str) -> dict:
    """Load a fixture file."""
    with open(FIXTURES_DIR / filename) as f:
        return json.load(f)


@pytest.fixture
def livedata_response() -> dict:
    """Return mock livedata response."""
    return load_fixture("livedata.json")


@pytest.fixture
def inverter_detail_response() -> dict:
    """Return mock inverter detail response."""
    return load_fixture("inverter_detail.json")


@pytest.fixture
def mock_api_client(livedata_response, inverter_detail_response) -> AsyncMock:
    """Return a mock OpenDTU API client."""
    client = AsyncMock(spec=OpenDTUApiClient)
    client.async_get_livedata.return_value = livedata_response
    client.async_get_inverter_detail.return_value = inverter_detail_response
    return client


@pytest.fixture
def mock_config_entry(hass: HomeAssistant):
    """Return a mock config entry."""
    from homeassistant.config_entries import ConfigEntry

    entry = ConfigEntry(
        version=1,
        minor_version=1,
        domain=DOMAIN,
        title="OpenDTU (192.168.1.100)",
        data={
            "host": "192.168.1.100",
            "port": 80,
            "scan_interval": 30,
        },
        source="user",
        unique_id="192.168.1.100",
    )
    entry.add_to_hass(hass)
    return entry
