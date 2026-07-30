import CreateGroup from "./components/CreateGroup";
import CreateExpense from "./components/CreateExpense";
import ExpenseList from "./components/ExpenseList";
import Balance from './components/Balance'
import SettleUp from './components/SettleUp'
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/createGroup" element={<CreateGroup />} />
        <Route path="/createExpense" element={<CreateExpense />} />
        <Route path="/expenseList" element={<ExpenseList />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/settleUp" element={<SettleUp />} />
      </Routes>
    </>
  );
}
