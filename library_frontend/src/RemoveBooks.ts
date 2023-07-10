function RemoveBooks (workID: string) {
    const response = fetch(process.env.REACT_APP_SERVER + "/deletebook", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: new URLSearchParams([
            ["workID", workID]
        ])
    });
    return response;
}

export default RemoveBooks;