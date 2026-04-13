import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TechpathLanding from "./Techpath landing";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TechpathLanding />
  </StrictMode>,
);
