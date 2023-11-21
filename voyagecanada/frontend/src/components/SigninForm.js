import React from "react";
import {getCart, getFlights, signin} from "../api";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {createData} from "./flightInfo";

function createCart(productId, name, date, price) {
    return {
        productId,
        name,
        date,
        price,
    };
}

export function SigninForm(props) {
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const [error, setError] = React.useState("");
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
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
            getFlights().then((data) => {
                let rows = data.data.getFlights.map(f => {
                    return createData(f._id, f.departLoc, f.arrLoc, f.intraProvince,
                        f.seatsLeft, f.price, f.departTime, f.arrTime, f.daysUntilFlight);
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
            navigate('/');
        }).catch((err) => {
            setError(err);
        });
    };

    return (
        <div className="signin_form">
            <form action="#" className="complex_form" onSubmit={handleSubmit}>
                <h2 className="form_title">Sign In</h2>
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Please enter your email"
                    className="form_content"
                    required
                />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Please enter your password"
                    className="form_content"
                    required
                />
                {
                    error !== "" ? (<Typography variant="body2" color="red">{error}</Typography>) : null
                }
                <button className="form_btn">Sign In</button>
            </form>
        </div>
    );
}
