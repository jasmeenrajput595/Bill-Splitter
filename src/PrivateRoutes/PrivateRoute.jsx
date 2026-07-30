import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const login = localStorage.getItem("login");

  return login ? <Outlet /> : <Navigate to="/" />;
}