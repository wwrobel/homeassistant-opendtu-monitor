"""Tests for OpenDTU API client."""

from __future__ import annotations

import pytest
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from custom_components.opendtu_monitor.api import OpenDTUApiClient
from custom_components.opendtu_monitor.exceptions import (
    OpenDTUApiError,
    OpenDTUConnectionError,
)
from tests.conftest import load_fixture


@pytest.fixture
def livedata_json():
    """Return livedata fixture."""
    return load_fixture("livedata.json")


@pytest.fixture
def detail_json():
    """Return inverter detail fixture."""
    return load_fixture("inverter_detail.json")


async def test_get_livedata(hass: HomeAssistant, aioclient_mock, livedata_json):
    """Test fetching livedata."""
    aioclient_mock.get(
        "http://192.168.1.100:80/api/livedata/status",
        json=livedata_json,
    )

    session = async_get_clientsession(hass)
    client = OpenDTUApiClient(session, "192.168.1.100", 80)
    data = await client.async_get_livedata()

    assert "inverters" in data
    assert len(data["inverters"]) == 1
    assert data["inverters"][0]["serial"] == "112345678901"


async def test_get_inverter_detail(hass: HomeAssistant, aioclient_mock, detail_json):
    """Test fetching inverter detail."""
    aioclient_mock.get(
        "http://192.168.1.100:80/api/livedata/status?inv=112345678901",
        json=detail_json,
    )

    session = async_get_clientsession(hass)
    client = OpenDTUApiClient(session, "192.168.1.100", 80)
    data = await client.async_get_inverter_detail("112345678901")

    inverter = data["inverters"][0]
    assert "AC" in inverter
    assert "DC" in inverter
    assert "INV" in inverter
    assert inverter["DC"]["0"]["Power"]["v"] == 230.1


async def test_api_error_status(hass: HomeAssistant, aioclient_mock):
    """Test API error on non-200 status."""
    aioclient_mock.get(
        "http://192.168.1.100:80/api/livedata/status",
        status=500,
    )

    session = async_get_clientsession(hass)
    client = OpenDTUApiClient(session, "192.168.1.100", 80)

    with pytest.raises(OpenDTUApiError, match="status 500"):
        await client.async_get_livedata()


async def test_connection_error(hass: HomeAssistant, aioclient_mock):
    """Test connection error when host is unreachable."""
    aioclient_mock.get(
        "http://192.168.1.100:80/api/livedata/status",
        exc=TimeoutError(),
    )

    session = async_get_clientsession(hass)
    client = OpenDTUApiClient(session, "192.168.1.100", 80)

    with pytest.raises(OpenDTUConnectionError):
        await client.async_get_livedata()
