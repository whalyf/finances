import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Router />
    </BrowserRouter>
  );
}
