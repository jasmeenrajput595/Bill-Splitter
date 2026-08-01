import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");

   const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);

  // const userList = [
  //   { value: "Jasmeen", label: "jasmeen@test.com" },
  //   { value: "Kanan", label: "kanan@test.com" },
  //   { value: "Bruce", label: "bruce@test.com" },
  //   { value: "Peter", label: "peter@test.com" },
  // ];
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
  fetchUsers();
}, []);

async function fetchUsers() {
  try {
    const response = await axios.get("http://localhost:3000/billSplitter/users");

    const users = response.data.users.filter((item) => item._id !== user._id) .map((item) => ({
    value: item._id,
    label: item.name,
  }));

setUserList(users);

  } catch (error) {
    console.log(error);
  }
}

  function handleChange(users) {
    setSelectedUser(users || []);
    console.log(users);
    // console.log(selectedUser)
  }

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/billSplitter/createGroup",
        {
          groupName,
         userIds: [ user._id,...selectedUser.map((item) => item.value),
],
        },
        
      );
        // localStorage.setItem("login", "true");

      alert("Group Created successfully")
      console.log(JSON.stringify(response));
      navigate("/createExpense")
    } catch (error) {
      console.log("something went wrong", error)
    }

  };

  return (
    <>
      <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-30">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
              <h1 className="text-3xl font-bold text-slate-900">Welcome {user.name}</h1>
          <h1 className="text-3xl font-bold text-slate-900">
            Create Group :
          </h1>

          <label className="text-sm font-medium text-slate-700">
            Group Name :
          </label>

          <input
            value={groupName}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
            placeholder="Enter Group Name"
            onChange={(e) => setGroupName(e.target.value)}
          />

          <label className="text-sm font-medium text-slate-700 mt-2">
            Select User :
          </label>

          <Select
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            options={userList}
            isMulti
            value={selectedUser}
            placeholder="Add Member"
            onChange={handleChange}
          />

          <div className="mt-4">
            <h4 className="font-medium">Currently Selected Users:</h4>

            <ul className="list-disc ml-5 mt-2">
              {selectedUser.map((item) => (
                <li key={item.value}>
                  {item.label} ({item.value})
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleClick}
            className="mt-2 m-2 rounded-2xl py-3 text-violet-700 font-medium hover:bg-violet-50 transition"
          >
            +Create Group
          </button>
        </div>
      </div>
    </>
  );
}

