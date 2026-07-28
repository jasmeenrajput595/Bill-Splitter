import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function CreateExpense(){
    const navigate = useNavigate()
    const [ description , setDescription]= useState("")
    const [ amount , setAmount]= useState("")
    const [paidBy , setPaidBy]= useState("")
    const [splitBetween , setSplitBetween]= useState("")
    const[options , setOptions]= useState([])
   
    function handleExpense(){
          if(description !== "" && amount !==""){
              navigate("/expenseList")
              return;
        }else{
        alert("Create Expense First")

        }
    }

    return(
        <>
        <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-10 ">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-900">Create Expense</h1>
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
          <input
            value={paidBy}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            placeholder="Who paid expense"
            onChange={(e) => setPaidBy(e.target.value)}
            required
          />
          <label className="text-sm font-medium text-slate-700 mt-2">
            Split Between :
          </label>
            
           <select value={splitBetween} className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500" onChange={(e)=>setSplitBetween(e.target.value)}>
            {options.map((item , index)=>(
            <option key={index}>{item}</option>
           ))}
           </select>
        
          <button
            onClick={handleExpense}
            className="mt-2 rounded-2xl py-3 text-violet-700 font-medium hover:bg-violet-50 transition"
          >
            + Create Expense
          </button>
        
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