import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";
import { registerSchema } from "../validation/authValidation";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setErrors({});

      await registerSchema.validate(
        {
          name,
          email,
          password,
        },
        {
          abortEarly: false,
        }
      );

      setLoading(true);

      const { data } = await api.post("/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      if (error.inner) {
        const validationErrors = {};

        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });

        setErrors(validationErrors);
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-30">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-900">
              Register
            </h1>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-indigo-700 hover:text-indigo-900"
            >
              Sign In
            </button>
          </div>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          <label className="block mt-4">Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          <label className="block mt-4">Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 text-white rounded-xl py-3 hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </form>
  );
}






// import { useState , useEffect} from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const[name , setName]=useState("")
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

  
//    const handleRegister= async (e)=>{
//     e.preventDefault()
//     try {
//       const response = await axios.post("http://localhost:3000/billSplitter/register", {
//         name,
//         email,
//         password,
//       });
//       // localStorage.setItem("login", "true");
//        alert(response.data.message);
//        navigate("/login");
//     } catch (error) {
//     alert(error.response.data.message);
//     }
//   }

  

//   return (
//     <form>
//       <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-30">
//         <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
//           <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold text-indigo-900">Register :</h1>
//            <button
//             className=" text-indigo-700 py-2 rounded-2xl font-medium hover:bg-indigo-50 transition"
//             onClick={() => navigate("/login")}
//           >
//             Sign In
//           </button>
//           </div>
//           <label className="text-sm font-medium text-slate-700">Name :</label>

//           <input
//             type="text"
//             value={name}
//             className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
//             placeholder="Enter name"
//             onChange={(e) => setName(e.target.value)}
//           />
//           <label className="text-sm font-medium text-slate-700">Email :</label>

//           <input
//             type="text"
//             value={email}
//             className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
//             placeholder="Enter email"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label className="text-sm font-medium text-slate-700">
//             Password :
//           </label>

//           <input
//             type="password"
//             value={password}
//             className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             onClick={handleRegister}
//             className="mt-2 m-2 rounded-2xl py-3 text-violet-700 font-medium hover:bg-violet-50 transition"
//           >
//             Register →
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }
