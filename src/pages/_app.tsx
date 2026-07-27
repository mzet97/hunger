import { ColorModeScript } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Providers } from './providers';
import Header from '@/components/Header';

import theme from './theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthProvider>
            <CartProvider>
                <Providers>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <Header />
                    <Component {...pageProps} />
                </Providers>
            </CartProvider>
        </AuthProvider>
    );
};

export default MyApp;
