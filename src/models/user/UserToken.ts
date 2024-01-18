import Claim from './Claim';

interface UserToken {
    email: string;
    id: string;
    claims: Claim[];
}

export default UserToken;
