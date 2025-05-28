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
import { useNavigate, useLocation } from 'react-router-dom';

const CarHomePage = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const [confirmationMessage, setConfirmationMessage] = useState(location.state?.successMessage || '');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const carTypes = [...new Set(cars.map(c => c.carType))];
  const carBrands = [...new Set(cars.map(c => c.brand))];


  useEffect(() => {
    if (location.state?.successMessage) {
      setOpenSnackbar(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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

    const matchesType = !selectedType || car.carType === selectedType;
    const matchesBrand = !selectedBrand || car.brand === selectedBrand;

    return matchesSearch && matchesType && matchesBrand;
  });

  const handleRentClick = (car) => {
    sessionStorage.setItem('selectedCar', JSON.stringify(car));
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
          sx={{ width: 400, mb: 4, border: 2, borderRadius: '5px' }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search cars by type, brand, or model..."
              size="small"
            />
          )}
        />
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Autocomplete
            options={carTypes}
            value={selectedType}
            onChange={(e, value) => setSelectedType(value || '')}
            renderInput={(params) => <TextField {...params} label="Car Type" size="small" />}
            sx={{ width: 200 }}
          />

          <Autocomplete
            options={carBrands}
            value={selectedBrand}
            onChange={(e, value) => setSelectedBrand(value || '')}
            renderInput={(params) => <TextField {...params} label="Brand" size="small" />}
            sx={{ width: 200 }}
          />

          <Button
            variant="outlined"
            onClick={() => {
              setSelectedType('');
              setSelectedBrand('');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </Button>
        </Box>

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
                      width: '180px',
                      height: '100px',
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
                    backgroundColor: car.available ? '#FFF' : 'grey.400',
                    '&:hover': {
                      backgroundColor: car.available ? '#ff9696' : 'grey.500',
                    },
                    border: 1,
                    color: 'black',
                    boxShadow: '0px 2px 4px #ff9696'
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
          {confirmationMessage || 'Rent clicked!'}
        </MuiAlert>

      </Snackbar>
    </>
  );
};

export default CarHomePage;
