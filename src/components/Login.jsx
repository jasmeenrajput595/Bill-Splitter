import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";
import { loginSchema } from "../validation/authValidation";
// import Navbar from "./Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setErrors({});

      await loginSchema.validate(
        {
          email,
          password,
        },
        {
          abortEarly: false,
        },
      );

      setLoading(true);

      const { data } = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message);

      navigate("/expenseList");
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
    <>
      {/* <Navbar /> */}

      <form onSubmit={handleLogin}>
        <div className="min-h-screen bg-slate-100 flex justify-center items-start pt-30">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-indigo-900">Login</h1>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-indigo-700 hover:text-indigo-900"
              >
                ← Register
              </button>
            </div>

            <label>Email</label>

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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 pr-16"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-sm text-indigo-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-indigo-600 text-white rounded-xl py-3 hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
