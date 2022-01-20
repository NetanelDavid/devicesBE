import { getDeviceList } from 'usb'
import usbDetect from 'usb-detection';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeviceModel } from '../models/deviceModel';

class DevicesService {

    private devices = new BehaviorSubject(null);

    public getDevices(): Observable<DeviceModel[]> {
        return this.devices;
    }

    private async setDevices() {

        const devices: DeviceModel[] = [];

        for (let _device of getDeviceList()) {

            const vid = _device.deviceDescriptor.idVendor;
            const pid = _device.deviceDescriptor.idProduct;
            const __device = (await usbDetect.find(vid, pid))[0];

            const device: DeviceModel = {
                vendorId: vid,
                productId: pid,
                productIdParent: _device.parent ? _device.parent.deviceDescriptor.idProduct : null,
                description: __device ? __device.deviceName : "desktop",
                type: null
            }

            devices.push(device);
        }

        for (let device of devices) {

            if (!device.productIdParent) {
                continue;
            }
            const parent = devices.find(d => d.productId == device.productIdParent);
            parent.type = 'hub';
        }

        for (let device of devices) {

            device.type = device.type || 'device';
        }

        this.devices.next(devices);
    }

    constructor() {
        this.setDevices();
        usbDetect.startMonitoring();
        usbDetect.on('change', () => this.setDevices());
    }

}

export const devicesService = new DevicesService();