export interface DeviceModel {
    type: 'device' | 'hub';
    productId: number;
    vendorId: number;
    productIdParent: number;
    description: string;
}