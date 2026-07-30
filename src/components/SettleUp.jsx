import { useEffect, useState } from "react";
import axios from "axios";

export default function SettleUp() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      const response = await axios.get("http://localhost:3000/group/groups");
      setGroups(response.data.groups);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSettleUp() {
    if (!selectedGroup) {
      alert("Please Select Group");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/group/settleup/${selectedGroup}`
      );

      setResult(response.data.result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center pt-10">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-5">
          Settle Up
        </h1>

        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Group</option>

          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.groupName}
            </option>
          ))}
        </select>

        <button
          onClick={fetchSettleUp}
          className="bg-violet-600 text-white px-4 py-2 rounded mt-4"
        >
          Show Result
        </button>

        {result.map((item, index) => (
          <div
            key={index}
            className="border rounded p-3 mt-4"
          >
            <h2 className="font-semibold">{item.user}</h2>

            <p>Status : {item.status}</p>

            <p>Amount : ${item.amount}</p>
          </div>
        ))}

      </div>
    </div>
  );
}