"""OpenDTU REST API client."""

from __future__ import annotations

import asyncio
import logging

import aiohttp

from .exceptions import OpenDTUApiError, OpenDTUConnectionError

_LOGGER = logging.getLogger(__name__)


class OpenDTUApiClient:
    """Async client for the OpenDTU REST API."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        host: str,
        port: int = 80,
    ) -> None:
        self._session = session
        self._base_url = f"http://{host}:{port}"

    async def async_get_livedata(self) -> dict:
        """Fetch summary livedata for all inverters."""
        return await self._request("/api/livedata/status")

    async def async_get_inverter_detail(self, serial: str) -> dict:
        """Fetch detailed livedata for a single inverter."""
        return await self._request("/api/livedata/status", params={"inv": serial})

    async def _request(
        self, path: str, params: dict | None = None
    ) -> dict:
        """Make a GET request to OpenDTU."""
        url = f"{self._base_url}{path}"
        try:
            async with asyncio.timeout(10):
                async with self._session.get(url, params=params) as resp:
                    if resp.status != 200:
                        raise OpenDTUApiError(
                            f"API returned status {resp.status}"
                        )
                    return await resp.json()
        except asyncio.TimeoutError as err:
            raise OpenDTUConnectionError(
                f"Timeout connecting to {url}"
            ) from err
        except aiohttp.ClientError as err:
            raise OpenDTUConnectionError(
                f"Error connecting to {url}: {err}"
            ) from err
