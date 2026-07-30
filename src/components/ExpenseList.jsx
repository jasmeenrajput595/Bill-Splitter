import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ExpenseList(){
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
const [selectedGroup, setSelectedGroup] = useState("");
const [expenses, setExpenses] = useState([]);

useEffect(() => {
  getGroups();
}, []);

async function getGroups() {
  try {
    const response = await axios.get("http://localhost:3000/group/groups");
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
      `http://localhost:3000/group/expenses/${selectedGroup}`
    );

setExpenses(response.data.expenses);
  } catch (error) {
    console.log(error);
  }
}
     return(
        <>
          <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-10 ">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-900"> ExpenseList :</h1>
         <select
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
<button onClick={getExpenses}>
  Show Expenses
</button>
<button onClick={() => navigate("/balance")}>
  View Balance
</button>

<button onClick={() => navigate("/settleUp")}>
  Settle Up
</button>
{expenses.map((expense) => (
  <div key={expense._id} className="border p-3 mt-3 rounded">
    <h2>{expense.expenseName}</h2>

    <p>{expense.description}</p>

    <p>₹ {expense.amount}</p>

    <p>Paid By : {expense.addedBy}</p>

    <p>
      Split Between :
      {expense.splitBetween.join(", ")}
    </p>
  </div>
))}
          </div>
          </div>
        </>
     )}
    //     <div className="grid grid-cols-2">
    //         <div  className=" bg-gray-100 m-5 h-60 w-80 ">
    //              <h1 className="font-bold flex justify-center m-2 p-4">OverView :</h1>
    //              <h1 className="font-bold m-4">Event cost to group : </h1>
    //              <h1 className="font-bold m-4">You Paid: </h1>
    //              <h1 className="font-bold m-4">You Owed : </h1>
    //         </div>
    //          <div  className=" bg-gray-100 m-5 h-60 w-80 ">
    //              <h1 className="font-bold flex justify-center m-2 ">All Debts :</h1>
    //              <h1 className="font-bold m-4">{}</h1>
                 
    //         </div>
    //          <div  className=" bg-gray-100 m-5 h-60 w-80 ">
    //              <h1 className="font-bold flex justify-center m-2 ">Expenses :</h1>
    //              <h1 className="font-bold m-4">{}</h1>
    //              <h1 className="font-bold m-4">People Involved : {}</h1>
    //              <h1 className="font-bold m-4">Your Share : {}</h1>
                 
    //         </div>
    //     </div>
     