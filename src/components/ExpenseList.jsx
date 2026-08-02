import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "./Navbar";
import api from "../api/api";
import { getToken } from "../utils/auth";

export default function ExpenseList() {
  const token = getToken();

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data } = await api.get("/groups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGroups(data.groups);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch groups");
    }
  };

  const fetchExpenses = async () => {
    if (!selectedGroup) {
      return toast.error("Please select a group");
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/expenses/${selectedGroup}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(data.expenses);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 flex justify-center pt-10">

        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-indigo-900 mb-6">
            Expenses
          </h1>

          <div className="flex gap-3">

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-3"
            >
              <option value="">Select Group</option>

              {groups.map((group) => (
                <option
                  key={group._id}
                  value={group._id}
                >
                  {group.groupName}
                </option>
              ))}

            </select>

            <button
              onClick={fetchExpenses}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 rounded-xl hover:bg-indigo-700"
            >
              {loading ? "Loading..." : "Show"}
            </button>

          </div>

          {expenses.length === 0 ? (

            <p className="text-center text-gray-500 mt-10">
              No Expenses Found
            </p>

          ) : (

            <div className="mt-8 space-y-5">

              {expenses.map((expense) => (

                <div
                  key={expense._id}
                  className="border rounded-2xl p-5 shadow-sm"
                >

                  <h2 className="text-xl font-semibold">
                    {expense.title}
                  </h2>

                  <p className="mt-2">
                    <b>Description :</b> {expense.description}
                  </p>

                  <p className="mt-2">
                    <b>Amount :</b> ₹{expense.amount}
                  </p>

                  <p className="mt-2">
                    <b>Paid By :</b> {expense.paidBy.name}
                  </p>

                  <p className="mt-2">
                    <b>Split Between :</b>{" "}
                    {expense.splitBetween
                      .map((member) => member.name)
                      .join(", ")}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </>
  );
}