import { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const[name , setName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
   const handleRegister= async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/billSplitter/register", {
        name,
        email,
        password,
      });
      // localStorage.setItem("login", "true");
       alert(response.data.message);
       navigate("/login");
    } catch (error) {
    alert(error.response.data.message);
    }
  }

  

  return (
    <form>
      <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-30">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-indigo-900">Register :</h1>
           <button
            className=" text-indigo-700 py-2 rounded-2xl font-medium hover:bg-indigo-50 transition"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          </div>
          <label className="text-sm font-medium text-slate-700">Name :</label>

          <input
            type="text"
            value={name}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-sm font-medium text-slate-700">Email :</label>

          <input
            type="text"
            value={email}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm font-medium text-slate-700">
            Password :
          </label>

          <input
            type="password"
            value={password}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="mt-2 m-2 rounded-2xl py-3 text-violet-700 font-medium hover:bg-violet-50 transition"
          >
            Register →
          </button>
        </div>
      </div>
    </form>
  );
}
