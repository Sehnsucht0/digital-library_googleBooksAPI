import { Preview } from "./getPreviews";

function checkBook (item: Preview) {
    const response = fetch(process.env.REACT_APP_SERVER + "/checkbook", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: new URLSearchParams([
            ["workID", item.workID]
        ])
    });
    return response;
}

export default checkBook;