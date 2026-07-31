import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'


export default function SettleUp() {
  // const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      const response = await axios.get("http://localhost:3000/group/groups");
      // console.log(response.data);
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
        `http://localhost:3000/group/settleup/${selectedGroup}`,
      );

      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
     <Navbar/>
    <div className="h-143 bg-slate-100 flex justify-center pt-10">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow ">
        <div className="flex justify-between items-center ">
          <h1 className="text-3xl font-bold text-yellow-700">Settle Up :</h1>

          <button
            onClick={fetchSettleUp}
            className="mt-2 m-2 rounded-xl p-2 text-yellow-500 font-medium hover:bg-yellow-50 transition translate-x-25"
          >
            Show Result
          </button>

          {/* <button
            onClick={() => navigate("/expenseList")}
            className="rounded-2xl py-3 text-yellow-500 font-medium hover:bg-yellow-50 transition "
          >
            Back ←
          </button> */}
        </div>
      
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
        >
          <option value="">Select Group</option>

          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.groupName}
            </option>
          ))}
        </select>

        {transactions.map((item, index) => (
          <div
            key={index}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
          >
            <p>
              <strong>{item.from}</strong> pays to <strong>{item.to}</strong>
            </p>

            <p>Amount : ₹{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
