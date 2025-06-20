
export const fetchData = async <T = unknown>(URL: string, token: string): Promise<T> =>{
    try{

        const response = await fetch(URL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`)
        }

        const data = await response.json()

        return data as T
    }catch{
        throw new Error('error occured while fetching data')
    }
}

export const logIn = async<T= unknown> (URL: string, body: object,): Promise<T>=> {
    try{
        const response = await fetch(URL, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }, 
            body: JSON.stringify(body)
        })

        if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`)
        }

        const data = await response.json()
        return data as T
    }catch{
        throw new Error ('error occured while fetching data')
    }
}

export const sendData = async<T= unknown> (URL: string, body: object, token: string): Promise<T>=> {
    try{
        const response = await fetch(URL, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify(body)
        })

        if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`)
        }

        const data = await response.json()
        return data as T
    }catch (error){
        throw new Error (`error occured while fetching data: ${error} `)
    }
}