import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import { TweetsProvider } from "./context/TweetsProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider forceColorScheme="dark">
      <TweetsProvider>
        <App />
      </TweetsProvider>
    </MantineProvider>
  </StrictMode>,
);
