import axios from 'axios'

const requestApi = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_BASE_URL
})

requestApi.interceptors.request.use((req) => {
    const userToken = JSON.parse(localStorage.getItem('userToken')) ?? null

    if (userToken || req?.data?.userToken) {
        let tokens = req?.data?.userToken ?? ''
        let newtoken = userToken ?? tokens
        req.headers = {
            Authorization: `Bearer ${newtoken}`
        }
    }
    return Promise.resolve(req)
})
requestApi.interceptors.response.use(
    (response) => {
        const { data } = response

        if (data?.meta?.status === 1) {
            return Promise.resolve(data)
        } else {
            return Promise.reject({
                status: data?.statusCode,
                message: data?.meta?.message
            })
        }
    },
    async (error) => {
        console.log(error)
        return Promise.reject(error?.response?.data)
    }
)

export default requestApi
