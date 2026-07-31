import CreateGroup from "./components/CreateGroup";
import CreateExpense from "./components/CreateExpense";
// import Navbar from "./components/Navbar";
import ExpenseList from './components/ExpenseList'
import Balance from "./components/Balance";
import SettleUp from "./components/SettleUp";
import {Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoutes/PrivateRoute'
import LoginPage from './components/LoginPage'

export default function App() {
 
  return (
    <>
      <Routes>
      {/* <Navbar/> */}

        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
        <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/createExpense" element={<CreateExpense />} />
          <Route path="/expenseList" element={<ExpenseList />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/settleUp" element={<SettleUp />} />
        </Route>
      </Routes>
    
    </>
  );
}
