"""Exceptions for OpenDTU Monitor integration."""


class OpenDTUConnectionError(Exception):
    """Error connecting to OpenDTU."""


class OpenDTUApiError(Exception):
    """Error from OpenDTU API."""
