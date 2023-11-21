import React from 'react';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link'


export default function Footer() {
    return (
        <footer>
            <Box px={{ xs: 2, sm: 5 }} py={{ xs: 2, sm: 7 }} color='#e9e9e9'
                 sx={{background: "linear-gradient(90deg, #438496 0%, #286DA8 100%)"}}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" borderBottom={1}>About Us</Typography>
                        <Typography variant="body1" color="inherit" pt={2}>
                            The website offers services including online flight
                            booking, hotel booking, and local car rental. Our goal is to provide the cheapest price
                            across the internet and help with your travelling!
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" borderBottom={1}>Help</Typography>
                        <Box pt={2}>
                            <Link variant="body1" color="inherit" underline='hover'>Contact</Link>
                        </Box>
                        <Box>
                            <Link variant="body1" color="inherit" underline='hover'>Support</Link>
                        </Box>
                        <Box>
                            <Link variant="body1" color="inherit" underline='hover' href='/credit/'>
                                Credit
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" borderBottom={1}>Account</Typography>
                        <Box pt={2}>
                            <Link variant="body1" color="inherit" underline='hover' href='/signin/'>
                                Switch Account
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </footer>
    )
}