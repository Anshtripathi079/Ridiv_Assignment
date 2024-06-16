import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./index.css";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </ThemeProvider>
);
