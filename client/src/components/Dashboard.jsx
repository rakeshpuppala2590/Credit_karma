import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie,
  BarChart, Bar
} from 'recharts';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Dashboard = ({ transactions }) => {
  // Helper functions to process data
  const getTotalBudget = () => 3490; // Replace with actual logic
  const getAmountLeft = () => 485; // Replace with actual logic
  const getSpendingTrend = () => {
    // Process transactions to get spending trend data
    // Return an array of objects with date and amount
    return transactions.map(t => ({
      date: t.date,
      amount: t.amount
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  const getCategoryBreakdown = () => {
    // Process transactions to get category breakdown
    // Return an array of objects with category and amount
    const categories = {};
    transactions.forEach(t => {
      const category = t.category ? t.category[0] : 'Uncategorized';
      categories[category] = (categories[category] || 0) + t.amount;
    });
    return Object.entries(categories).map(([category, amount]) => ({ category, amount }));
  };

  const spendingTrendData = getSpendingTrend();
  const categoryData = getCategoryBreakdown();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">Dashboard</Typography>
            <Typography variant="h6">${getAmountLeft()} left</Typography>
            <Typography variant="subtitle1">out of ${getTotalBudget()} budgeted</Typography>
            <LineChart width={600} height={300} data={spendingTrendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Category Breakdown</Typography>
            <PieChart width={400} height={400}>
              <Pie data={categoryData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
            </PieChart>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Budget vs Spent</Typography>
            <BarChart width={400} height={300} data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;