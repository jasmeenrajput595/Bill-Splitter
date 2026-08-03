import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import api from "../api/api";
import { getToken, getUser } from "../utils/auth";

export default function SettleUp() {
  const token = getToken();
const user = JSON.parse(localStorage.getItem("user"));
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [settlements, setSettlements] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchGroups();
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
      toast.error(error.response?.data?.message);
    }
  };

 const fetchSettlements = async () => {
  if (!selectedGroup) {
    return toast.error("Please select group");
  }

  try {
    const { data } = await api.get(`/settle-up/${selectedGroup}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

    setSettlements(data.settlements);

  } catch (error) {
    console.log(error);
    console.log(error.response);
    toast.error(error.response?.data?.message || "Error");
  }
};
  const openModal = (item) => {
    setSelectedSettlement(item);
    setAmount(item.amount);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSettlement(null);
    setAmount("");
  };

  const handlePayment = async () => {
    try {
      const { data } = await api.post(
        "/payment",
        {
          group: selectedGroup,
          toUser: selectedSettlement.to._id,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      closeModal();

      fetchSettlements();

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
  console.log("Logged User:", user);
console.log("Settlements:", settlements);

    return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 flex justify-center pt-10">

        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-yellow-600 mb-6">
            Settle Up
          </h1>

          <div className="flex gap-3">

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-3"
            >
              <option value="">Select Group</option>

              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.groupName}
                </option>
              ))}

            </select>

            <button
              onClick={fetchSettlements}
              disabled={loading}
              className="bg-yellow-500 text-white px-6 rounded-xl"
            >
              {loading ? "Loading..." : "Show"}
            </button>

          </div>

          {settlements.length === 0 ? (

            <p className="text-center text-gray-500 mt-10">
              No Settlements
            </p>

          ) : (

            <div className="space-y-4 mt-8">

              {settlements.map((item, index) => (

                <div
                  key={index}
                  className="border rounded-2xl p-5"
                >

                  <p className="text-lg">

                    <span className="font-semibold text-red-600">
                      {item.from.name}
                    </span>

                    {" "}pays{" "}

                    <span className="font-semibold text-green-600">
                      {item.to.name}
                    </span>

                  </p>

                  <p className="mt-2 font-bold">
                    ₹ {item.amount}
                  </p>

                {String(item.from._id) === String(user?._id) && (
  <button
    onClick={() => openModal(item)}
    className="mt-4 bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
  >
    Pay Now
  </button>
)}

{String(item.to._id) === String(user?._id) && (
  <span className="inline-block mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
    Settlement Pending
  </span>
)}
                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white rounded-2xl p-6 w-96">

            <h2 className="text-2xl font-bold mb-4">
              Pay Now
            </h2>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-xl bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handlePayment}
                className="px-5 py-2 rounded-xl bg-green-600 text-white"
              >
                Pay
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}