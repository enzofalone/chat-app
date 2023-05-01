import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "./index.css";
import { UserContextProvider } from "./contexts/user";
import { ServerContextProvider } from "./contexts/server";
import { ChannelContextProvider } from "./contexts/channel";
import { MessageContextProvider } from "./contexts/message";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <>
    {/* // <React.StrictMode> */}
    {/* // </React.StrictMode> */}
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
      children={
        <UserContextProvider>
          <ServerContextProvider>
            <MessageContextProvider>
              <ChannelContextProvider>
                <App />
              </ChannelContextProvider>
            </MessageContextProvider>
          </ServerContextProvider>
        </UserContextProvider>
      }
    />
  </>
);
