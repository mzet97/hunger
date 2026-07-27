import AddressRestaurant from './AddressRestaurant';
import CategoryRestaurant from './CategoryRestaurant';
import Comment from './Comment';

export default interface Restaurant {
    id: string;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    categoryRestaurant: CategoryRestaurant;
    addressRestaurant: AddressRestaurant;
    comments: Comment[];
}
