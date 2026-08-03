import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import CreateGroup from "./components/CreateGroup";
import CreateExpense from "./components/CreateExpense";
import ExpenseList from "./components/ExpenseList";
import Balance from "./components/Balance";
import SettleUp from "./components/SettleUp";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/createGroup" /> : <Register />}
      />

      <Route
        path="/login"
        element={token ? <Navigate to="/expenseList" /> : <Login />}
      />

      <Route element={<PrivateRoute />}>
        <Route path="/createGroup" element={<CreateGroup />} />
        <Route path="/createExpense" element={<CreateExpense />} />
        <Route path="/expenseList" element={<ExpenseList />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/settleUp" element={<SettleUp />} />
      </Route>
    </Routes>
  );
}