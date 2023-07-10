import "./styles/SearchBar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar () {
    const [search, setSearch] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("loading")!.style.display = "none";
    }, []);

    useEffect(() => {
        const input = document.getElementById("search-value") as HTMLInputElement;
        const searchValue = input.value.split(" ").join("+");
        if (search !== 0) navigate("/search?query=" + searchValue + "&page=1");
    }, [search]);
    return (
        <div className="search-bar-container">
            <form id="search-bar" onSubmit = {e => {
                e.preventDefault();
                setSearch(c => c + 1);
            }}>
                <input type="search" id = "search-value" maxLength={40}></input>
                <button type="submit" id = "search-button">Search</button>
                <div id="loading">Loading...</div>
            </form>
        </div>
    );
}

export default SearchBar;