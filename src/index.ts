import dotenv from 'dotenv';
dotenv.config();

import { UsbDevices } from './models/usbDevices';
import { httpUsbDevices } from './services/http.usbDevices';


const usbDevicesServer: UsbDevices = httpUsbDevices;