import { useState, useEffect } from "react";
import axios from "axios";

export default function Balance() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [balance, setBalance] = useState({});

  useEffect(() => {
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

      setBalance(response.data.balance);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">
        Balance
      </h1>

      <select
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

      <button onClick={getBalance}>
        Show Balance
      </button>

      {Object.keys(balance).map((user) => (
        <div
          key={user}
          className="border rounded p-3 mt-3"
        >
          <h3>{user}</h3>

          <p>${balance[user]}</p>
        </div>
      ))}
    </div>
  );
}