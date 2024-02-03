import React, {useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box"

export default function Paypal(props) {

    const paypal = useRef();
    const navigateToSuccess = useNavigate();

    useEffect(()=> {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "paypal table",
                            amount: {
                                currency_code: "CAD",
                                value: props.cost
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
                navigateToSuccess("/success/");
            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [])

    return(
        <div>
            <Box ref={paypal} sx={{width: 'min-content', marginLeft:'82%',
                marginTop: '3%', marginBottom: '5%'}} />
        </div>
    );
}