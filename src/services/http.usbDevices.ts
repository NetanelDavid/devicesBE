import cors from 'cors';
import express, { Response, Request } from 'express';
import { UsbDevices } from "../models/usbDevices";
import { devicesService } from "./device.service";

class HttpUsbDevices extends UsbDevices {

    portokol: string = "http";
    getDevices = '/devices';
    getUpdates = '/devices';
    port = +process.env.PORT || 5050;

    constructor() {

        super(express());

        this.listener.listen(this.port, () => {
            console.log(`server running on port: ${this.port}.`);
        });

        this.listener.use(cors());
        this.listener.use(express.json());

        this.listener.get(this.getDevices, (req: Request, res: Response) => {

            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            });

            devicesService.getDevices().subscribe(devices => {
                const data = `data: ${JSON.stringify(devices)}\n\n`;
                res.write(data);
            });
        })
    }
}

export const httpUsbDevices = new HttpUsbDevices();