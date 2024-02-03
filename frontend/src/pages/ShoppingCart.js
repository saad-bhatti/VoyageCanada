import * as React from "react";
import Button from "@mui/material/Button";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EnhancedTable from "../components/Cart";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

export function ShoppingCart(props) {

    return (
        <div className="cart_form">
            <Typography variant="h3" fontWeight="400" gutterBottom mt={'5%'} ml={'10%'}>Shopping Cart</Typography>
            <Box className="cart_btn" sx={{display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: '2% 5%' }}>
                <Button variant="outlined" color="secondary" sx={{ width: 'fit-content', marginLeft: '10%',
                    marginTop: '2%', marginBottom: '2%', border: '2px solid', fontWeight: '600' }}
                        startIcon={<ShoppingBagIcon />}>
                    <Link to="/flight/" style={{textDecoration: "none"}}>Continue Shopping
                    </Link>
                </Button>
                <Button variant="outlined" color="secondary" sx={{ width: 'fit-content', marginRight: '13%',
                    marginTop: '2%', marginBottom: '2%', border: '2px solid', fontWeight: '600' }}
                        startIcon={<StarIcon />}>
                    <Link to="/settings/wishlist/" style={{textDecoration: "none"}}>Wishlist
                    </Link>
                </Button>
            </Box>
            <EnhancedTable carts={props.carts}/>
        </div>
    );
}