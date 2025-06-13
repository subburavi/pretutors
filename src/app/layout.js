'use client';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { SocketContextProvider } from '@/services/socket';
  
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, fontFamily: 'Roboto, sans-serif' }}>
        <AppRouterCacheProvider>
          <Provider store={store}>
            <SocketContextProvider>
              {children}
            </SocketContextProvider>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
