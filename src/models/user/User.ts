import Address from '../address/Address';
import Profile from '../profile/Profile';

type User = {
    id: string;
    email: string;
    password: string;
    confirmPassword: string;
    profile: Profile;
    address: Address;
};

export default User;
