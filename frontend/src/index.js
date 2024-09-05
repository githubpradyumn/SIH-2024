import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { App } from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    // domain="dev-2ax5fdcpvc3hmn8v.us.auth0.com"
    // clientId="WSpVJkp2ZS4LKCzDQaTZU3mPYyMEANZB"
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
