﻿# Qubino

This app adds support following Qubino devices in Homey:

* ZMNHVD1 Flush Dimmer 0-10V (Z-Wave Plus)
* ZMNHDD1 Flush Dimmer (Z-Wave Plus)
* ZMNHDA2 Flush Dimmer
* ZMNHSD1 DIN RAIL Dimmer (untested)
* ZMNHOD1 Flush shutter DC (untested)

Not all settings are implemented. Feel free to contribute!
Temperature sensor only working for ZMNHDA2.

Version 1.05

* Added Support for Flush shutter DC 

Version 1.04

* Icons for devices changed
* Powermeasurement in kWh and Watt added.
* Moved to mobile devicecards. Be aware, not al values are visible because at this moment there is no scrollbar and items in Chrome are limited to 4 and in IOS to 3.
* ZMNHDA2 Flush Dimmer: If no temperaturesensor connected, -999,90 °C is shown as value.
* ZMNHVD1 & ZMNHDA2 Flow trigger added for Temperature changed.
