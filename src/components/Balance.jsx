import { useState, useEffect } from "react";
import axios from "axios";
// import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar'

export default function Balance() {
  // const navigate = useNavigate()
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [balance, setBalance] = useState({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    getGroups();
  }, []);

  async function getGroups() {
    try {
      const response = await axios.get(
        "http://localhost:3000/group/groups"
      );

      setGroups(response.data.groups);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBalance() {
    if (!selectedGroup) {
      alert("Select Group");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/group/balance/${selectedGroup}`
      );
      console.log(response.data.balance);

      setBalance(response.data.balance);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Navbar/>
    <div className="h-143 pt-10 bg-slate-100 flex justify-center items-start">
      <div className=" max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
        <div className="flex justify-between items-center ">
            <h1 className="text-3xl font-bold text-green-700">Balance :</h1>

            {/* <button
              onClick={()=>navigate("/expenseList")}
              className="rounded-2xl py-3 text-blue-500 font-medium hover:bg-blue-50 transition "
            >
              Back ←
            </button> */}
           
          </div>
      <select
       className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"

        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
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

      <button className="mt-2 m-2 rounded-2xl py-3 text-green-700 font-medium hover:bg-green-50 transition"
onClick={getBalance}>
        Show Balance 💳
      </button>
      

      {Object.keys(balance).map((user) => (
        <div
          key={user}
          className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
        >
          <h3 className="font-bold">{user} :</h3>

          <p className={`${ balance[user] > 0 ? "text-green-600" : "text-red-600"}`}>${balance[user]}</p>
        </div>
      ))}
    </div>
      </div>
    </>
  );
}