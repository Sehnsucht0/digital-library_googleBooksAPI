import { Preview } from "./getPreviews";
import nocover from "./assets/computer.png";

async function getSearchResults (searchValue: string, pages: string) {
    const progress =  document.getElementById("loading");
    if (progress) progress.style.display = "";
    const searchAPI: string = "https://www.googleapis.com/books/v1/volumes?q=";
    const searchParameters: string = "&maxResults=14";
    const pageParameters: string = `&startIndex=${(Number(pages) - 1) * 14}`;
    const searchResponse = await fetch(searchAPI + searchValue + searchParameters + pageParameters, {mode: "cors", method: "GET"});
    const searchResult = await searchResponse.json();
    const result: Array<Preview> = [];
    if (searchResult.numFound === 0) {
        result.push({title: "", summary: "No results", cover: "", link: "", workID: ""});
        return result;
    };

    for (let i: number = 0; i < 14; i++) {
        let workURL: string = searchResult.items[i].selfLink;
        const responseWork = await fetch(workURL, {method: "GET", mode: "cors"});
        const work = await responseWork.json();
        let description: string;
        if (work.volumeInfo.description) {
            let HTMLdescription = document.createElement("div");
            HTMLdescription.innerHTML = work.volumeInfo.description;
            description = HTMLdescription.textContent as string;
        }   
        else description = "No description";
        let coverURL: string;
        if(typeof(work.volumeInfo.imageLinks) === "undefined") coverURL = nocover;
        else coverURL = work.volumeInfo.imageLinks.thumbnail;
        result.push({title: work.volumeInfo.title, summary: description, cover: coverURL, link: work.volumeInfo.previewLink, workID: work.id});
    }
    if (progress) progress.style.display = "none";
    return result;
}

export default getSearchResults;