import { useEffect, useState } from "react";
import "./styles/header.css";
import { Link, useNavigate } from "react-router-dom";


function Header () {

    const [auth, setAuth] = useState({status: false, username: ""});
    const navigate = useNavigate();

    useEffect(() => {
        async function Auth () {
            const response = await fetch(process.env.REACT_APP_SERVER + "/check", {
                method: "GET",
                mode: "cors",
                credentials: "include"
            }).catch(err => navigate("/error", {state: [0, err as TypeError]}));
            if (response?.status === 200) {
                if (auth.status === false) {
                    const username = await response.text();
                    setAuth({status: true, username: username});
                }
            }
        }
        Auth();
    });

    async function logOut () {
        const response = await fetch(process.env.REACT_APP_SERVER + "/logout", {
            method: "POST",
            mode: "cors",
            credentials: "include"
        }).catch(err => navigate("/error", {state: [0, err as TypeError]}));
        if (response?.status === 200) {
            setAuth({status: false, username: ""});
            navigate("/login");
        }
        else navigate("/error", {state: [response?.status, new TypeError("")]});
    }

    return (
        <header className="Header">
            <div className="authentication">
                {auth.status === false ?
                <>
                    <Link to = "/register" style={{textDecorationLine : "none", color: "white"}}>Register</Link>
                    <Link to = "/login" style={{textDecorationLine : "none", color: "white"}}>Log in</Link>
                </>
                :
                <div style={{color: "white"}}>Welcome, {auth.username}</div>
                }
            </div>
            <h1 id="title">Digital Library</h1>
            <div>
                {auth.status === true ? <button type = "button" onClick = {logOut}>Log out</button> : null}
            </div>
      </header>
    );
}

export default Header;