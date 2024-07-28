import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Transactions = ({ transactions }) => {
  // Prepare data for the bar chart
  const barData = transactions.map((transaction) => ({
    date: transaction.date,
    name: transaction.name,
    amount: transaction.amount,
  }));

  // Prepare data for the pie chart
  const pieData = transactions.reduce((acc, transaction) => {
    const existingCategory = acc.find(item => item.name === transaction.name);
    if (existingCategory) {
      existingCategory.value += Math.abs(transaction.amount);
    } else {
      acc.push({ name: transaction.name, value: Math.abs(transaction.amount) });
    }
    return acc;
  }, []);

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Summary data
  const totalSpent = transactions.reduce((sum, transaction) => sum + (transaction.amount < 0 ? transaction.amount : 0), 0);
  const totalReceived = transactions.reduce((sum, transaction) => sum + (transaction.amount > 0 ? transaction.amount : 0), 0);
  const totalTransactions = transactions.length;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {/* Bar Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Spending Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Total Transactions</th>
              <th className="py-2 px-4 border-b">Total Spent</th>
              <th className="py-2 px-4 border-b">Total Received</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b text-center">{totalTransactions}</td>
              <td className="py-2 px-4 border-b text-center">{`$${totalSpent.toFixed(2)}`}</td>
              <td className="py-2 px-4 border-b text-center">{`$${totalReceived.toFixed(2)}`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Transactions Table */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Transaction Details</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{transaction.date}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.name}</td>
                <td className="py-2 px-4 border-b text-center">{transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `$${transaction.amount}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
