import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import Navbar from "./Navbar";


import api from "../api/api";
import { groupSchema } from "../validation/groupValidation";
import { getToken, getUser } from "../utils/auth";

export default function CreateGroup() {
  const navigate = useNavigate();

  const user = getUser();
  const token = getToken();

  const [groupName, setGroupName] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const users = data.users
        .filter((item) => item._id !== user._id)
        .map((item) => ({
          value: item._id,
          label: item.name,
        }));

      setUserList(users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
      setErrors({});

      await groupSchema.validate(
        { groupName },
        { abortEarly: false }
      );

      if (selectedUsers.length === 0) {
        return toast.error("Please select at least one member");
      }

      setLoading(true);

      const members = [
        user._id,
        ...selectedUsers.map((item) => item.value),
      ];

      const { data } = await api.post(
        "/groups",
        {
          groupName,
          members,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      navigate("/createExpense");
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
    <Navbar/>
    <form onSubmit={handleCreateGroup}>
      <div className="min-h-164 bg-slate-100 flex flex-col items-center pt-10">

        <h1 className="text-3xl font-bold text-indigo-800 mb-6">
          Welcome, {user.name}
        </h1>

        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Group
          </h2>

          <label>Group Name</label>

          <input
            type="text"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3"
          />

          {errors.groupName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.groupName}
            </p>
          )}

          <label className="block mt-5">
            Select Members
          </label>

          <Select
            isMulti
            options={userList}
            closeMenuOnSelect={false}
            value={selectedUsers}
            onChange={setSelectedUsers}
            placeholder="Select Members"
            className="mt-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 text-white rounded-xl py-3 hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Group"}
          </button>

        </div>
      </div>
    </form>
    </>
  );
}













// import { useState , useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Select from "react-select";

// export default function CreateGroup() {
//   const navigate = useNavigate();
//   const [groupName, setGroupName] = useState("");

//    const user = JSON.parse(localStorage.getItem("user"));

//   console.log(user);

//   // const userList = [
//   //   { value: "Jasmeen", label: "jasmeen@test.com" },
//   //   { value: "Kanan", label: "kanan@test.com" },
//   //   { value: "Bruce", label: "bruce@test.com" },
//   //   { value: "Peter", label: "peter@test.com" },
//   // ];
//   const [userList, setUserList] = useState([]);
//   const [selectedUser, setSelectedUser] = useState([]);

//   useEffect(() => {
//   // eslint-disable-next-line react-hooks/immutability
//   fetchUsers();
// }, []);

// async function fetchUsers() {
//   try {
//     const response = await axios.get("http://localhost:3000/billSplitter/users");

//     const users = response.data.users.filter((item) => item._id !== user._id) .map((item) => ({
//     value: item._id,
//     label: item.name,
//   }));

// setUserList(users);

//   } catch (error) {
//     console.log(error);
//   }
// }

//   function handleChange(users) {
//     setSelectedUser(users || []);
//     console.log(users);
//     // console.log(selectedUser)
//   }

//   const handleClick = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/billSplitter/createGroup",
//         {
//           groupName,
//          userIds: [ user._id,...selectedUser.map((item) => item.value),
// ],
//         },
        
//       );
//         // localStorage.setItem("login", "true");

//       alert("Group Created successfully")
//       console.log(JSON.stringify(response));
//       navigate("/createExpense")
//     } catch (error) {
//       console.log("something went wrong", error)
//     }

//   };

//   return (
//     <>
//       <div className="min-h-screen bg-slate-100 flex flex-col items-center pt-8">
//               <h1  className="text-3xl font-bold text-blue-800 mb-5">Welcome {user.name}!</h1>

//         <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
//           <h1 className="text-xl flex justify-center font-bold    text-slate-900 mb-6">
//             Create Group :
//           </h1>
           
//            <div className="mb-4">

//           <label className="text-sm font-medium text-slate-700">
//             Group Name :
//           </label>

//           <input
//             value={groupName}
//             className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-500"
//             placeholder="Enter Group Name"
//             onChange={(e) => setGroupName(e.target.value)}
//             />
//             </div>
//             <div>

//           <label className="text-sm font-medium text-slate-700 mt-2">
//             Select User :
//           </label>

//           <Select
//             className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3  focus:border-violet-500"
//             options={userList}
//             isMulti
//             value={selectedUser}
//             placeholder="Add Member"
//             onChange={handleChange}
//             />
//             </div>

//           {/* <div className="mt-6">
//             <h4 className="font-medium">Currently Selected Users:</h4>

//             <ul className="list-disc ml-5 mt-2">
//               {selectedUser.map((item) => (
//                 <li key={item.value}>
//                   {item.label} ({item.value})
//                 </li>
//               ))}
//             </ul>
//           </div> */}

//           <button
//             onClick={handleClick}
//             className="mt-2 m-2 rounded-2xl py-3  text-indigo-600 font-medium hover:bg-violet-50 transition"
//           >
//             +Create Group
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

