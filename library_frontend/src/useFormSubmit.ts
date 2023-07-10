interface IState {
    state: [number, TypeError]
}

async function useFormSubmit (e: React.FormEvent<HTMLFormElement>, action: string) : Promise<number | IState> {

    e.preventDefault();
    let errors: IState = {state: [0, new TypeError("")]};
    let success: number = 0;
    const htmlForm = document.getElementById("form") as HTMLFormElement;
    const data = new URLSearchParams();
    for (const [key, value] of new FormData(htmlForm)) data.append(key, value as string);
    const response = await fetch(action, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: data
    }).catch(err => {errors.state = [0, err as TypeError]});
    if (response !== undefined) {
        if (response.status === 409) return response.status;
        else if (!response.ok) errors.state = [response.status, new TypeError("")];
        else success++;
    }
    if (success !== 0) return response!.status;
    else return errors;
}

export {useFormSubmit, type IState};