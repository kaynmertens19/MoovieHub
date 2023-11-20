

import { useAuth0 } from "@auth0/auth0-react"
import "../css/login.css"

function Login() {
    const { loginWithRedirect } = useAuth0();
  
    return (
      <div className="login-container">
        <div className="card">
          <h1>Moovie Hub project</h1>
          <div className="button-container">
          <button className="neon-button" onClick={(): Promise<void> => loginWithRedirect()}>Login</button>

          </div>
        </div>
      </div>
    );
  }
  
  export default Login;