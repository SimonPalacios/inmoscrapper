import { createBrowserRouter, Navigate } from "react-router-dom";
import { Resultados } from "./components/Resultados";
import { loader } from "./loader";



const router = createBrowserRouter([
  {
    path: "/listado",
    element: <Resultados/>,
    loader
  },
  {
    path: "/*",
    element: <Navigate to="/listado" />,
  },
]);

export default router;