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
    <div>
      <h2>Transactions</h2>
      {Object.keys(categorizedTransactions).map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {categorizedTransactions[category].map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.name}</td>
                  <td>{transaction.amount}</td>
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
