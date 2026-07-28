import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function CreateGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [member, setMember] = useState("");
  const [displayName, setDisplayName] = useState([]);


  function handleClick(){
    // try{
    //    const response = await axios.post("http://localhost:5173", member)
    //     console.log(response)
    // }catch(error){
    //   console.log(error)
    // }
    if(member===""){
        alert("Add Members First")
      }else{
        setDisplayName([...displayName, member]);
        setMember("");
       
    }
  }
     const handleNavigate= async()=>{
      alert(" alerttttt")
       const response = await axios.post("http://localhost:3000/create", member)
        console.log(response)
        if( groupName !== "" && member !=="" ){
                navigate("/createExpense")
            }
       else{
            alert("Fill Details")
        }
     }
  return (
    <>
   
      <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-30 ">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-900">Create Group</h1>
          <label className="text-sm font-medium text-slate-700">
            Group Name :
          </label>
          <input
            value={groupName}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            placeholder="Enter Group  Name"
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
          <label className="text-sm font-medium text-slate-700 mt-2">
            Add Member :
          </label>
          <input
            value={member}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
            placeholder="Add Member"
            onChange={(e) => setMember(e.target.value)}
            required
          />
          <button
            onClick={handleClick}
            className="mt-2 rounded-2xl py-3 text-violet-700 font-medium hover:bg-violet-50 transition"
          >
            + Add
          </button>
          {displayName.map((item, index) => (
            <div key={index}>
              <h1>
                {" "}
                {index + 1}. {item}
              </h1>
            </div>
             ))
          }
          <button
            onClick={handleNavigate}
            className="mt-2 m-2 rounded-2xl py-3 text-violet-700 font-medium hover:bg-violet-50 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
// <div className="flex justify-center p-20 bg-gray-100 h-screen">
// <div className=" bg-white w-96 h-80 rounded-2xl p-5">

// /* <label className="m-2"> Add Person :</label>
// <input value={name} onChange={(e)=> setName(e.target.value)} placeholder="add name of person" className=" border border-gray-300"/>
// <button className="bg-blue-200 m-2 rounded-sm w-10" onClick={handleClick}> Add</button>

// {
//     displayName.map((item , index)=>(
//         <div key={index}>
//             <h1> {index +1}. {item}</h1>
//         </div>
//     ))
// }
// <div className="flex justify-end">
// <button className= "bg-blue-200 rounded-sm m-2 w-28" onClick={handleCreateGroup}> Create Group</button> */
// /* </div> */
// </div>

// </div>
// test