"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

module.exports = new ZwaveDriver( path.basename(__dirname), {
	 debug: true,
		capabilities: {

		'onoff': {
			'command_class'				: 'COMMAND_CLASS_SWITCH_BINARY',
			'command_get'				: 'SWITCH_BINARY_GET',
			'command_set'				: 'SWITCH_BINARY_SET',
			'command_set_parser'		: function( value ){
				console.log(JSON.stringify(value));
				return {
					'Switch Value': value
				}
			},
			'command_report'			: 'SWITCH_BINARY_REPORT',
			'command_report_parser'		: function( report ){
				console.log(JSON.stringify(report));
				if( report['Value'] === 'on/enable' ) {
								return true;
							} else {
								return false;
							}
			}
		},

		'dim': {
			'command_class'				: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
			'command_get'				: 'SWITCH_MULTILEVEL_GET',
			'command_set'				: 'SWITCH_MULTILEVEL_SET',
			'command_set_parser'		: function( value ){
				console.log(JSON.stringify(value));
				return {
					'Value': value * 100,
					'Dimming Duration': 1
				}
			},
			'command_report'			: 'SWITCH_MULTILEVEL_REPORT',
			'command_report_parser'		: function( report ){
				console.log(JSON.stringify(report));
				if( typeof report['Value'] === 'string' ) {
					return ( report['Value'] === 'on/enable' ) ? 1.0 : 0.0;
				} else {
					return report['Value (Raw)'][0] / 100;
				}
			}
		},

		'meter_power': {
			'command_class'				: 'COMMAND_CLASS_METER',
			'command_get'				: 'METER_GET',
			//'command_get_parser': function() {
			command_get_parser: () => {
				return {
						'Sensor Type': 'Energy meter',
						'Properties1': {
														'Meter Type': 3,
														'Scale': 1,
													//	'Precision': 1,
													//	'Size': 4
												},
								}
			},
			'command_report'			: 'METER_REPORT',
			//'command_report_parser'		: function( report ) {
			command_report_parser: report => {
				console.log(JSON.stringify(report));
				//if (report['Sensor Type'] === 'Energy meter') return report['Sensor Value (Parsed)'];
				//return null;
				return report['Meter Value (Parsed)'][2];
			},
		},

		'measure_temperature': {
			'command_class'				: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			'command_get'				: 'SENSOR_MULTILEVEL_GET',
			'command_get_parser': function() {
				return {
						'Sensor Type': 'Temperature (version 1)',
						'Properties1': {
														'Scale': 0,
													},
								}
			},
			'command_report'			: 'SENSOR_MULTILEVEL_REPORT',
			'command_report_parser'		: function( report ){
				console.log(JSON.stringify(report));
				return report['Sensor Value (Parsed)'] / 10;
			}
		},

		'measure_power': {
			'command_class'				: 'COMMAND_CLASS_METER',
			'command_get'				: 'METER_GET',
			command_get_parser: () => {
			//'command_get_parser': function() {
				return {
						'Sensor Type': 'Electric meter',
						'Properties1': {
														'Meter Type': 3,
														'Scale': 1,
													//	'Precision': 1,
													//	'Size': 4
													},
								}
			},
			'command_report'			: 'METER_REPORT',
			command_report_parser: report => {
			//command_report_parser		: function( report ) {
				console.log(JSON.stringify(report));
				return report['Meter Value (Parsed)'];
				},
			}
		},

		settings: {
			"Input_1_type": {
			"index": 1,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Input_2_contact_type": {
			"index": 2,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Input_3_contact_type": {
			"index": 3,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Deactivate/Activate_ALL_ON_/_ALL_OFF": {
			"index": 10,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"State_of_device_after_power_failure": {
			"index": 30,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ ( input === true ) ? 1 : 0 ]);
				}
			},
			"Power_report_on_power_change": {
			"index": 40,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Power_report_by_time_interval": {
			"index": 42,
			"size": 2,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Maximum_dimming_value": {
			"index": 61,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Minimum_dimming_value": {
			"index": 60,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ]);
				}
			},
			"Dimming_time_(soft_on/off)": {
			"index": 65,
			"size": 1,
			"parser": function( input ) {
				return new Buffer([ parseInt(input) ] * 100);
				}
			},
			"Dimming_time_when_key_pressed": {
			"index": 66,
			"size": 1,
			"parser": function( input ) {
			 	return new Buffer([ parseInt(input)]);
			 }
			}
		}
})
