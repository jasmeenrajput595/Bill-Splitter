import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function ExpenseList() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [expenses, setExpenses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchUsers();
        // eslint-disable-next-line react-hooks/immutability
        getGroups();

  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get(
        "http://localhost:3000/billSplitter/users",
      );

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  async function getGroups() {
    try {
      const response = await axios.get(
        `http://localhost:3000/billSplitter/groups/${user._id}`,
      );
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
        `http://localhost:3000/billSplitter/expenses/${selectedGroup}`,
      );

      setExpenses(response.data.expenses);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center w-full pt-15">
        <div className=" bg-white rounded-3xl shadow-lg border border-slate-200 p-8 max-w-2xl ">
          <button
            className="mt-2 m-2 rounded-2xl py-3 text-red-700 font-medium hover:bg-red-50 transition"
            onClick={getExpenses}
          >
            Show Expenses💸
          </button>
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
                <b>Paid By :</b> {expense.addedBy.name}
              </p>

              <p>
                <b>Split Between :</b>{" "}
                {expense.splitBetween
                  .map((id) => {
                    const user = users.find(
                      (u) => String(u._id) === String(id),
                    );

                    return user ? user.name : id;
                  })
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
