import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Users from "@pages/Users";
import Error404 from "@pages/Error404";
import Root from "@pages/Root";
import ProtectedRoute from "@components/ProtectedRoute";
import "@styles/styles.css";
import Anotaciones from "@pages/Anotaciones"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/anotaciones",
        element: (
          <ProtectedRoute allowedRoles={["ADMINISTRADOR","ESTUDIANTE","PROFESOR"]}>
            <Anotaciones />
          </ProtectedRoute>
        ), 
      }
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
