import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Select from "react-select";
import axios from 'axios'


export default function CreateExpense(){
    const navigate = useNavigate()
    const [ expenseName , setExpenseName]= useState("")
    const [ description , setDescription]= useState("")
    const [ groupId , setGroupId]= useState("")
    const [ amount , setAmount]= useState("")
    const [addedBy , setAddedBy]= useState("")
    // const[members , setMemebrs]=useState("")
    const [selectedUser, setSelectedUser] = useState([]);


    const userList = [
    { value: "user1", label: "jasmeen@test.com" },
    { value: "user2", label: "kanan@test.com" },
    { value: "user3", label: "bruce@test.com" },
    { value: "user4", label: "peter@test.com" },
  ];
   
    const handleClick =async () => {
      console.log(" errrorrrrr")
 try {
      const response = axios.post(
        "http://localhost:3000/group/createExpense",
        {
          expenseName,
          description,
          groupId,
          amount,
          addedBy,
          members: selectedUser.map((user) => user.value),
        },
        
      );
      alert(JSON.stringify(expenseName,description,groupId,addedBy))
      console.log(JSON.stringify(response));
      navigate("/expenseList")
    } catch (error) {
      console.log("something went wrong", error);
    }


        //   if(description !== "" && amount !==""){
        //       navigate("/expenseList")
        //       return;
        // }else{
        // alert("Create Expense First")

        // }
    }

    function handleChange(users) {
    setSelectedUser(users || []);
    console.log(users);
    // console.log(selectedUser)
  }

    return(
        <>
        <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-10 ">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-900">Create Expense</h1>
          <label className="text-sm font-medium text-slate-700">
            GroupID :
          </label>
          <input
            value={groupId}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            placeholder="GroupId"
            onChange={(e) => setGroupId(e.target.value)}
            required
          />
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
            Added By :
          </label>
          <input
            value={addedBy}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            placeholder="Who paid expense"
            onChange={(e) => setAddedBy(e.target.value)}
            required
          />
          <label className="text-sm font-medium text-slate-700 mt-2">
            Split Between :
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
           {/* <select value={splitBetween} className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500" onChange={(e)=>setSplitBetween(e.target.value)}>
        
           
           </select> */}
        
          <button
            onClick={handleClick}
            className="mt-2 rounded-2xl py-3 text-violet-700 font-medium hover:bg-violet-50 transition"
          >
            + Create Expense
          </button>
        
        </div>
      </div>
      </div>
        </>
    )
    }
        // <div className="flex justify-center p-20 bg-gray-100 h-screen">
        //     <div  className=" bg-white w-80 h-80 rounded-2xl p-5">
        // <label className="m-2 "> Event Name :</label>
        // <input onChange={(e)=>setEventName(e.target.value)} className="border border-gray-300 m-2 w-full" value={eventName} placeholder="Ex : Pay for Lunch.." />
        //     <div className="w-full">
        //   <label className="m-2"> Select Currrency :
        //     <select className="border border-gray-300 m-2" value={currency} onChange={handleCurrencyChange}>
        //         <option> € Euro</option>
        //         <option> ₤ Pound</option>
        //         <option> $ Dollar</option>
        //         <option> ₹ Rupee</option>
        //     </select>
        //     </label>
        //     </div>
          
        // <label className="m-2">How much paid :</label>
        // <input className="border border-gray-300 m-2 w-full" value={paid} placeholder="Ex :$20" onChange={(e)=>setPaid(e.target.value)}/>
        //   <button onClick={handleClick} className="bg-green-200">Add Expense</button>
      
        // </div>
        //     </div>