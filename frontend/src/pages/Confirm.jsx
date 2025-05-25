import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import axios from 'axios';

const Confirm = () => {
  const { orderId } = useParams();
  const [message, setMessage] = useState('Confirming...');

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API}/api/orders/confirm/${orderId}`)
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage('Confirmation failed or order not found.'));
  }, [orderId]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">{message}</Typography>
    </Container>
  );
};

export default Confirm;
