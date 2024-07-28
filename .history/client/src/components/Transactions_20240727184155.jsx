import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Transactions = ({ transactions }) => {
  // Prepare data for the chart
  const data = transactions.map((transaction) => ({
    date: transaction.date,
    name: transaction.name,
    amount: transaction.amount,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Transactions;
