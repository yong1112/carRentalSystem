import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    const selected = localStorage.getItem('selectedCar');
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
    if (cachedForm) setForm(JSON.parse(cachedForm));
  }, []);

  useEffect(() => {
    localStorage.setItem('reservationForm', JSON.stringify(form));
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setFormReady(Object.keys(validationErrors).length === 0);
  }, [form]);

  const validate = (data) => {
    const newErrors = {};
    if (!data.name) newErrors.name = 'Required';
    if (!data.phoneNumber) newErrors.phoneNumber = 'Required';
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Invalid email';
    if (!data.driversLicenseNumber) newErrors.driversLicenseNumber = 'Required';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formReady) return;

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
        localStorage.removeItem('selectedCar');
        localStorage.removeItem('reservationForm');
      })
      .catch(err => console.error('Order failed:', err));
  };

  const handleCancel = () => {
    localStorage.setItem('reservationForm', JSON.stringify(form));
    navigate('/');
  };

  if (!car) {
    return <Typography sx={{ mt: 10 }} variant="h6">No car selected. Please choose a car from the homepage.</Typography>;
  }

  return (
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
            href={`/confirm/${orderId}`}
          >
            Click here to confirm your booking
          </Button>
        </>
      ) : (
        formVisible && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}><TextField fullWidth name="name" label="Full Name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} /></Grid>
            <Grid item xs={12}><TextField fullWidth name="phoneNumber" label="Phone Number" value={form.phoneNumber} onChange={handleChange} error={!!errors.phoneNumber} helperText={errors.phoneNumber} /></Grid>
            <Grid item xs={12}><TextField fullWidth name="email" label="Email" value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} /></Grid>
            <Grid item xs={12}><TextField fullWidth name="driversLicenseNumber" label="Driver's License" value={form.driversLicenseNumber} onChange={handleChange} error={!!errors.driversLicenseNumber} helperText={errors.driversLicenseNumber} /></Grid>
            <Grid item xs={6}><TextField fullWidth name="startDate" label="Start Date" type="date" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={6}><TextField fullWidth name="rentalPeriod" label="Rental Days" type="number" value={form.rentalPeriod} onChange={handleChange} /></Grid>
            <Grid item xs={12}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Total Price: ${form.rentalPeriod * car.pricePerDay}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={!formReady}
              >
                Submit Reservation
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="error" fullWidth onClick={handleCancel}>
                Cancel and Return to Homepage
              </Button>
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
  );
};

export default ReservationPage;
