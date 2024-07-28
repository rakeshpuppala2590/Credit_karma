import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = ({ transactions }) => {
  // Group transactions by category
  const categories = transactions.reduce((acc, transaction) => {
    const category = transaction.category ? transaction.category[0] : 'Uncategorized';
    if (!acc[category]) acc[category] = 0;
    acc[category] += transaction.amount;
    return acc;
  }, {});

  const categoryData = Object.keys(categories).map(key => ({
    name: key,
    value: categories[key],
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f'];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart */}
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
        
        {/* Pie Chart */}
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
      
      {/* Transactions Summary */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
        <h3 className="text-lg font-semibold mb-2 text-white">Transactions Summary</h3>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index} className="text-white">
              {transaction.date}: {transaction.name} - ${transaction.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
