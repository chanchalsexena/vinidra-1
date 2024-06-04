import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import store from "./store/store.js";
import App from "./App.jsx";
import "chart.js/auto";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ReduxProvider store={store}>
      <Auth0Provider
        domain="dev-87mxaue7zbm0l60f.us.auth0.com"
        clientId="9fcnawThYnIiM4KSw3Si1zIISHuyMnMH"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </ReduxProvider>
    <Toaster position="top-right" reverseOrder={false} width="360px" />
  </ChakraProvider>
);
