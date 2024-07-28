import React from 'react';

const Transactions = ({ transactions }) => {
  // Helper function to categorize transactions
  const categorizeTransactions = (transactions) => {
    const categories = {};
    transactions.forEach((transaction) => {
      const category = transaction.category ? transaction.category[0] : "Uncategorized";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(transaction);
    });
    return categories;
  };

  const categorizedTransactions = categorizeTransactions(transactions);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      {Object.keys(categorizedTransactions).map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{category}</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {categorizedTransactions[category].map((transaction) => (
                <tr key={transaction.transaction_id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{transaction.date}</td>
                  <td className="py-2 px-4 border-b">{transaction.name}</td>
                  <td className="py-2 px-4 border-b">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
