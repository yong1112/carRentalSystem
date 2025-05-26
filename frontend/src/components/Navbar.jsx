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
                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => navigate("/")}>
                    <img src={logo} alt="Vroom Logo" style={{ height: '45px', marginRight: '10px' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            textDecoration: 'none',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                        }}
                    >
                        Car Rental
                    </Typography>
                </Box>
                <Box sx={{ marginLeft: 'auto' }}>
                    <Button
                        size="small"
                        onClick={handleReservationClick}
                        sx={{ fontWeight: 600,
                            border: 2, 
                            borderColor: 'black', 
                            width: '200px', 
                            color: 'black',
                            boxShadow: '0px 2px 4px #ff9696',
                            '&:hover': { backgroundColor: '#ff9696' }}}
                    >
                        Reservation
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
