import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

export default function CreateExpense() {
  const navigate = useNavigate();
  const [expenseName, setExpenseName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      const response = await axios.get("http://localhost:3000/group/groups");
      console.log(response.data);

      // setGroups(response.data);
      setGroups(response.data.groups);
      console.log(Array.isArray(response.data.groups));
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = async () => {
    console.log(" errrorrrrr");
    if (!selectedGroup) {
      alert("Please Select a group");
     return;
}

if (!addedBy) {
  alert("Please select who paid the expense");
  return;
}

if (selectedUser.length === 0) {
alert("Please select members");
return;
}
    try {

      const response = await axios.post("http://localhost:3000/group/createExpense", {
        expenseName,
        description,
        groupId: selectedGroup._id,
        amount,
        addedBy,
        splitBetween: selectedUser.map((user) => user.value),
      });
      // alert(JSON.stringify(expenseName, description, groupId, addedBy));
      console.log(response.data);
      alert("Expense Created Successfully");
      navigate("/expenseList");
    } catch (error) {
      console.log("something went wrong", error);
    }

    //   if(description !== "" && amount !==""){
    //       navigate("/expenseList")
    //       return;
    // }else{
    // alert("Create Expense First")

    // }
  };

  function handleChange(users) {
    setSelectedUser(users || []);
    console.log(users);
    // console.log(selectedUser)
  }

  return (
    <>
      <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-10 ">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-blue-900">Create Expense :</h1>

          <select
           className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            value={selectedGroup?._id || ""}
            onChange={(e) => {
              const group = groups.find((group) => group._id === e.target.value);

              setSelectedGroup(group);
            }}
          >
            <option >Select Group</option>

            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.groupName}
              </option>
            ))}
          </select>
          <label className="text-sm font-medium text-slate-700">
            Expense Name :
          </label>

          <input
            value={expenseName}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            placeholder="Enter Expense Name"
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />

          <label className="text-sm font-medium text-slate-700">
            Description :
          </label>
          <input
            value={description}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            placeholder="Ex :Pay For Lunch"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label className="text-sm font-medium text-slate-700 mt-2">
            Amount :
          </label>
          <input
            value={amount}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            placeholder="$30"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <label className="text-sm font-medium text-slate-700 mt-2">
            Paid By :
          </label>
          <select 
                      className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
value={addedBy} onChange={(e) => setAddedBy(e.target.value)}>
            <option>Select Payer</option>
            {
              selectedGroup?.userIds.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))
            }
          </select>
          <label className="text-sm font-medium text-slate-700 mt-2">
            Split Between :
          </label>

          <Select
                      className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"

            options=
            {
              selectedGroup? selectedGroup.userIds.map((user) => ({
                  value: user, label: user
                })) : []
            }
            isMulti
            value={selectedUser}
            onChange={handleChange}/>

          <button
            onClick={handleClick}
            className="mt-2 rounded-2xl py-3 text-blue-700 font-medium hover:bg-violet-50 transition"
          >
            + Create Expense
          </button>
        </div>
      </div>
    </>
  );
}
