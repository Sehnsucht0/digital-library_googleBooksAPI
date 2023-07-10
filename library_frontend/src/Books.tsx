import "./styles/Body.css";
import { Preview } from "./getPreviews";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getBooksFromAPI from "./getBooksFromAPI";
import RemoveBooks from "./RemoveBooks";

function Books () {

    const navigate = useNavigate();
    const {id} = useParams();
    const [thumbnails, setThumbnails] = useState<Preview[]>([]);
    const [update, setUpdate] = useState(0);
    let pages = Number(id);
    const [maxpage, setMaxpage] = useState(1);
    const [nobooks, setNobooks] = useState(false);

    function pageChange (direction: string) {
        if (direction === "backwards") {
            if (pages !== 1) pages--;
        }
        else {
            if (pages < maxpage) pages++;
        }
        navigate("/books/" + pages);
    }

    async function remove (workID: string) {
        const response = await RemoveBooks(workID).catch(err => navigate("/err", {state: [0, err as TypeError]}));
        if(response?.status !== 200) navigate("/login");
        setUpdate(c => c + 1);
    }
    useEffect(() => {
        async function getBooks () {
            try {
                const response = await fetch(process.env.REACT_APP_SERVER + "/getbooks", {
                    method: "GET",
                    mode: "cors",
                    credentials: "include"
                });
                if(response.status === 401) navigate("/login");
                if(response.status >= 400) navigate("/error", {state: [response.status, new TypeError("")]});
                else {
                    const allBooks = await response.json();
                    const booksArray: Array<string> = allBooks.books;
                    let pageMax = Math.ceil(booksArray.length / 14); 
                    if (booksArray.length === 0) {
                        setNobooks(true);
                        pageMax = 1;
                    }
                    if (pages > pageMax || isNaN(pages)) {
                        navigate("../1");
                        return;
                    }
                    setMaxpage(pageMax);
                    let books: Array<string>;
                    if (booksArray.length > 14) books = booksArray.slice((pages - 1) * 14, (pages * 14));
                    else books = booksArray;
                    setThumbnails(await getBooksFromAPI(books));
                }
            }
            catch (err) {
                navigate("/error", {state: [0, err as TypeError]});
            }
        }
        getBooks();
    }, [update, pages]);

    return (
        <>
            <h1 className="body-title">Your Books</h1>
            <div className="pages"><button onClick={() => pageChange("backwards")}>←</button> Page {pages} / {maxpage} <button onClick={() => pageChange("forwards")}>→</button></div>
            {nobooks ? <div style={{marginLeft: "1%"}}>There are no books in your library.</div> : null}
            <div className="body">
                {thumbnails.map((item, index) => 
                <div key = {index} className="cell">
                    <button onClick={() => remove(item.workID)}>Remove from your books</button>
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

export default Books;