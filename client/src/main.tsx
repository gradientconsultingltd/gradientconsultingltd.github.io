import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Restore the path 404.html saved (see that file for why this exists) —
// must happen before the first render so wouter's initial route match is
// against the real intended path, e.g. /jobs/some-id, not just "/".
const redirect = sessionStorage.getItem("spa_redirect");
if (redirect) {
  sessionStorage.removeItem("spa_redirect");
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")!).render(<App />);
