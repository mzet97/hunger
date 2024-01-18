import axios from 'axios';
import { parseCookies } from 'nookies';

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${cookies['nextauth.token']}`,
        },
    });

    return api;
}
