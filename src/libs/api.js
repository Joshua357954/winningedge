export const axiosPrivate = axios.create({
    baseURL: '/api/auth',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});