import { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const[name , setName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchUserDetails();
  }, []);

  async function fetchUserDetails() {
    try {
      const response = await axios.get("http://localhost:3000/group/loginDetails");
       console.log(response.data)
      setEmail(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        name,
        email,
        password,
      });
       console.log(response.data);
      // console.log(JSON.stringify(response));
      localStorage.setItem("login", "true");
      navigate("/createGroup");
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return (
    <form>
      <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-30">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-900">Login :</h1>
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
            onClick={handleClick}
            className="mt-2 m-2 rounded-2xl py-3 text-violet-700 font-medium hover:bg-violet-50 transition"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
