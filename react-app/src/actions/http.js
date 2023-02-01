export const GET = async (url) => {
    const res = await fetch(url)

    if (!res.ok) {
        const message = `An error has occurred: ${res.status}`
        throw new Error(message)
    }

    if (res.status === 200) {
        const obj = await res.json()
        return obj
    }
}

export const PATCH = async (url, obj) => {

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(obj),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    const res = await fetch(request)

    if (!res.ok) {
        const message = `An error has occurred: ${res.status}`
        throw new Error(message)
    }

    if (res.status === 200) {
        const obj2 = await res.json()
        return obj2
    }
}


export const POST = async (url, obj) => {

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    const res = await fetch(request)

    if (!res.ok) {
        const message = `An error has occurred: ${res.status}`
        throw new Error(message)
    }

    if (res.status === 200) {
        const obj2 = await res.json()
        return obj2
    }
}