// Components to import
import "../style/Signin.css";
import {SigninForm} from "../components/SigninForm";
import {SignupForm} from "../components/SignupForm";
import {useRef} from "react";
import {isAuthenticated} from "../api";
import {useNavigate} from "react-router-dom";

function Signin(props) {
    const containerRef = useRef(null);
    let navigate = useNavigate();

    function SwitchInactive() {
        containerRef.current.className = "auth_form";
    }

    function SwitchActive() {
        containerRef.current.className = "auth_form right_active";
    }

    const handleAlreadySigned = () => {
        if (isAuthenticated()) {
            nagivate('/');
        } else {
            navigate('/signin')
        }
    }

    return (
        <div className="form" onLoad={handleAlreadySigned}>
            <div className="auth_form right_active" ref={containerRef}>
                <SignupForm changeEmail={props.changeEmail} changeContact={props.changeContact} findF={props.findF}
                            changeStreet={props.changeStreet}
                            changeCity={props.changeCity} changeProv={props.changeProv}
                            changePostal={props.changePostal} findC={props.findC}/>
                <SigninForm changeEmail={props.changeEmail} changeContact={props.changeContact} findF={props.findF}
                            changeStreet={props.changeStreet}
                            changeCity={props.changeCity} changeProv={props.changeProv}
                            changePostal={props.changePostal} findC={props.findC}/>
                <div className="auth_form_overlay">
                    <div className="overlay">
                        <div className="overlay_panel left_overlay">
                            <button className="form_btn" onClick={SwitchInactive}>Sign In</button>
                        </div>
                        <div className="overlay_panel right_overlay">
                            <button className="form_btn" onClick={SwitchActive}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background"/>
        </div>
    );
}

export default Signin;