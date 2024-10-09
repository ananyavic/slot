import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type BookingStats = {
  totalBookings: number;
  totalIncome: number;
};

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('weekly');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Fetch stats whenever time range or year is updated
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/stats?timeRange=${timeRange}&year=${year}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch booking statistics');
      }
    };

    fetchStats();
  }, [timeRange, year]);

  // Handle changes to time range (weekly/monthly)
  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value as string);
  };

  // Handle changes to year
  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setYear(Number(event.target.value));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Filters for Time Range (Weekly/Monthly) and Year */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Time Range</InputLabel>
            <Select value={timeRange} onChange={handleTimeRangeChange}>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select value={year} onChange={handleYearChange}>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Statistics Display */}
        {error ? (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        ) : stats ? (
          <>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Total Bookings: {stats.totalBookings}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Total Income: ₹{stats.totalIncome}</Typography>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography>Loading statistics...</Typography>
          </Grid>
        )}
      </Grid>

      <Button variant="contained" color="primary" onClick={() => navigate('/slotbooking')}>
        Book a Slot
      </Button>
    </Container>
  );
};

export default Dashboard;
