import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api, { setAuthToken } from '../services/api';
import { Container, Typography, Select, MenuItem, Box, CircularProgress } from '@mui/material';
import MapView from './MapView';

const categoriesByDepartment = {
  A: ['X', 'Y', 'Z'],
  B: ['J', 'K', 'L'],
  C: ['M', 'N', 'O'],
  D: ['P', 'Q', 'R'],
};

const Dashboard = () => {
  const { role, department, token } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [parcels, setParcels] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setAuthToken(token);

    setLoading(true);
    // Query parcels by department and category
    let url = '/parcels';
    if (role === 'department_user' && department) {
      url += `?category=${selectedCategory || ''}`;
    } else if (role === 'admin') {
      url += `?category=${selectedCategory || ''}`;
    }
    api.get(url)
      .then(res => setParcels(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedCategory, role, department, token]);

  if (!token) return <Typography>Please login to see the dashboard.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ mb: 3 }}>
        {(role === 'admin' || role === 'department_user') && (
          <>
            <Typography variant="h6" gutterBottom>
              Select Category
            </Typography>
            <Select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              displayEmpty
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {(role === 'admin'
                ? Object.values(categoriesByDepartment).flat()
                : categoriesByDepartment[department] || []
              ).map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </>
        )}
      </Box>

      {loading ? (
        <CircularProgress />
      ) : parcels ? (
        <MapView parcels={parcels} />
      ) : (
        <Typography>No parcels data.</Typography>
      )}
    </Container>
  );
};

export default Dashboard;

