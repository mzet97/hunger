export enum OrderStatus {
    WaitingForPayment = 0,
    Paid = 1,
    Preparing = 2,
    OutForDelivery = 3,
    Delivered = 4,
}

export const OrderStatusLabels: Record<number, string> = {
    [OrderStatus.WaitingForPayment]: 'Waiting for Payment',
    [OrderStatus.Paid]: 'Paid',
    [OrderStatus.Preparing]: 'Preparing',
    [OrderStatus.OutForDelivery]: 'Out for Delivery',
    [OrderStatus.Delivered]: 'Delivered',
};

export const OrderStatusColors: Record<number, string> = {
    [OrderStatus.WaitingForPayment]: 'yellow',
    [OrderStatus.Paid]: 'blue',
    [OrderStatus.Preparing]: 'orange',
    [OrderStatus.OutForDelivery]: 'purple',
    [OrderStatus.Delivered]: 'green',
};
