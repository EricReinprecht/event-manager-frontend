import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

import GoogleMapsProvider from '@components/maps/GoogleMapsProvider';

import '@/i18n';

import '@styles/reset.scss';
import '@styles/globals.scss';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <GoogleMapsProvider>
                <App />
            </GoogleMapsProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
