import AddressRegister from '../address/AddressRegister';
import ProfileRegister from '../profile/ProfileRegister';

type UserRegister = {
    email: string;
    password: string;
    confirmPassword: string;
    profile: ProfileRegister;
    address: AddressRegister;
};

export default UserRegister;
