import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReactGA from 'react-ga4';

ReactGA.initialize('G-V0DX4Z7PRF');
ReactGA.send('pageview');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
            <App/>
    </BrowserRouter>
  </React.StrictMode>
);
