import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ExpenseList() {
  const navigate = useNavigate();


  function handleLogout() {
    localStorage.removeItem("login");
    navigate("/");
  }
  return (
    <>
      {/* <div className=" bg-slate-100 "> */}
        <div className=" bg-indigo-300 flex items-center justify-between">
          <h1 className=" m-2 text-3xl font-bold text-slate-900">Bill-Splitter :</h1>
            <div className="space-x-6">
                 <button
            className=" m-2 rounded-2xl py-3 font-medium hover:bg-indigo-50 transition"
            onClick={() => navigate("/createExpense")}
          >
            Create Expense💵
          </button>
          

          <button
            className=" m-2 rounded-2xl py-3  font-medium hover:bg-indigo-50 transition"
            onClick={() => navigate("/expenseList")}
          >
            Expense List💸
          </button>

          <button
            className=" m-2 rounded-2xl py-3  font-medium hover:bg-indigo-50 transition"
            onClick={() => navigate("/balance")}
          >
            View Balance💳
          </button>

          <button
            className=" m-2 rounded-2xl py-3  font-medium hover:bg-indigo-50 transition"
            onClick={() => navigate("/settleUp")}
          >
            Settle Up💰
          </button>

          <button
            onClick={handleLogout}
            className="rounded-2xl m-2 py-3 font-medium hover:bg-indigo-50 transition"
          >
            Log Out
          </button>
            </div>
        
        </div>
    </>
  );
}
