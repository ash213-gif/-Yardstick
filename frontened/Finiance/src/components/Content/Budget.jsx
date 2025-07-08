// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setbudget, clearBudget, createBudget } from "../Slices/Postmonthly";
// import { AiOutlinePlus } from "react-icons/ai";
// import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";
// import { GlobalUrl } from "../../GlobalUrl";


import React from 'react'

export default function Budget() {
  return (
    <div>Budget</div>
  )
}


// export default function Budget() {
//   const dispatch = useDispatch();
//   const budgetData = useSelector((state) => state.monthly.budget || {});
//   const loading = useSelector((state) => state.monthly.loading);
//   const error = useSelector((state) => state.monthly.error);

//   const [showBudgetForm, setShowBudgetForm] = useState(false);
//   const [budgets, setBudgets] = useState([]);
//   const [formData, setFormData] = useState(budgetData);

//   const Id = sessionStorage.getItem("Id");

//   const categories = [
//     "Food & Dining",
//     "Transportation",
//     "Shopping",
//     "Entertainment",
//     "Bills & Utilities",
//     "Healthcare",
//     "Education",
//     "Travel",
//     "Groceries",
//     "Housing",
//     "Other",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     dispatch(setbudget({ [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${GlobalUrl}/CreateBudget`, {
//         ...formData,
//         userId: Id,
//       });
      
//       if (response.data.success || response.data.status === 201 || response.data.status === true) {
//         setBudgets([...budgets, response.data.data || response.data.budget]);
//         dispatch(clearBudget());
//         setFormData({ category: "", amount: "" });
//         toast.success(response.data.msg || "Budget set successfully!");
//         setShowBudgetForm(false);
//       }
//     } catch (err) {
//       if (err.response && err.response.data.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("Failed to set budget. Please try again.");
//       }
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const getBudgets = async () => {
//       try {
//         const response = await axios.get(`${GlobalUrl}/getbudget?userId=${Id}`);
//         if (response.data.success || response.data.status === true || response.data.status === 200) {
//           setBudgets(response.data.data || response.data.budgets || []);
//           if (response.data.msg) {
//             toast.success(response.data.msg);
//           }
//         }
//       } catch (err) {
//         if (err.response && err.response.data.message) {
//           toast.error(err.response.data.message);
//         }
//         console.log(err);
//       }
//     };
//     if (Id) {
//       getBudgets();
//     }
//   }, [Id]);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h3 className="text-center text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Set Your Monthly Budget</h3>
      
//       <div className="flex justify-between items-center mb-6">
//         <div
//           onClick={() => setShowBudgetForm(true)}
//           className="flex bg-blue-600 hover:bg-blue-700 transition-colors duration-300 w-fit p-3 rounded-full text-white items-center text-lg font-bold cursor-pointer shadow-md"
//         >
//           <AiOutlinePlus className="h-6 w-6 mr-2" />
//           Add Budget
//         </div>
        
//         <div className="text-gray-600 text-sm">
//           {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//         </div>
//       </div>
      
//       <ToastContainer position="top-right" autoClose={3000} />
      
//       {error && <p className="text-red-500 mb-4 p-3 bg-red-50 rounded-md">{error}</p>}
      
//       {showBudgetForm && (
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
//           <h4 className="text-xl font-semibold mb-4 text-gray-700">Create New Budget</h4>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label htmlFor="category" className="mb-2 font-medium text-gray-700">Category:</label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={formData.category || ""}
//                   onChange={handleChange}
//                   required
//                   className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="flex flex-col">
//                 <label htmlFor="amount" className="mb-2 font-medium text-gray-700">Amount:</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-3 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     id="amount"
//                     name="amount"
//                     value={formData.amount || ""}
//                     onChange={handleChange}
//                     required
//                     min="0.01"
//                     step="0.01"
//                     className="p-3 pl-8 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                     placeholder="Enter budget amount"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex justify-start space-x-4 mt-6">
//               <button
//                 disabled={loading}
//                 type="submit"
//                 className="bg-blue-600 text-white py-3 px-6 rounded-3xl hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
//               >
//                 {loading ? "Saving..." : "Save Budget"}
//               </button>
//               <button
//                 onClick={() => {
//                   setShowBudgetForm(false);
//                   dispatch(clearBudget());
//                   setFormData({ category: "", amount: "" });
//                 }}
//                 type="button"
//                 className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
      
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Your Monthly Budgets</h2>
//         {budgets.length > 0 ? (
//           <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Category</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Budget Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {budgets.map((budget, index) => (
//                   <tr key={budget._id || index} className="hover:bg-gray-50 transition-colors duration-150">
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                       <div className="flex items-center">
//                         <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
//                         {budget.category}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">${parseFloat(budget.amount).toFixed(2)}</td>
//                   </tr>
//                 ))}
//                 <tr className="bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-bold">Total</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-bold">
//                     ${budgets.reduce((total, budget) => total + parseFloat(budget.amount || 0), 0).toFixed(2)}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
//             <p className="text-gray-500 italic mb-4">No budgets set yet.</p>
//             <button 
//               onClick={() => setShowBudgetForm(true)}
//               className="bg-blue-600 text-white py-2 px-4 rounded-3xl hover:bg-blue-700 transition duration-300"
//             >
//               Add Your First Budget
//             </button>
//           </div>
//         )}
//       </div>
      
//       {budgets.length > 0 && (
//         <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Budget Tips</h3>
//           <ul className="list-disc pl-5 space-y-2 text-gray-600">
//             <li>Try to allocate at least 20% of your income to savings</li>
//             <li>Keep your housing costs under 30% of your monthly income</li>
//             <li>Review your budget regularly and adjust as needed</li>
//             <li>Consider using the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
