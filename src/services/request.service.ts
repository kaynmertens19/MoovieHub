export const publicRequest = async () => {
    const {VITE_API_URL: url} = import.meta.env;
    const response = await fetch(`${url}/api/public`)
    const data = await response.json();
    console.log("public request", data);
};


export const protectedRequest = async (getToken: any) =>{
    const {VITE_API_URL: url} = import.meta.env;
    const token = await getToken();
    console.log(token)
    const response = await fetch(`${url}/api/protected`, { headers: {
        authorization: `Bearer ${token}`
    }
});
const data = await response.json();
console.log("protected request", data);
}