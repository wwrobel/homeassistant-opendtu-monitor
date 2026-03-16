"""Tests for OpenDTU API client."""

from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager
from unittest.mock import AsyncMock, MagicMock

import aiohttp
import pytest

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


class MockResponse:
    """Mock aiohttp response that works as async context manager."""

    def __init__(self, json_data=None, status=200):
        self.status = status
        self._json = json_data

    async def json(self):
        return self._json


class MockContextManager:
    """Mock async context manager for session.get()."""

    def __init__(self, response=None, exc=None):
        self._response = response
        self._exc = exc

    async def __aenter__(self):
        if self._exc:
            raise self._exc
        return self._response

    async def __aexit__(self, *args):
        pass


def _mock_session(json_data=None, status=200, exc=None):
    """Create a mock session with proper async context manager."""
    session = MagicMock()
    resp = MockResponse(json_data=json_data, status=status)
    session.get.return_value = MockContextManager(response=resp, exc=exc)
    return session


async def test_get_livedata(livedata_json):
    """Test fetching livedata."""
    session = _mock_session(json_data=livedata_json)
    client = OpenDTUApiClient(session, "192.168.1.100", 80)
    data = await client.async_get_livedata()

    assert "inverters" in data
    assert len(data["inverters"]) == 1
    assert data["inverters"][0]["serial"] == "112345678901"
    session.get.assert_called_once()


async def test_get_inverter_detail(detail_json):
    """Test fetching inverter detail."""
    session = _mock_session(json_data=detail_json)
    client = OpenDTUApiClient(session, "192.168.1.100", 80)
    data = await client.async_get_inverter_detail("112345678901")

    inverter = data["inverters"][0]
    assert "AC" in inverter
    assert "DC" in inverter
    assert "INV" in inverter
    assert inverter["DC"]["0"]["Power"]["v"] == 230.1

    call_kwargs = session.get.call_args
    assert call_kwargs[1]["params"] == {"inv": "112345678901"}


async def test_api_error_status():
    """Test API error on non-200 status."""
    session = _mock_session(status=500)
    client = OpenDTUApiClient(session, "192.168.1.100", 80)

    with pytest.raises(OpenDTUApiError, match="status 500"):
        await client.async_get_livedata()


async def test_connection_error():
    """Test connection error when host is unreachable."""
    session = _mock_session(exc=aiohttp.ClientError("Connection refused"))
    client = OpenDTUApiClient(session, "192.168.1.100", 80)

    with pytest.raises(OpenDTUConnectionError):
        await client.async_get_livedata()


async def test_timeout_error():
    """Test timeout raises connection error."""
    session = _mock_session(exc=asyncio.TimeoutError())
    client = OpenDTUApiClient(session, "192.168.1.100", 80)

    with pytest.raises(OpenDTUConnectionError, match="Timeout"):
        await client.async_get_livedata()
