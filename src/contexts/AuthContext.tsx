import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';
import Token from '@/models/user/Token';
import UserRegister from '@/models/user/UserRegister';
import UserLogin from '@/models/user/UserLogin';

type AuthContextData = {
    signIn: (credentials: UserLogin) => Promise<void>;
    signUp: (signUpData: UserRegister) => Promise<void>;
    signOut: () => void;
    user: Token | undefined;
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

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        authChannel?.postMessage('signOut');
    }

    Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<Token>();
    const isAuthenticated = !!user;

    useEffect(() => {
        if ('BroadcastChannel' in window) {
            authChannel = new BroadcastChannel('auth');
            authChannel.onmessage = message => {
                if (message.data === 'signOut') {
                    signOut();
                }
            };
        }
    }, []);

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();
        if (token) {
            api.get('profile')
                .then(response => {
                    setUser({
                        data: {
                            accessToken: token,
                            expiresIn: 0,
                            userToken: {
                                id: response.data.id || '',
                                email: response.data.email || '',
                                claims: [],
                                profile: response.data,
                            },
                        },
                        success: true,
                    });
                })
                .catch(() => {});
        }
    }, []);

    async function signIn({ email, password }: UserLogin) {
        const response = await api.post('auth/login', { email, password });
        const result: Token = response.data;

        if (result.success) {
            setCookie(undefined, 'nextauth.token', result.data.accessToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            });

            setUser(result);
            api.defaults.headers['Authorization'] =
                `Bearer ${result.data.accessToken}`;

            Router.push('/dashboard');
            return;
        }

        Router.push('/login');
    }

    async function signUp(userDto: UserRegister) {
        const response = await api.post('auth/register', userDto);
        const result: Token = response.data;

        if (result.success) {
            setCookie(undefined, 'nextauth.token', result.data.accessToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            });

            setUser(result);
            api.defaults.headers['Authorization'] =
                `Bearer ${result.data.accessToken}`;

            Router.push('/dashboard');
            return;
        }

        Router.push('/login');
    }

    return (
        <AuthContext.Provider
            value={{ signIn, signUp, signOut, isAuthenticated, user }}
        >
            {children}
        </AuthContext.Provider>
    );
}
