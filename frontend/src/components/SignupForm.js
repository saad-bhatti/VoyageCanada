import React from "react";
import {createAddress, getCart, getFlights, signin, signup} from "../api";
import PlacesAutoComplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import Geocode from "react-geocode";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {createData} from "./flightInfo";

Geocode.setApiKey("AIzaSyC8MxdG12ymxYd2l9YcZ5ZHwoOn38V5r5c");

function createCart(productId, name, date, price) {
    return {
        productId,
        name,
        date,
        price,
    };
}

export function SignupForm(props) {
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const contactRef = React.useRef(null);
    const nameRef = React.useRef(null);
    const [error, setError] = React.useState("");
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(
            emailRef.current.value,
            passwordRef.current.value,
            nameRef.current.value,
            contactRef.current.value
        ).then(() => {
            const temp = addr.split(", ");
            const street = temp[0];
            const city = temp[1];
            const provincePostal = temp[2];
            let temp2 = provincePostal.split(" ");
            const province = temp2[0];
            let postal = "";
            for (let i = 1; i < temp2.length; i++) {
                postal = postal + " " + temp2[i];
            }
            postal = postal.replaceAll(" ", "");
            createAddress(street, city, province, postal).then().catch((err) => {
                console.log(err);
            });
            signin(emailRef.current.value, passwordRef.current.value).then((data) => {
                let email = data.data.signin.email;
                let contact = data.data.signin.contact;
                props.changeEmail(email);
                props.changeContact(contact);
                let street = data.data.signin.addresses[0].street;
                let city = data.data.signin.addresses[0].city;
                let prov = data.data.signin.addresses[0].province;
                let postal = data.data.signin.addresses[0].postalCode;
                props.changeStreet(street);
                props.changeCity(city);
                props.changeProv(prov);
                props.changePostal(postal);
            }).catch((err) => {
                setError(err);
            });
            getFlights().then((data) => {
                let rows = data.data.getFlights.map(f => {
                    return createData(f._id, f.departLoc, f.arrLoc, f.intraProvince,
                        f.seatsLeft, f.price, f.departTime, f.arrTime, f.daysUntilFlight)
                });
                props.findF(rows);
            }).catch((err) => {
                console.log(err);
            });
            getCart().then((data) => {
                let rows = [];
                if(!(data.data.getCart===null)) {
                    rows = data.data.getCart.map(f => {
                        return createCart(f._id, f.departLoc + "->" + f.arrLoc, f.departTime, f.price);
                    });
                }
                props.findC(rows);
            }).catch((err) => {
                console.log(err);
            })
            navigate("/");
        }).catch((err) => {
            setError(err);
        });
    };

    const [addr, setAddr] = React.useState("");

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        let a = "";
        await Geocode.fromLatLng(latLng.lat, latLng.lng).then(
            (response) => {
                a = response.results[0].formatted_address;
            },
            (error) => {
                console.error(error);
            }
        );
        setAddr(a);
    };

    return (
        <div className="signup_form">
            <form action="#" className="complex_form" onSubmit={handleSubmit}>
                <h2 className="form_title">Sign Up</h2>
                <input ref={emailRef} type="email" placeholder="Email" className="form_content" required/>
                <input ref={nameRef} type="text" placeholder="Name" className="form_content" required/>
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    className="form_content"
                    required
                />
                <input
                    ref={contactRef}
                    type="text"
                    placeholder="Phone number"
                    className="form_content"
                    required
                />
                <PlacesAutoComplete value={addr} onChange={setAddr} onSelect={handleSelect}>
                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                        <div className="addr">
                            <input
                                type="text"
                                {...getInputProps({
                                    placeholder: "Address",
                                    className: "form_content",
                                    required: true,
                                })}
                            />
                            <div className="addr">
                                {loading && <div>...loading</div>}

                                {suggestions.map((suggestion) => {
                                    const className = suggestion.active
                                        ? "suggestion-item--active"
                                        : "suggestion-item";

                                    const style = suggestion.active
                                        ? {backgroundColor: "#ffffff", cursor: "pointer"}
                                        : {backgroundColor: "#e9e9e9", cursor: "pointer"};

                                    return (
                                        <div
                                            key={suggestion.placeId}
                                            className="addr"
                                            {...getSuggestionItemProps(suggestion, {className, style})}
                                        >
                                            <span className="addr_options">{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutoComplete>
                {
                    error !== "" ?
                        (
                            <Typography variant="body2" color='red'>{error}</Typography>
                        ) : null
                }
                <button className="form_btn">Sign Up</button>
            </form>
        </div>
    );
}
