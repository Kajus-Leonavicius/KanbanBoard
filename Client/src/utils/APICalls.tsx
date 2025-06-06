
export const fetchData = async <T = unknown>(URL: string): Promise<T> =>{
    try{

        const response = await fetch(URL)

        if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`)
        }

        const data = await response.json()

        return data as T
    }catch{
        throw new Error('error occured while fetching data')
    }
}