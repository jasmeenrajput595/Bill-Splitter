import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "./Navbar";
import api from "../api/api";
import { getToken, getUser } from "../utils/auth";

export default function Balance() {
  const token = getToken();
  const user = getUser();

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [balance, setBalance] = useState(0);
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

  const fetchBalance = async () => {
    if (!selectedGroup) {
      return toast.error("Please select a group");
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/balance/${selectedGroup}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const myBalance = data.balance[user._id] || 0;

      setBalance(myBalance);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 flex justify-center pt-10">

        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-green-700 mb-6">
            My Balance
          </h1>

          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
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
            onClick={fetchBalance}
            disabled={loading}
            className="w-full mt-5 bg-green-600 text-white rounded-xl py-3"
          >
            {loading ? "Loading..." : "Show Balance"}
          </button>

          <div
            className={`mt-8 rounded-2xl p-6 text-center ${
              balance > 0
                ? "bg-green-100"
                : balance < 0
                ? "bg-red-100"
                : "bg-gray-100"
            }`}
          >
            <h2 className="text-4xl font-bold">
              ₹ {Math.abs(balance)}
            </h2>

            <p className="mt-3 text-lg font-semibold">

             {balance > 0 && (
  <>
    <p className="text-green-700 text-lg font-semibold">
      Settlement Pending
    </p>
  </>
)}

{balance < 0 && (
  <>
    <p className="text-red-700 text-lg font-semibold">
      You Need To Pay
    </p>

    <button
      className="mt-5 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700"
    >
      Pay Now
    </button>
  </>
)}

{balance === 0 && (
  <p className="text-green-700 text-lg font-semibold">
    ✅ Settled
  </p>
)}

            </p>

          </div>

        </div>

      </div>
    </>
  );
}