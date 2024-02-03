// Icons to Import
import Typography from "@mui/material/Typography";
import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {FormControl, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import Button from "@mui/material/Button";
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import {changeContact, changeEmail} from "../api";

export default function ProfileData(props) {
    const [prevEmail, setPrevEmail] = React.useState(props.email)
    const [email, setEmail] = React.useState(props.email);
    const [emailEdit, setEmailEdit] = React.useState(true);
    const [errorEmail, setErrorEmail] = React.useState("");

    const emailValidation = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || !regex.test(email)){
            setErrorEmail("Invalid Email Address");
            return false;
        }
        return true;
    };

    const handleEmailFieldChange = (e) => {
        setEmail(e.target.value);
    };

    const [prevCont, setPrevCont] = React.useState(props.contact);
    const [contact, setContact] = React.useState(props.contact);
    const [contEdit, setContEdit] = React.useState(true);
    const [errorCont, setErrorCont] = React.useState("");

    const normalizeInput = (contact) => {
        // return nothing if no value
        if (!contact) return contact;

        const currentContact = contact.replace(/[^\d]/g, '');
        const cvLength = currentContact.length;

        if (cvLength < 4)
            return currentContact;
        if (cvLength < 7)
            return `(${currentContact.slice(0, 3)}) ${currentContact.slice(3)}`;
        return `(${currentContact.slice(0, 3)}) ${currentContact.slice(3, 6)}-${currentContact.slice(6, 10)}`;
    };

    const handleContFieldChange = (e) => {
        const currentContact = e.target.value.replace(/[^\d]/g, '');
        setContact(currentContact);
        normalizeInput(e.target.value);
    };

    const contactValidation = (contact) => {
        const regex = new RegExp(/^[0-9\b]+$/);
        if(!contact || !regex.test(contact)){
            setErrorCont("Invalid Phone Number Format");
            return false;
        }
        else if(contact.length !== 10){
            setErrorCont("Please enter a valid Canadian phone number");
            return false;
        }
        return true;
    };

    const [streetEdit, setStreetEdit] = React.useState(true);
    const [street, setStreet] = React.useState(props.street);
    const [postal, setPostal] = React.useState(props.postal);
    const [prevPostal, setPrevPostal] = React.useState(props.postal)
    const [errorPostal, setErrorPostal] = React.useState("");

    const handleStreetFieldChange = (e) => {
        setStreet(e.target.value);
    };

    const handlePostalFieldChange = (e) => {
        setPostal(e.target.value);
    };

    const postalValidation = (postal) => {
        if(postal.length !== 6){
            setErrorPostal("Please enter a valid postal code");
            return false;
        }
        return true;
    };

    const [cityEdit, setCityEdit] = React.useState(true);
    const [city, setCity] = React.useState(props.city);

    const handleCityFieldChange = (e) => {
        setCity(e.target.value);
    };

    const [province, setProvince] = React.useState(props.prov);
    const [open, setOpen] = React.useState(false);
    const provinces = ['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL'];

    const handleProvinceChange = (e) => {
        setProvince(e.target.value);
        props.changeProv(e.target.value);
    };

    const handleProvinceClose = () => {
        setOpen(false);
    };

    const handleProvinceOpen = () => {
        setOpen(true);
    };

    return(
        <div className="Data">
            <Typography gutterBottom variant="h4" mt={'5%'} ml={'3%'}>Public Profile</Typography>
            <hr style={{width: '94%'}}/>
            <Typography gutterBottom variant="h6" mt={'5%'} ml={'3%'}>Email Address</Typography>
            <hr style={{width: '94%'}}/>
            <Grid container spacing={1} mt={'2%'} ml={'3%'} justifyContent="flex-start" alignItems="center">
                <Grid item xs={2}>
                    <Typography width={"fit-content"} gutterBottom variant="body1" fontSize={18} fontWeight={400}>
                        Current Email:
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <div style={{display: "flex", alignItems: "baseline"}}>
                        {errorEmail === "" ?
                            (<TextField
                            InputProps={{
                                readOnly: emailEdit,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            value={email}
                            onChange={handleEmailFieldChange}
                        />) :
                            (<TextField
                                error
                                helperText={errorEmail}
                                InputProps={{
                                    readOnly: emailEdit,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={email}
                                onChange={handleEmailFieldChange}
                            />)}

                        {
                            emailEdit ? (<Button onClick={() => {
                                setPrevEmail(email);
                                setEmailEdit(false);
                            }}>Edit</Button>) :
                                (<Button onClick={() => {
                                    if(emailValidation(email) && email !== prevEmail){
                                        setEmail(email);
                                        setErrorEmail("");
                                        changeEmail(email);
                                        props.newEmail(email);
                                    }
                                    else{
                                        setEmail(prevEmail);
                                        setPrevEmail(email);
                                    }
                                    setEmailEdit(true);
                                }}>Save</Button>)
                        }
                    </div>
                </Grid>
            </Grid>

            <Typography gutterBottom variant="h6" mt={'5%'} ml={'3%'}>Contact Information</Typography>
            <hr style={{width: '94%'}}/>
            <Grid container spacing={1} mt={'2%'} ml={'3%'} justifyContent="flex-start" alignItems="center">
                <Grid item xs={2}>
                    <Typography width={"fit-content"} gutterBottom variant="body1" fontSize={18} fontWeight={400}>
                        Phone Number:
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <div style={{display: "flex", alignItems: "baseline"}}>
                        {errorCont === "" ?
                            (<TextField
                                InputProps={{
                                    readOnly: contEdit,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={normalizeInput(contact)}
                                onChange={handleContFieldChange}
                            />) :
                            (<TextField
                                error
                                helperText={errorCont}
                                InputProps={{
                                    readOnly: contEdit,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={normalizeInput(contact)}
                                onChange={handleContFieldChange}
                            />)}

                        {
                            contEdit ?
                                (<Button onClick={() => {
                                    setPrevCont(contact);
                                    setContEdit(false);
                                }}>Edit</Button>) :
                                (<Button onClick={() => {
                                    if(contactValidation(contact) && contact !== prevCont){
                                        setContact(contact);
                                        setErrorCont("");
                                        changeContact(contact);
                                        props.newContact(contact);
                                    }
                                    else{
                                        setContact(prevCont);
                                    }
                                    setPrevCont(contact);
                                    setContEdit(true);
                                }}>Save</Button>)
                        }
                    </div>
                </Grid>
            </Grid>

            <Typography gutterBottom variant="h6" mt={'5%'} ml={'3%'}>Address</Typography>
            <hr style={{width: '94%'}}/>
            <Grid container columnSpacing={{sx:1}} rowSpacing={3} mt={'2%'} ml={'4%'} justifyContent="flex-start"
                  alignItems="center">
                <Grid item xs={1}>
                    <Typography width={"fit-content"} gutterBottom variant="body1" fontSize={18} fontWeight={400}>
                        Street:
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <div style={{display: "flex", alignItems: "baseline", columnGap: "2%"}}>
                        <TextField
                            InputProps={{
                                readOnly: streetEdit,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeIcon />
                                    </InputAdornment>
                                ),
                            }}
                            value={street}
                            onChange={handleStreetFieldChange}
                        />
                        {
                            errorPostal === "" ?
                                (<TextField
                                    label="Postal Code"
                                    InputProps={{
                                        readOnly: streetEdit,
                                    }}
                                    value={postal}
                                    onChange={handlePostalFieldChange}
                                />) :
                                (<TextField
                                    label="Postal Code"
                                    error
                                    helperText={errorPostal}
                                    InputProps={{
                                        readOnly: streetEdit,
                                    }}
                                    value={postal}
                                    onChange={handlePostalFieldChange}
                                />)
                        }

                        {
                            streetEdit ?
                                (<Button onClick={() => {
                                    setPrevPostal(postal);
                                    setStreetEdit(false);
                                }}>Edit</Button>) :
                                (<Button onClick={() => {
                                    if (postalValidation(postal)){
                                        setPostal(postal);
                                        props.changePostal(postal);
                                        setErrorPostal("");
                                    }
                                    else {
                                        setPostal(prevPostal);
                                    }
                                    setStreet(street);
                                    props.changeStreet(street);
                                    setPrevPostal(postal);
                                    setStreetEdit(true);
                                }}>Save</Button>)
                        }
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <Typography width={"fit-content"} gutterBottom variant="body1" fontSize={18} fontWeight={400}>
                        City:
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <div style={{display: "flex", alignItems: "baseline"}}>
                        <TextField
                            InputProps={{
                                readOnly: cityEdit,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationCityIcon />
                                    </InputAdornment>
                                ),
                            }}
                            value={city}
                            onChange={handleCityFieldChange}
                        />

                        {
                            cityEdit ?
                                (<Button onClick={() => {
                                    setCityEdit(false);
                                }}>Edit</Button>) :
                                (<Button onClick={() => {
                                    setCity(city);
                                    props.changeCity(city);
                                    setCityEdit(true);
                                }}>Save</Button>)
                        }
                    </div>
                </Grid>
                <Grid item>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Province</InputLabel>
                        <Select
                            open={open}
                            onClose={handleProvinceClose}
                            onOpen={handleProvinceOpen}
                            value={province}
                            label="Province"
                            onChange={handleProvinceChange}
                        >
                            {provinces.map((area) => (
                                <MenuItem key={area} value={area}>{area}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

        </div>
    );

}