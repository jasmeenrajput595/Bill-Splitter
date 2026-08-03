import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import Navbar from "./Navbar";

import api from "../api/api";
import { getUser, getToken } from "../utils/auth";
import { expenseSchema } from "../validation/expenseValidation";

export default function CreateExpense() {
  const navigate = useNavigate();

  const user = getUser();
  const token = getToken();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data } = await api.get("/groups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGroups(data.groups);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch groups");
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data.users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  const handleCreateExpense = async (e) => {
    e.preventDefault();

    try {
      setErrors({});

      await expenseSchema.validate(
        {
          title,
          description,
          amount,
        },
        {
          abortEarly: false,
        }
      );

      if (!selectedGroup) {
        return toast.error("Please select a group");
      }

      if (selectedUsers.length === 0) {
        return toast.error("Please select members");
      }

      setLoading(true);

      const { data } = await api.post(
        "/expenses",
        {
          title,
          description,
          amount: Number(amount),
          group: selectedGroup._id,
          splitBetween: selectedUsers.map((item) => item.value),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
     <Navbar />
    <form onSubmit={handleCreateExpense}>
      <div className="min-h-98 bg-slate-100 flex justify-center items-start pt-5">

        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-4">

          <h1 className="text-3xl font-bold text-indigo-900 mb-6">
            Create Expense
          </h1>

          <label>Select Group</label>

          <select
            className="w-full mt-2 border rounded-xl px-4 py-3"
            value={selectedGroup?._id || ""}
            onChange={(e) => {
              const group = groups.find(
                (item) => item._id === e.target.value
              );

              setSelectedGroup(group);
              setSelectedUsers([]);
            }}
          >
            <option value="">Select Group</option>

            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.groupName}
              </option>
            ))}
          </select>

          <label className="block mt-4">Expense Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Dinner"
            className="w-full mt-2 border rounded-xl px-4 py-3"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title}
            </p>
          )}

          <label className="block mt-4">Description</label>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Dinner at restaurant"
            className="w-full mt-2 border rounded-xl px-4 py-3"
          />

          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description}
            </p>
          )}

          <label className="block mt-4">Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
            className="w-full mt-2 border rounded-xl px-4 py-3"
          />

          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.amount}
            </p>
          )}

          {/* <label className="block mt-4">Paid By</label>

          <div className="w-full mt-2 border rounded-xl px-4 py-3 bg-gray-100">
            {user.name}
          </div> */}

          <label className="block mt-4">
            Split Between
          </label>

          <Select
            isMulti
            value={selectedUsers}
            onChange={setSelectedUsers}
          options={
  selectedGroup
    ? selectedGroup.members.map((member) => ({
        value: member._id,
        label: member.name,
      }))
    : []
}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 text-white rounded-xl py-3 hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Expense"}
          </button>

        </div>
      </div>
    </form>
    </>
  );
}