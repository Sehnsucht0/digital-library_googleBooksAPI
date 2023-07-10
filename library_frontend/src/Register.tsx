import "./styles/Register.css"
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import {useFormSubmit, IState} from "./useFormSubmit";

function Register () {

    const navigate = useNavigate();
    const formPattern = "[A-Za-z0-9_]+";
    const [exists, setExists] = useState(false);

    function validate (inputID: string) {
        const input = document.getElementById(inputID) as HTMLInputElement;
        if (inputID === "password") confirmPass();
        if (input.validity.valueMissing) input.setCustomValidity("Required field");
        else if (input.validity.patternMismatch) input.setCustomValidity("Special characters other than '_' are not allowed");
        else input.setCustomValidity("");
        input.reportValidity();
    }

    function confirmPass () {
        const password = document.getElementById("password") as HTMLInputElement;
        const confirm_password = document.getElementById("confirm-password") as HTMLInputElement;
        if(password.value !== confirm_password.value) confirm_password.setCustomValidity("Passwords do not match");
        else confirm_password.setCustomValidity("");
        confirm_password.reportValidity();
    }

    async function FormSubmit (e: React.FormEvent<HTMLFormElement>, action: string) {
        const result : number | IState = await useFormSubmit(e, action); 
        if (typeof result === "number") {
            if (result === 409) setExists(true);
            else if (result >= 200 && result < 300) {
                setExists(false);
                navigate("/login");
            }
        }
        else navigate("/error", {state: result.state});
    }

    return (
        <div className="register-div">
            <form id = "form" className="register-form" onSubmit={e => FormSubmit(e, process.env.REACT_APP_SERVER + "/auth/register")}>
                {exists ? <div style={{color: "red"}}>This username is already in use.</div> : null}
                <label htmlFor="username">Username</label>
                <input id = "username" name = "username" minLength={3} maxLength={15} pattern={formPattern} onKeyUp={() => validate("username")} required></input>
                <label htmlFor="password">Password</label>
                <input id = "password" name = "password" type= "password" minLength = {8} maxLength={20} pattern={formPattern} onKeyUp={() => validate("password")} required></input>
                <label htmlFor="confirm-password">Confirm password</label>
                <input id = "confirm-password" name = "confirm-password" type= "password" minLength = {8} maxLength={20} pattern={formPattern} onKeyUp={confirmPass} required></input>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;