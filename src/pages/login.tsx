

import { useAuth0 } from "@auth0/auth0-react"


function Login(){
    const {loginWithRedirect} = useAuth0()
    return (
        <>
        <h1>Vite + react + login</h1>
        <div className="card">
            <button onClick={():Promise<void>=> loginWithRedirect()}>Login</button>
        </div>
        </>
    )
}

export default Login