import axios from 'axios'

const Axios = axios.create({ headers: {} })
Object.keys(Axios.defaults.headers.common)
    .forEach((key) => {
        if (key.startsWith('CLIENT-')) {
            delete Axios.defaults.headers.common[key]
        }
    })



export async function customerCountryApi() {
    try {
        return await Axios.get("https://ipapi.co/json")
    } catch (e) {
        throw Error(e);
    }
}