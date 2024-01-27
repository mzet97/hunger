import Claim from './Claim';

type UserToken = {
    email: string;
    id: string;
    claims: Claim[];
};

export default UserToken;
