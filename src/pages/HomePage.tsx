import { useAuth0 } from "@auth0/auth0-react"
import { protectedRequest, publicRequest } from "../services/request.service";

export function HomePage() {


    const {logout, getAccessTokenSilently} = useAuth0();

    console.log("getAccessTokenSilently", getAccessTokenSilently());

    getAccessTokenSilently().then((token)=> {
        console.log(token)
    })
        return(
            <>
            <div>
          <button onClick={():Promise<void> => logout()}>Logout</button>
                <button onClick={():Promise<void> => publicRequest()}>Public Request</button>
                <button onClick={():Promise<void> => protectedRequest(getAccessTokenSilently)}>Private Request</button>
            </div>
            
            </>
        )
}
