import axios from 'axios';
import { parseCookies } from 'nookies';

export function setupAPIClient(ctx = undefined) {
    const cookies = parseCookies(ctx);
    const token = cookies['nextauth.token'];

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return api;
}
