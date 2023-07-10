import { Link, useLocation, Navigate } from "react-router-dom";

function Errors () {
    const location = useLocation();
    const state: [number, TypeError] = location.state;
    return (
        <div>
            <div>
                {state[0] === 401 ? <Navigate to = "/login" /> : null}
                {state[0] !== 0 ? "Error " + state[0] : null}
            </div>
            <div>{state[1].message !== "" ? state[1].message : null}</div>
            <Link to = "/">Back to homepage</Link>
        </div>
    );
}

export default Errors;