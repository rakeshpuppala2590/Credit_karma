// src/components/Dashboard.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = ({ transactions }) => {
  // Aggregate categories and transaction amounts
  const categories = transactions.reduce((acc, transaction) => {
    const category = transaction.category ? transaction.category[0] : 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(transaction);
    return acc;
  }, {});

  // Prepare data for pie chart
  const categoryData = Object.keys(categories).map(key => ({
    name: key,
    value: categories[key].reduce((sum, transaction) => sum + transaction.amount, 0),
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f'];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-white">Spending Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactions}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-white">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {Object.keys(categories).map((category, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
          <h3 className="text-lg font-semibold mb-2 text-white">{category}</h3>
          <table className="w-full text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Date</th>
                <th className="py-2 px-4 border-b border-gray-700">Name</th>
                <th className="py-2 px-4 border-b border-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {categories[category].map((transaction, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-4 border-b border-gray-700">{transaction.date}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{transaction.name}</td>
                  <td className="py-2 px-4 border-b border-gray-700">${transaction.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
