export default function request(url, method = "GET", body) {
    const config = {
        method,
        headers: {
            "Content-Type": 'application/json'
        }
    }
    if(body) {
        config.body = JSON.stringify(body);
    }

    return fetch(url, config)
        .then(async (response)=>{
            const res = await response.json()
            if (response.status >= 400 && response.status <600) {
                throw res.error ?res.error : new Error("Something went wrong!")
            }

            return res
        })
        .catch(error => {
            console.log(error)
        })

}