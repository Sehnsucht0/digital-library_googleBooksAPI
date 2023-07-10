import { Preview } from "./getPreviews";
import nocover from "./assets/computer.png";

async function getBooksFromAPI (booksID: Array<string>) : Promise<Array<Preview>> {
    const previews : Array<Preview> = [];
    const API: string = "https://www.googleapis.com/books/v1/volumes/";
        for (const workID of booksID) {
            const apiURL: string = API + workID;
            const responseWork = await fetch(apiURL, {method: "GET", mode: "cors"});
            const work = await responseWork.json();

            let HTMLdescription = document.createElement("div");
            HTMLdescription.innerHTML = work.volumeInfo.description;
            let description = HTMLdescription.textContent as string;
            if(description === "undefined") description = "No description";
            let coverURL: string;
            if(typeof(work.volumeInfo.imageLinks) === "undefined") coverURL = nocover;
            else coverURL = work.volumeInfo.imageLinks.thumbnail;
            previews.push({title: work.volumeInfo.title, summary: description, cover: coverURL, link: work.volumeInfo.previewLink, workID: work.id});
        }
    return previews;
}

export default getBooksFromAPI;