import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ExpenseList() {
  const navigate = useNavigate();
  // const [groups, setGroups] = useState([]);
  // const [selectedGroup, setSelectedGroup] = useState("");
  // const [expenses, setExpenses] = useState([]);

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/immutability
  //   getGroups();
  // }, []);

  // async function getGroups() {
  //   try {
  //     const response = await axios.get("http://localhost:3000/group/groups");
  //     setGroups(response.data.groups);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function getExpenses() {
  //   if (!selectedGroup) {
  //     alert("Please Select Group");
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/group/expenses/${selectedGroup}`,
  //     );

  //     setExpenses(response.data.expenses);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
            className=" rounded-2xl py-3 font-medium hover:bg-indigo-50 transition"
            onClick={() => navigate("/createExpense")}
          >
            Create Expense💵
          </button>
          
          <button
            className=" m-2 rounded-2xl py-3  font-medium hover:bg-indigo-50 transition"
            onClick={() => navigate("/balance")}
          >
            View Balance💳
          </button>

          <button
            className=" m-2 rounded-2xl py-3  font-medium hover:bg-indigo-50 transition"
            onClick={() => navigate("/expenseList")}
          >
            Expense List💸
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
         {/* <div className="flex justify-center w-full pt-15">
        <div className=" bg-white rounded-3xl shadow-lg border border-slate-200 p-8 max-w-2xl ">
         
          <select
            className=" mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option>Select Group</option>

            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.groupName}
              </option>
            ))}
          </select>
           <button
            className="mt-2 m-2 rounded-2xl py-3 text-red-700 font-medium hover:bg-red-50 transition"
            onClick={getExpenses}
          >
            Show Expenses💸
          </button>

          {expenses.map((expense) => (
            <div
              key={expense._id}
              className=" mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
            >
              <h2>
                {" "}
                <b>Expense Name :</b> {expense.expenseName}
              </h2>

              <p>
                {" "}
                <b>Description :</b> {expense.description}
              </p>

              <p>
                <b> Amount :</b> ₹ {expense.amount}
              </p>

              <p>
                <b>Paid By :</b> {expense.addedBy}
              </p>

              <p>
                <b>Split Between : </b> {expense.splitBetween.join(" , ")}
              </p>
            </div>
          ))}
        </div>
         </div> */}
      {/* </div> */}
    </>
  );
}
