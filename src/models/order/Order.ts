import Item from './Item';

export default interface Order {
    id: string;
    orderStatus: number;
    price: number;
    idProfileUser: string | null;
    idCoupon: string | null;
    items: Item[];
    createdAt: string;
    updatedAt: string;
}
