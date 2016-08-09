"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

module.exports = new ZwaveDriver( path.basename(__dirname), {
	debug: true,
	capabilities: {

	'onoff': {
			'command_class'				: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
			'command_get'				: 'SWITCH_MULTILEVEL_GET',
			'command_set'				: 'SWITCH_MULTILEVEL_SET',
			'command_set_parser'		: function( value ){
				console.log(JSON.stringify(value));
				return {
					'Value': ( value > 0 ) ? 'on/enable' : 'off/disable',
					'Dimming Duration': 1
				}
			},
			'command_report'			: 'SWITCH_MULTILEVEL_REPORT',
			'command_report_parser'		: function( report ){
				console.log(JSON.stringify(report));
					if (report.hasOwnProperty('Current Value')) return report['Current Value'] !== 0;
					if (report.hasOwnProperty('Value')) return report['Value'] !== 0;
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
					'Dimming Duration': 10
				}
			},
			'command_report'			: 'SWITCH_MULTILEVEL_REPORT',
			'command_report_parser'		: function( report ){
				console.log(JSON.stringify(report));
				return report['Value (Raw)'][0] / 100;
			}
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
		"State_of_device_after_power_failure": {
		"index": 30,
		"size": 1,
		"parser": function( input ) {
			return new Buffer([ ( input === true ) ? 1 : 0 ]);
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

module.exports.on('initNode', function( token ){

    var node = module.exports.nodes[ token ];
    if( node ) {
        node.instance.CommandClass['COMMAND_CLASS_SWITCH_MULTILEVEL'].on('value', function( command, report ){
            //console.log(command);
            console.log('COMMAND NAME LOG: ' + JSON.stringify(command.name, null, 4));
            //console.log(report);
            console.log('REPORT LOG: ' + JSON.stringify(report, null, 4));
        });
    }
})
