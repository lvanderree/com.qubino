"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

module.exports = new ZwaveDriver( path.basename(__dirname), {
	capabilities: {

		'onoff': {
			'command_class'				: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
			'command_get'				: 'SWITCH_MULTILEVEL_GET',
			'command_set'				: 'SWITCH_MULTILEVEL_SET',
			'command_set_parser'		: function( value ){
				return {
					'Value': value
				}
			},
		'command_report'			: 'SWITCH_MULTILEVEL_REPORT',
		'command_report_parser'		: function( report ){
			if( typeof report['Value'] === 'string' ) {
					return report['Value'] === 'on/enable';
				} else {
					return report['Value (Raw)'][0] > 0;
				}
			},
		},

		'dim': {
			'command_class'				: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
			'command_get'				: 'SWITCH_MULTILEVEL_GET',
			'command_set'				: 'SWITCH_MULTILEVEL_SET',
			'command_set_parser'		: function( value ){
				return {
					'Value': value * 100
				}
			},
			'command_report'			: 'SWITCH_MULTILEVEL_REPORT',
			'command_report_parser'		: function( report ){
				if( typeof report['Value'] === 'string' ) {
					return ( report['Value'] === 'on/enable' ) ? 1.0 : 0.0;
				} else {
					return report['Value (Raw)'][0] / 100;
				}
			},
		},
	},
		settings: {
			"Input_1_type": {
			//By this parameter the user can set input based on device type (switch, potentiometer, 0-10V sensor)
			//Available configuration parameters (data type is 1 Byte DEC):
			//default value 0
			//0 - mono-stable switch type (push button) – button quick press turns between previous set dimmer value and zero)
			//1 - Bi-stable switch type
			//2 - Potentiometer (Flush Dimmer 0-10V is using set value the last received from potentiometer or from z-wave controller)
			//3 - 0-10V Temperature sensor (regulated output)
			//4 - 0-10V Illumination sensor (regulated output)
			//5 - 0-10V General propose sensor (regulated output)
			//NOTE: After parameter change to value 3,4 or 5 first exclude module (without setting parameters to default value)
			//then wait at least 30s and then re include the module!

			"index": 1,
			"size": 1,
			"parser": function( input ) {
						return new Buffer([ parseInt(input) ]);
				}
			}
		}
})
