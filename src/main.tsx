import React from "react";
import ReactDOM from "react-dom/client";
import { Console } from "./components/console";
import { GlobalStyles } from "./globals/global.styles";
import { FileSystemProvider } from "./contexts/fileSystem";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileSystemProvider>
      <GlobalStyles />
      <Console />
    </FileSystemProvider>
  </React.StrictMode>,
);
