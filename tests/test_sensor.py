"""Tests for OpenDTU Monitor sensor platform."""

from __future__ import annotations

from unittest.mock import AsyncMock

import pytest
from homeassistant.core import HomeAssistant

from custom_components.opendtu_monitor.coordinator import OpenDTUDataUpdateCoordinator
from custom_components.opendtu_monitor.sensor import (
    AC_SENSORS,
    DC_SENSOR_TEMPLATES,
    INV_SENSORS,
    OpenDTUSensor,
    _extract_value,
)
from tests.conftest import load_fixture


@pytest.fixture
def coordinator_with_data(hass: HomeAssistant, mock_api_client) -> OpenDTUDataUpdateCoordinator:
    """Return a coordinator with mock data pre-loaded."""
    coordinator = OpenDTUDataUpdateCoordinator(hass, mock_api_client, 30)

    # Manually set data to avoid async refresh
    detail = load_fixture("inverter_detail.json")
    livedata = load_fixture("livedata.json")
    livedata["inverters"][0]["detail"] = detail["inverters"][0]
    coordinator.data = livedata

    return coordinator


def test_extract_value_ac_power():
    """Test extracting AC power value."""
    detail = load_fixture("inverter_detail.json")
    data = {"detail": detail["inverters"][0]}

    value = _extract_value(data, "AC", "0", "Power")
    assert value == 450.5


def test_extract_value_dc_voltage():
    """Test extracting DC voltage value."""
    detail = load_fixture("inverter_detail.json")
    data = {"detail": detail["inverters"][0]}

    value = _extract_value(data, "DC", "0", "Voltage")
    assert value == 35.2


def test_extract_value_dc_string_1():
    """Test extracting DC power for string 1."""
    detail = load_fixture("inverter_detail.json")
    data = {"detail": detail["inverters"][0]}

    value = _extract_value(data, "DC", "1", "Power")
    assert value == 220.4


def test_extract_value_inv_temperature():
    """Test extracting inverter temperature."""
    detail = load_fixture("inverter_detail.json")
    data = {"detail": detail["inverters"][0]}

    value = _extract_value(data, "INV", "0", "Temperature")
    assert value == 32.5


def test_extract_value_missing_field():
    """Test extracting non-existent field returns None."""
    data = {"detail": {"AC": {"0": {}}}}

    value = _extract_value(data, "AC", "0", "NonExistent")
    assert value is None


def test_extract_value_missing_section():
    """Test extracting from non-existent section returns None."""
    data = {"detail": {}}

    value = _extract_value(data, "MISSING", "0", "Power")
    assert value is None


def test_ac_sensor_entity(coordinator_with_data):
    """Test AC sensor entity creation and value."""
    desc = AC_SENSORS[0]  # AC Power
    sensor = OpenDTUSensor(
        coordinator_with_data, "112345678901", "HM-800", desc
    )

    assert sensor.unique_id == "112345678901_ac_power"
    assert sensor.native_value == 450.5
    assert sensor.name == "Power"


def test_dc_sensor_entity(coordinator_with_data):
    """Test DC sensor entity creation with string label."""
    from custom_components.opendtu_monitor.sensor import OpenDTUSensorDescription

    desc = OpenDTUSensorDescription(
        key="dc_power_string_0",
        translation_key="dc_power",
        section="DC",
        field="Power",
        channel="0",
        native_unit_of_measurement="W",
    )
    sensor = OpenDTUSensor(
        coordinator_with_data, "112345678901", "HM-800", desc,
        string_label="String 1",
    )

    assert sensor.unique_id == "112345678901_dc_power_string_0"
    assert sensor.native_value == 230.1
    assert sensor.name == "String 1 Power"


def test_inv_sensor_entity(coordinator_with_data):
    """Test INV sensor entity creation."""
    desc = INV_SENSORS[0]  # Temperature
    sensor = OpenDTUSensor(
        coordinator_with_data, "112345678901", "HM-800", desc
    )

    assert sensor.unique_id == "112345678901_temperature"
    assert sensor.native_value == 32.5


def test_sensor_available_when_reachable(coordinator_with_data):
    """Test sensor is available when inverter is reachable."""
    desc = AC_SENSORS[0]
    sensor = OpenDTUSensor(
        coordinator_with_data, "112345678901", "HM-800", desc
    )

    assert sensor.available is True


def test_sensor_available_when_unreachable(coordinator_with_data):
    """Test sensor is still available when inverter is unreachable (e.g. at night)."""
    coordinator_with_data.data["inverters"][0]["reachable"] = False

    desc = AC_SENSORS[0]
    sensor = OpenDTUSensor(
        coordinator_with_data, "112345678901", "HM-800", desc
    )

    # Sensor stays available - reachable only affects attributes, not availability
    assert sensor.available is True


def test_sensor_unavailable_for_unknown_serial(coordinator_with_data):
    """Test sensor is unavailable for unknown serial."""
    desc = AC_SENSORS[0]
    sensor = OpenDTUSensor(
        coordinator_with_data, "999999999999", "Unknown", desc
    )

    assert sensor.available is False
    assert sensor.native_value is None


def test_sensor_extra_attributes(coordinator_with_data):
    """Test sensor extra state attributes."""
    desc = AC_SENSORS[0]
    sensor = OpenDTUSensor(
        coordinator_with_data, "112345678901", "HM-800", desc
    )

    attrs = sensor.extra_state_attributes
    assert attrs is not None
    assert attrs["serial"] == "112345678901"
    assert attrs["producing"] is True
    assert attrs["reachable"] is True


def test_sensor_descriptions_valid():
    """Test all sensor descriptions have required fields."""
    for desc in AC_SENSORS:
        assert desc.key
        assert desc.section == "AC"
        assert desc.field

    for desc in INV_SENSORS:
        assert desc.key
        assert desc.section == "INV"
        assert desc.field

    for desc in DC_SENSOR_TEMPLATES:
        assert desc.key
        assert desc.section == "DC"
        assert desc.field
