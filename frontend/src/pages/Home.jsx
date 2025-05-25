import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Typography,
  Button,
  Box,
  Snackbar,
  TextField,
  Autocomplete
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CarHomePage = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/api/cars`)
      .then(res => setCars(res.data.cars))
      .catch(err => console.error('Failed to load cars', err));
  }, []);

  const allOptions = cars.flatMap(car => [car.brand, car.carModel, car.carType]);
  const safeSearch = searchQuery.toLowerCase();

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(safeSearch) ||
      car.carModel.toLowerCase().includes(safeSearch) ||
      car.carType.toLowerCase().includes(safeSearch);

    return !searchQuery || matchesSearch;
  });

  const handleRentClick = (car) => {
    localStorage.setItem('selectedCar', JSON.stringify(car));
    navigate('/reservation');
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mt: '90px', px: 4 }}>
        <Autocomplete
          freeSolo
          options={[...new Set(allOptions)]}
          inputValue={searchQuery}
          onInputChange={(e, value) => setSearchQuery(value)}
          onChange={(e, value) => value && setSearchQuery(value)}
          sx={{ width: 400, mb: 4, border: 2, borderRadius: '10px' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search cars by type, brand, or model..."
              variant="outlined"
              size="small"
            />
          )}
        />
        <Grid container spacing={6}>
          {filteredCars.map((car) => (
            <Grid item key={car.vin}>
              <Card
                elevation={2}
                sx={{
                  width: 180,
                  height: 300,
                  borderRadius: 3,
                  border: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2,
                  textAlign: 'center',
                  transition: '0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100, mb: 1 }}>
                  <img
                    src={car.image || `/images/${car.vin}.jpg`}
                    alt={car.carModel}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/default.jpg';
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body1" fontWeight={600}>
                    {car.brand} {car.carModel}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {car.carType} | {car.fuelType} | {car.yearOfManufacture}
                  </Typography>
                  <Typography variant="body2">Mileage: {car.mileage}</Typography>
                  <Typography variant="subtitle1" fontWeight={700} mt={0.5}>
                    ${car.pricePerDay}/day
                  </Typography>
                  {!car.available && (
                    <Typography variant="body2" color="error" fontWeight={500}>
                      Not Available
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: car.available ? '#95c944' : 'grey.400',
                    '&:hover': {
                      backgroundColor: car.available ? '#608423' : 'grey.500',
                    },
                    border: 1,
                    color: 'black'
                  }}
                  disabled={!car.available}
                  onClick={() => handleRentClick(car)}
                >
                  {car.available ? 'Rent' : 'Unavailable'}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: '64px', mr: '16px' }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          elevation={6}
          sx={{ border: 1, borderRadius: '10px' }}
        >
          Rent clicked!
        </MuiAlert>
      </Snackbar>
          </>
  );
};

export default CarHomePage;
