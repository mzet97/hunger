import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';
import Token from '@/models/user/Token';
import User from '@/models/user/User';

type SignInCredentials = {
    email: string;
    password: string;
};

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => void;
    user: Token;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.refreshToken');

    authChannel.postMessage('signOut');

    Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<Token>();
    const isAuthenticated = !!user;

    useEffect(() => {
        authChannel = new BroadcastChannel('auth');

        authChannel.onmessage = message => {
            switch (message.data) {
                case 'signOut':
                    signOut();
                    break;
                default:
                    break;
            }
        };
    }, []);

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();
    }, []);

    async function signIn({ email, password }: SignInCredentials) {
        const response = await api.post('auth/login', {
            email,
            password,
        });

        const result: Token = response.data;
        console.log(result);

        if (result.success) {
            setCookie(undefined, 'nextauth.token', result.data.accessToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            setUser(result);

            api.defaults.headers['Authorization'] =
                `Bearer ${result.data.accessToken}`;

            Router.push('/dashboard');
        }

        Router.push('/login');
    }

    return (
        <AuthContext.Provider
            value={{ signIn, signOut, isAuthenticated, user }}
        >
            {children}
        </AuthContext.Provider>
    );
}
