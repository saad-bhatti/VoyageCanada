// Components to Import
import React from "react"
import {Route, Routes, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Pages to Import
import SettingsPage from "./pages/Settings";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import {ShoppingCart} from "./pages/ShoppingCart";
import Homepage from "./pages/HomePage";
import Credit from "./pages/Credit";
import SuccessPurchase from "./pages/SuccessPurchase";
import Flight from "./pages/Flight";

// Styles to Import
import "./style/App.css";

function App() {

    const [email, setEmail] = React.useState("sample@sample.com");
    const [contact, setContact] = React.useState("6470000000");
    const [street, setStreet] = React.useState("street");
    const [city, setCity] = React.useState("city");
    const [province, setProvince] = React.useState("ON");
    const [postal, setPostal] = React.useState("POSTAL");
    const [flightrow, setFlightrow] = React.useState([]);
    const [cartrow, setCartrow] = React.useState([]);
    const [histrow, setHistrow] = React.useState([]);

    const location = useLocation();
    let notSignin;
    if (location.pathname === "/signin") {
        notSignin = false;
    } else notSignin = true;
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/settings/:header/" element={<SettingsPage email={email} contact={contact}
                                                                        changeEmail={setEmail}
                                                                        changeContact={setContact}
                                                                        street={street} city={city}
                                                                        prov={province} postal={postal}
                                                                        changeStreet={setStreet}
                                                                        changeCity={setCity} changeProv={setProvince}
                                                                        changePostal={setPostal}/>}/>
                <Route path="/signin/" element={<Signin changeEmail={setEmail} changeContact={setContact}
                                                        findF={setFlightrow} findC={setCartrow}
                                                        changeStreet={setStreet}
                                                        changeCity={setCity} changeProv={setProvince}
                                                        changePostal={setPostal}/>}/>
                <Route path="/cart/" element={<ShoppingCart carts={cartrow}/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/credit/" element={<Credit/>}/>
                <Route path="/success/" element={<SuccessPurchase/>}/>
                <Route path="/flight/" element={<Flight flights={flightrow} findC={setCartrow}/>}/>
            </Routes>
            {notSignin ? <Footer/> : null}
        </div>
    );
}

export default App;
