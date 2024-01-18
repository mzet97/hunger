import UserToken from './UserToken';

interface Data {
    accessToken: string;
    expiresIn: number;
    userToken: UserToken;
}

export default Data;
