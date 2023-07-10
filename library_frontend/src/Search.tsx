import "./styles/Body.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Preview } from "./getPreviews";
import getSearchResults from "./getSearchResults";
import addBooks from "./AddBooks";
import checkBook from "./CheckBook";
import { useNavigate } from "react-router-dom";

function Search () {
    const [results, setResults] = useState<Preview[]>([]);
    const [check, setCheck] = useState<boolean[]>([]);
    const [params, setParams] = useSearchParams();
    let query: string = "", pages: string = "";
    if (Array.from(params.entries()).length === 0) query = "index";
    else if (Array.from(params.entries()).length === 1) {
        query = Array.from(params.entries())[0][1];
        pages = "1";
        setParams(exParams => {
            let newParams = exParams;
            newParams.append("page", pages);
            return newParams;
        });
    }
    else if(Array.from(params.entries()).length === 2) {
        query = Array.from(params.entries())[0][1];
        pages = Array.from(params.entries())[1][1];
    }
    const navigate = useNavigate();

    async function add (workID: string, index: number) {
        const response = await addBooks(workID).catch(err => navigate("/err", {state: [0, err as TypeError]}));
        if(response?.status !== 200) navigate("/login");
        const temp = [...check];
        temp[index] = true;
        setCheck([...temp]);
    }

    async function checkm (items: Preview[]) {
        const checkArray: Array<boolean> = [];
        for (const item of items) {
            const response = await checkBook(item).catch(err => navigate("/err", {state: [0, err as TypeError]}));
            if(response?.status === 401) checkArray.push(false);
            if(response?.status === 200) checkArray.push(true);
            else if(response?.status === 404) checkArray.push(false);
        }
        return checkArray;
    }

    function pageChange (direction: string) {
        if (direction === "backwards") {
            if (pages !== "1") pages = (Number(pages) - 1).toString();
        }
        else {
            if (pages !== "10") pages = (Number(pages) + 1).toString();
        }
        setParams((exParams) => {
            const newParams = new URLSearchParams();
            const newPages = Array.from(exParams.entries()).map((value) => {
                if (value[0] === "page") value[1] = pages;
                newParams.append(value[0], value[1]);
            });
            return newParams;
        });
    }

    useEffect(() => {
        async function getResults () {
            if (Number(pages) > 10 || isNaN(Number(pages))) {
                navigate("/search?query=" + query);
                return;
            }
            const searchResults = await getSearchResults(query, pages);
            setResults(searchResults);
            setCheck([...await checkm(searchResults)]);
        }
        if (query !== "index") getResults();
    }, [query, pages]);

    if (check[0] === undefined || query === "index") return null;
    else {
        return (
            <>
                <div className="pages"><button onClick={() => pageChange("backwards")}>←</button> Page {pages} / 10 <button onClick={() => pageChange("forward")}>→</button></div>
                <div className="body">
                    {results.map((item, index) => 
                        <div key = {index} className="cell">
                            {check[index] === false ? <button onClick={() => add(item.workID, index)}>Add to your books</button>
                            :
                            <button>Already in your books</button>
                            }
                            <div id="book-title">{item.title}</div>
                            <figure>
                                <a href = {item.link} target = "_blank" rel = "noreferrer"><img src = {item.cover} alt = "cover"></img></a>
                                <figcaption>{item.summary}</figcaption>
                            </figure>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default Search;