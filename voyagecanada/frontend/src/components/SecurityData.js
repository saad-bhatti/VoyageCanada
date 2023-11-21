import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Modal, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import { changePassword } from "../api";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

export default function SecurityData (){

    const [oldPass, setOldPass] = React.useState("");
    const [newPass, setNewPass] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [error, setError] = React.useState("");
    const [newPassCheck, setNewPassCheck] = React.useState(true);
    const [newConCheck, setNewConCheck] = React.useState(true);

    const [submit, setSubmit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    //submit new password here
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        changePassword(oldPass, newPass).then(() => {
            setError("");
            setOpen(true);
        }).catch((err) => {
            setError(err);
        });
    }

    //Need to validate old password with the password passed in later when integration
    const handleOldPasswordChange = (e) => {
        setOldPass(e.target.value);
        validateSubmit();
    }

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        const numericCheck = /\d+/;
        const lowerCaseCheck = /[a-z]+/;
        const upperCaseCheck = /[A-Z]+/;
        if (!numericCheck.test(password))
            setNewPassCheck(false);
        else if(!lowerCaseCheck.test(password))
            setNewPassCheck(false);
        else if(!upperCaseCheck.test(password))
            setNewPassCheck(false);
        else if(password.length < 12)
            setNewPassCheck(false);
        else
            setNewPassCheck(true);

        setNewPass(e.target.value);
        validateSubmit();
    }

    const handleConfirmChange = (e) => {
        setConfirm(e.target.value);
        if (newPass === confirm)
            setNewConCheck(true);
        else
            setNewConCheck(false);
        validateSubmit();
    }

    const validateSubmit = () => {
        if (newConCheck && newPassCheck && oldPass!=="")
            setSubmit(true);
        else
            setSubmit(false);
    }

    return(
        <div className="Data">
            <Typography gutterBottom variant="h4" mt={'5%'} ml={'3%'}>Change Password</Typography>
            <hr style={{width: '94%'}}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)', width: 400,
                    bgcolor: '#438496', boxShadow: 24, p: 4, color: '#e9e9e9'}}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Your Password Has Been Updated Successfully
                    </Typography>

                </Box>
            </Modal>
            <form onSubmit={handlePasswordSubmit}>
                <Grid container rowSpacing={3} spacing={1} mt={'2%'} ml={'3%'}
                      alignItems="left" justify="center" direction="column">
                    {
                        error === "" ?
                            (
                                <Grid item>
                                    <TextField
                                        id="old_password_input"
                                        name="old password"
                                        label="Old Password"
                                        type="password"
                                        onChange={handleOldPasswordChange}
                                        onSelect={handleOldPasswordChange}
                                        onBlur={handleOldPasswordChange}
                                        sx={{width: '30%'}}
                                    />
                                </Grid>
                            ) :
                            (
                                <Grid item>
                                    <TextField
                                        error
                                        helperText="The old password is incorrect"
                                        id="old_password_input"
                                        name="old password"
                                        label="Old Password"
                                        type="password"
                                        onChange={handleOldPasswordChange}
                                        onSelect={handleOldPasswordChange}
                                        onBlur={handleOldPasswordChange}
                                        sx={{width: '30%', mb: '-42%'}}
                                    />
                                </Grid>
                            )
                    }

                    {
                        newPassCheck ?
                            (
                                <Grid item>
                                    <TextField
                                        id="new_password_input"
                                        name="new password"
                                        label="New Password"
                                        type="password"
                                        onChange={handleNewPasswordChange}
                                        onSelect={handleNewPasswordChange}
                                        onBlur={handleNewPasswordChange}
                                        sx={{width: '30%'}}
                                    />
                                </Grid>
                            ) :
                            (
                                <Grid item>
                                    <TextField
                                        error
                                        helperText="Invalid Password"
                                        id="new_password_input"
                                        name="new password"
                                        label="New Password"
                                        type="password"
                                        onChange={handleNewPasswordChange}
                                        onSelect={handleNewPasswordChange}
                                        onBlur={handleNewPasswordChange}
                                        sx={{width: '30%', mb: '-15%'}}
                                    />
                                </Grid>
                            )
                    }

                    {
                        newConCheck ?
                            (
                                <Grid item>
                                    <TextField
                                        id="confirm_password_input"
                                        name="confirm password"
                                        label="Confirm Password"
                                        type="password"
                                        onChange={handleConfirmChange}
                                        onSelect={handleConfirmChange}
                                        onBlur={handleConfirmChange}
                                        sx={{width: '30%'}}
                                    />
                                </Grid>
                            ) :
                            (
                                <Grid item>
                                    <TextField
                                        error
                                        helperText="The current password is not same with the new password"
                                        id="confirm_password_input"
                                        name="confirm password"
                                        label="Confirm Password"
                                        type="password"
                                        onChange={handleConfirmChange}
                                        onSelect={handleConfirmChange}
                                        onBlur={handleConfirmChange}
                                        sx={{width: '30%', mb: '-15%'}}
                                    />
                                </Grid>
                            )
                    }

                    <Grid item>
                        <Typography gutterBottom variant="body2">
                            Make sure it's at least 12 characters that includes a number, a lowercase letter and an
                            uppercase letter.
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button variant="contained" disabled={!submit}
                                color="primary" type="submit">
                            Update Password
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}