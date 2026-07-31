import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ExpenseList() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  async function getGroups() {
    try {
      const response = await axios.get("http://localhost:3000/group/groups");
      setGroups(response.data.groups);
    } catch (error) {
      console.log(error);
    }
  }

  async function getExpenses() {
    if (!selectedGroup) {
      alert("Please Select Group");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/group/expenses/${selectedGroup}`,
      );

      setExpenses(response.data.expenses);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    localStorage.removeItem("login");
    navigate("/");
  }
  return (
    <>
      <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-10 ">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <div className="flex justify-between items-center ">
            <h1 className="text-3xl font-bold text-slate-900">ExpenseList :</h1>

            <button
              onClick={handleLogout}
              className="rounded-2xl py-3 text-red-500 font-medium hover:bg-red-50 transition translate-x-15"
            >
              Log Out 
            </button>
            <button
            className=" rounded-2xl py-3 text-yellow-600 font-medium hover:bg-yellow-50 transition"
            onClick={() => navigate("/createExpense")}
          >
            Create Expense💵
          </button>
          </div>
          {/* <h1 className="text-3xl font-bold text-slate-900"> ExpenseList :</h1>
          <button className=" rounded-2xl text-blue-700 font-medium hover:bg-blue-50 transition translate-x-96" onClick={handleLogout}>
  Log Out
</button> */}
          <select
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
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
          <button
            className="mt-2 m-2 rounded-2xl py-3 text-green-700 font-medium hover:bg-green-50 transition"
            onClick={() => navigate("/balance")}
          >
            View Balance💳
          </button>

          <button
            className="mt-2 m-2 rounded-2xl py-3 text-indigo-700 font-medium hover:bg-violet-50 transition"
            onClick={() => navigate("/settleUp")}
          >
            Settle Up💰
          </button>


          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
            >
              <h2> <b>Expense Name :</b> {expense.expenseName}</h2>

              <p> <b>Description :</b> {expense.description}</p>

              <p><b> Amount :</b> ₹ {expense.amount}</p>

              <p><b>Paid By :</b> {expense.addedBy}</p>

              <p><b>Split Between : </b> {expense.splitBetween.join(" , ")}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
