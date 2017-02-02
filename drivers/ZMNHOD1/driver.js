"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

module.exports = new ZwaveDriver(path.basename(__dirname), {
    capabilities: {
        windowcoverings_state: {
            'command_class': 'COMMAND_CLASS_SWITCH_MULTILEVEL',
            'command_get': 'SWITCH_MULTILEVEL_GET',
            'command_set': 'SWITCH_MULTILEVEL_SET',
            'command_set_parser': value => {
                if (value >= 1) value = 0.99;

                return {
                    'Value': value * 100
                };
            },
            'command_report': 'SWITCH_MULTILEVEL_REPORT',
            'command_report_parser': report => report['Value (Raw)'][0] / 100
        },
        measure_power: {
            command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
            command_get: 'SENSOR_MULTILEVEL_GET',
            command_report: 'SENSOR_MULTILEVEL_REPORT',
            command_report_parser: report => report['Sensor Value (Parsed)']
        }
    },

	settings: {
		"Deactivate/Activate_ALL_ON_/_ALL_OFF": {
			"index": 10,
			"size": 2
		},
		"Power_report_on_power_change": {
			"index": 40,
			"size": 1
		},
		"Power_report_by_time_interval": {
			"index": 42,
			"size": 2
		},
		"Operating_modes": {
			"index": 71,
			"size": 1
		},
		"Slats_tilting_full_turn_time": {
			"index": 72,
			"size": 2
		},
		"Slats_position": {
			"index": 73,
			"size": 1,
		},
		"Motor_moving_up_down/time": {
			"index": 74,
			"size": 2
		},
		"Motor_operation_detection": {
            "index": 76,
			"size": 1
		},
        "Forced_Shutter_DC_calibration": {
            "index": 78,
			"size": 1
        },
        "Power_consumption_max_delay_time" : {
            "index": 85,
			"size": 1
        },
        "Power_consumption_at_limit_switch_delay_time": {
            "index": 86,
			"size": 1
        },
        "Time_delay_for_next_motor_movement": {
            "index": 90,
			"size": 1
        },
        "Temperature_sensor_offset_settings": {
            "index": 110,
			"size": 2
        },
        "Digital_temperature_sensor_reporting": {
            "index": 120,
			"size": 1
        },
	}
})
