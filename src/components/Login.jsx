import {useState} from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/billSplitter/login",
        {
          email,
          password,
        },
      );
console.log(response);
console.log(response.data);

      localStorage.setItem("login", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/createGroup");
    } catch (error) {
        console.log(error.response);

  if (error.response) {
    alert(error.response.data.message);
  } else {
    alert("Backend not reachable");
  }
    }
  };
  return (
    <>
      <form>
        <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-30">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
            <h1 className="text-3xl font-bold text-slate-900">Login :</h1>

            <label className="text-sm font-medium text-slate-700">
              Email :
            </label>

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
              Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
