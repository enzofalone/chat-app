import ReactDOM from 'react-dom/client';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import App from './App';
import './index.css';
import { UserContextProvider } from './contexts/user';
import { ServerContextProvider } from './contexts/server';
import { ChannelContextProvider } from './contexts/channel';
import { MessageContextProvider } from './contexts/message';
import { Toaster } from 'react-hot-toast';

const myCache = createEmotionCache({
  key: 'mantine',
  prepend: false
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <>
    {/* // <React.StrictMode> */}
    {/* // </React.StrictMode> */}
    <MantineProvider
      emotionCache={myCache}
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
      children={
        <UserContextProvider>
          <ServerContextProvider>
            <ChannelContextProvider>
              <MessageContextProvider>
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      background: '#121a2e',
                      color: 'white',
                    },
                  }}
                />
                <App />
              </MessageContextProvider>
            </ChannelContextProvider>
          </ServerContextProvider>
        </UserContextProvider>
      }
    />
  </>
);
