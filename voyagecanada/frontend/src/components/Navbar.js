import React from 'react';
import {MenuItems} from "./MenuItems";
import Button from "@mui/material/Button";
import '../style/Navbar.css';
import {BrowserRouter as Router, Link, Route, Routes, useNavigate} from 'react-router-dom';
import {isAuthenticated, signout} from "../api";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";

export default function Navbar() {

    const navigation = useNavigate();
    const handleSignoutClick = () => {
        signout();
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleAuth = (e) => {
        if (!isAuthenticated()) {
            navigation("/");
            setOpen(true);
        } else {
            navigation(e.target.dataset.to);
        }
    }

    return (
        <nav className="Navbar_Items">
            <h1 className="Navbar_logo"><Link to="/" style={{textDecoration: "none", color: "#e9e9e9"}}>
                VoyageCanada </Link>
            </h1>
            <ul className='Navbar_nav-menu'>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Typography variant="h7" className={item.cName} data-to={item.url} onClick={handleAuth}>
                                {item.title}
                            </Typography>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-title"
                                aria-describedby="modal-description"
                            >
                                <Box sx={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    transform: 'translate(-50%, -50%)', width: 400,
                                    bgcolor: '#438496', boxShadow: 24, p: 4, color: '#e9e9e9'
                                }}>
                                    <Typography id="modal-title" variant="h6" component="h2">
                                        Please Login First
                                    </Typography>
                                    <Typography id="modal-description" sx={{mt: 2}}>
                                        You are currently not logged into your VoyageCanada account now,
                                        please try to login or registered first.
                                    </Typography>
                                    <Button variant="outlined" color="primary" size="large"
                                            sx={{marginTop: '5%', marginLeft: '35%'}} onClick={handleClose}>
                                        <Link to="/signin" style={{textDecoration: "none", color: "#e9e9e9"}}>
                                            Sign Up
                                        </Link>
                                    </Button>
                                </Box>
                            </Modal>
                        </li>
                    )
                })}
            </ul>
            {
                !(isAuthenticated()) ?
                    (
                        <Button variant="contained" color="primary" size="large">
                            <Link to="/signin" style={{textDecoration: "none", color: "#e9e9e9"}}> Sign Up
                            </Link>
                        </Button>
                    ) :
                    (
                        <Button variant="contained" color="primary" size="large" onClick={handleSignoutClick}>
                            <Link to="/" style={{textDecoration: "none", color: "#e9e9e9"}}> Sign Out
                            </Link>
                        </Button>
                    )
            }
        </nav>
    );
}