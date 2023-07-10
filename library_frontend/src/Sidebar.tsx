import "./styles/Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar () {
    /*<Link to = "/books" style={{textDecorationLine : "none", color: "black"}}>Your Books</Link>*/
    return (
        <nav>
            <Link to = "/" style={{textDecorationLine : "none", color: "black"}}>Home</Link>
            <Link to = "/books" style={{textDecorationLine : "none", color: "black"}}>My books</Link>
            <Link to = "/search" style={{textDecorationLine : "none", color: "black"}}>Search books</Link>
        </nav>
    );
}

export default Sidebar;