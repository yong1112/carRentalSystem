import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Snackbar,
  Box
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ReservationPage = () => {
  const [car, setCar] = useState(null);
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    driversLicenseNumber: '',
    startDate: dayjs().format('YYYY-MM-DD'),
    rentalPeriod: 1
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formReady, setFormReady] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const selected = sessionStorage.getItem('selectedCar');
    const cachedForm = localStorage.getItem('reservationForm');
    if (selected) {
      const parsedCar = JSON.parse(selected);
      setCar(parsedCar);
      axios.get(`${process.env.REACT_APP_API}/api/cars`)
        .then(res => {
          const current = res.data.cars.find(c => c.vin === parsedCar.vin);
          if (current?.available) setFormVisible(true);
        });
    }
    if (cachedForm) {
      const parsedForm = JSON.parse(cachedForm);
      setForm(parsedForm);
      const validationErrors = validate(parsedForm);
      setErrors(validationErrors);
      setFormReady(Object.keys(validationErrors).length === 0);
    }
  }, []);

  useEffect(() => {
    if (touched) {
      localStorage.setItem('reservationForm', JSON.stringify(form));
      const validationErrors = validate(form);
      setErrors(validationErrors);
      setFormReady(Object.keys(validationErrors).length === 0);
    }
  }, [form, touched]);

  const validate = (data) => {
    const newErrors = {};
    if (!data.name) newErrors.name = 'Required';
    if (!data.phoneNumber) newErrors.phoneNumber = 'Required';
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Invalid email';
    if (!data.driversLicenseNumber) newErrors.driversLicenseNumber = 'Required';
    return newErrors;
  };

  const handleChange = (e) => {
    setTouched(true);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formReady) return;

    try {
      // Double-check availability before submission
      const res = await axios.get(`${process.env.REACT_APP_API}/api/cars`);
      const currentCar = res.data.cars.find(c => c.vin === car.vin);

      if (!currentCar?.available) {
        alert('This car is no longer available. Please choose another one.');
        return;
      }

      const order = {
        customer: {
          name: form.name,
          phoneNumber: form.phoneNumber,
          email: form.email,
          driversLicenseNumber: form.driversLicenseNumber
        },
        car: { vin: car.vin },
        rental: {
          startDate: form.startDate,
          rentalPeriod: Number(form.rentalPeriod),
          totalPrice: Number(form.rentalPeriod) * car.pricePerDay,
          orderDate: dayjs().format('YYYY-MM-DD')
        }
      };

      axios.post(`${process.env.REACT_APP_API}/api/orders`, order)
        .then(res => {
          setSubmitted(true);
          setOrderId(res.data.orderId || 'test-order-id');
          setOpenSnackbar(true);
          sessionStorage.removeItem('selectedCar');
          localStorage.removeItem('reservationForm');
        })
        .catch(err => console.error('Order failed:', err));
    } catch (err) {
      console.error('Order failed:', err);
      alert('Submission failed. Try again.');
    }
  };

    const handleCancel = () => {
      localStorage.removeItem('reservationForm');
      navigate('/');
    };

    if (!car) {
      return (
        <>
          <Navbar />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              No car selected. Please choose a car from the homepage.
            </Typography>
            <Button
              sx={{
                fontWeight: 600,
                border: 2,
                borderColor: 'black',
                width: '200px',
                color: 'black',
                boxShadow: '0px 2px 4px #ff9696',
                '&:hover': { backgroundColor: '#ff9696' }
              }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Box>
        </>
      );
    }

    return (
      <>
        <Navbar />
        <Container maxWidth="sm" sx={{ mt: 10 }}>
          <Typography variant="h5" gutterBottom>
            Reservation: {car.brand} {car.carModel} ({car.carType})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {car.yearOfManufacture} | Fuel: {car.fuelType} | Mileage: {car.mileage} | Price: ${car.pricePerDay}/day
          </Typography>

          {!formVisible && !submitted && (
            <Typography sx={{ mt: 2 }} color="error">This car is no longer available. Please choose another one.</Typography>
          )}

          {submitted ? (
            <>
              <Typography variant="h6" color="success.main">Reservation submitted!</Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                  axios.post(`${process.env.REACT_APP_API}/api/orders/confirm/${orderId}`)
                    .then(() => {
                      navigate('/', {
                        state: { successMessage: 'Booking confirmed successfully!' }
                      });
                    })
                    .catch((err) => {
                      console.error('Confirmation failed:', err);
                      alert('This car is no longer available.');
                    });
                }}
              >
                Click here to confirm your booking
              </Button>
            </>
          ) : (
            formVisible && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}><TextField sx={{ width: 250 }} name="name" label="Full Name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} /></Grid>
                <Grid item xs={12} sm={6}><TextField sx={{ width: 250 }} name="phoneNumber" label="Phone Number" value={form.phoneNumber} onChange={handleChange} error={!!errors.phoneNumber} helperText={errors.phoneNumber} /></Grid>
                <Grid item xs={12} sm={6}><TextField sx={{ width: 250 }} name="email" label="Email" value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} /></Grid>
                <Grid item xs={12} sm={6}><TextField sx={{ width: 250 }} name="driversLicenseNumber" label="Driver's License" value={form.driversLicenseNumber} onChange={handleChange} error={!!errors.driversLicenseNumber} helperText={errors.driversLicenseNumber} /></Grid>
                <Grid item xs={12} sm={6}><TextField sx={{ width: 250 }} name="startDate" label="Start Date" type="date" value={form.startDate} onChange={handleChange} /></Grid>
                <Grid item xs={6} sm={3}><TextField
                  sx={{ width: 250 }}
                  name="rentalPeriod"
                  label="Rental Days"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={form.rentalPeriod}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value)); // Prevent values < 1
                    setForm((prev) => ({ ...prev, rentalPeriod: value }));
                    setTouched(true);
                  }}
                /></Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={600} sx={{ mb: 1 }}>
                    Total: ${form.rentalPeriod * car.pricePerDay}
                  </Typography>

                  <Box display="flex" gap={2}>
                    <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit} disabled={!formReady}>Submit</Button>
                  </Box>
                </Grid>
              </Grid>
            )
          )}

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
              Reservation complete. Please confirm.
            </MuiAlert>
          </Snackbar>
        </Container>
      </>
    );
  };

  export default ReservationPage;
