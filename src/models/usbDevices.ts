export abstract class UsbDevices {

    public listener: any;

    abstract portokol: string;
    abstract getDevices: string
    abstract getUpdates: string;
    abstract port: number;

    constructor(listener: any) {
        this.listener = listener;
    }
}