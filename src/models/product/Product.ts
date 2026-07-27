import CategoryProduct from './CategoryProduct';

export default interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    vegan: boolean;
    vegetarian: boolean;
    kosher: boolean;
    createdAt: string;
    updatedAt: string;
    categoryProduct: CategoryProduct;
}
