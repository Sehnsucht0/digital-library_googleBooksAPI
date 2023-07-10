import "./styles/Register.css"
import { useNavigate } from "react-router-dom";
import {useFormSubmit, IState} from "./useFormSubmit";

function Login () {
    
    const navigate = useNavigate();
    const formPattern = "[A-Za-z0-9_]+";

    function validate (inputID: string) {
        const input = document.getElementById(inputID) as HTMLInputElement;
        if (input.validity.valueMissing) input.setCustomValidity("Required field");
        else if (input.validity.patternMismatch) input.setCustomValidity("Special characters other than '_' are not allowed");
        else input.setCustomValidity("");
        input.reportValidity();
    }

    async function FormSubmit (e: React.FormEvent<HTMLFormElement>, action: string) {
        const result : number | IState = await useFormSubmit(e, action);
        if (typeof result === "number") navigate("/");
        else navigate("/error", {state: result.state});
    }

    return (
        <div className="register-div">
            <form id = "form" className="register-form" onSubmit={e => FormSubmit(e, process.env.REACT_APP_SERVER + "/auth/login")}>
                <label htmlFor="username">Username</label>
                <input id = "username" name = "username" minLength = {3} maxLength={15} pattern={formPattern} onKeyUp={() => validate("username")} required></input>
                <label htmlFor="password">Password</label>
                <input id = "password" name = "password" type="password" minLength = {8} maxLength={20} pattern={formPattern} onKeyUp={() => validate("password")} required></input>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;