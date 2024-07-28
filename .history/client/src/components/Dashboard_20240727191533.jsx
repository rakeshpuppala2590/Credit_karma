import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

const Dashboard = ({ transactions }) => {
  // Helper functions to process data
  const getTotalBudget = () => 3490; // Replace with actual logic
  const getAmountLeft = () => 485; // Replace with actual logic
  const getSpendingTrend = () => {
    // Process transactions to get spending trend data
    // Return an array of objects with date and amount
  };
  const getCategoryBreakdown = () => {
    // Process transactions to get category breakdown
    // Return an array of objects with category and amount
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
              <Bar dataKey="budget" fill="#8884d8" />
              <Bar dataKey="spent" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;