function addBooks (workID: string) {
    const response = fetch(process.env.REACT_APP_SERVER + "/update", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: new URLSearchParams([
            ["workID", workID]
        ])
    });
    return response;
}

export default addBooks;