import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setusertranaction, clearusertraction } from "../Slices/postdataslice";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { GlobalUrl } from "../../GlobalUrl";
import { createtransaction } from "../Slices/postdataslice";
import { setgetdata } from "../Slices/getdata";

export default function Transaction() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.UserTransaction || {});
  const error = useSelector((state) => state.user.error);

  const [Addtranaction, setAddTrasaction] = useState(false);
  const [transactions, setLocalTransactions] = useState([]);
  const [formData, setFormData] = useState(userData);
  const [loading, setLoading] = useState(false);

  const Id = sessionStorage.getItem("Id");

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Groceries",
    "Housing",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    dispatch(setusertranaction({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${GlobalUrl}/createtranaction`,
        formData
      );
      console.log(response);
      if (response.data.status === 201 || response.data.status === true) {
        setLocalTransactions([...transactions, response.data.transaction]);
        dispatch(createtransaction(formData));
        setFormData(userData);
        dispatch(clearusertraction());
        toast.success(response.data.msg);
        sessionStorage.setItem("Id", response.data.transaction._id);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(`${GlobalUrl}/alltranasaction`);
        console.log(response);
        if (response.data.status === true || response.data.status === 200) {
          dispatch(setgetdata(response.data.transactions));
          setLocalTransactions(response.data.transactions);
          toast.success(response.data.msg)
        }
      } catch (err) {
       if (err.response && err.response.data.message) {
        toast.error(err.response.data.message);
          console.log(err);
      }
    
      }
    };
    getTransactions();
  }, []);

  return (
    <div className="p-4">
      <div
        onClick={() => setAddTrasaction(true)}
        className="flex  bg-blue-500 w-fit p-2 rounded-2xl text-white  items-center text-lg font-bold "
      >
        <AiOutlinePlus className="h-6 w-6 mr-2 text-white-500" />
        Add Transaction
      </div>
      <h2 className="text-xl font-bold mb-4">Add Your Today Transaction</h2>
      <ToastContainer />
      {error && <p className="text-red-500">{error}</p>}
      {Addtranaction && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:grid md:grid-cols-2 md:gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount || ""}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-start md:col-span-2 space-x-4">
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={() => setAddTrasaction(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <h2 className="text-xl font-bold mt-4 mb-4">Transaction History</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="border px-4 py-2">{transaction.amount}</td>
              <td className="border px-4 py-2">{transaction.date}</td>
              <td className="border px-4 py-2">{transaction.description}</td>
              <td className="border px-4 py-2">{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
