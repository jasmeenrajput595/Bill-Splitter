import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './Navbar'

export default function Balance() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [balance, setBalance] = useState({});
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

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

  function getUserName(id) {
  const foundUser = users.find(
    (u) => String(u._id) === String(id)
  );

  return foundUser ? foundUser.name : id;
}
 
 
  async function getGroups() {
    try {
      const response = await axios.get(
        `http://localhost:3000/billSplitter/groups/${user._id}`
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
        `http://localhost:3000/billSplitter/balance/${selectedGroup}`
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
      

     {Object.keys(balance).map((userId) => (
  <div
    key={userId}
    className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3"
  >
    <h3 className="font-bold">
      {getUserName(userId)} :
    </h3>

    <p
      className={
        balance[userId] > 0
          ? "text-green-600"
          : "text-red-600"
      }
    >
      ${balance[userId]}
    </p>
  </div>
))}
    </div>
      </div>
    </>
  );
}