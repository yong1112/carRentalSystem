import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Vroom.png';

const Navbar = () => {
    const navigate = useNavigate();
    const handleReservationClick = () => {
        const selectedCar = localStorage.getItem('selectedCar');
        if (selectedCar) {
            navigate('/reservation');
        } else {
            alert('Please choose a car first by clicking "Rent" on the homepage.');
        }
    };
    return (
        <AppBar color="inherit" position="fixed" sx={{ borderBottom: '1px solid #fbfbfb', border: 1 }}>
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Vroom Logo" style={{ height: '45px', marginRight: '10px' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                        }}
                    >
                        Vroom Car Rental
                    </Typography>
                </Box>
                <Box sx={{ marginLeft: 'auto' }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleReservationClick}
                        sx={{ textTransform: 'none', fontWeight: 600, color: '#fff'}}
                    >
                        Reservation
                    </Button>
                </Box>
            </Toolbar>


        </AppBar>
    );
};

export default Navbar;
