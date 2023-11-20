import NavBar from "../components/navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import MovieList from "../components/moviesSection";
export function HomePage() {



    const { user, isAuthenticated } = useAuth0();
    const registerUserWithAPI = async () => {
        try {
          console.log(user);
          if (isAuthenticated && user) {
            const userData = {
              name: user.nickname,
              email: user.email,
            };
      
            try {
              const response = await fetch('http://localhost:3004/user/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              });
      
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
      
              const responseData = await response.json();
              const userUID = responseData.user.id; 
      
              console.log('User UID:', userUID);
      
             
              localStorage.setItem('user_id', userUID);
      
             
      
            } catch (error) {
              console.error('Error while registering user', error);
            }
          }
        } catch (error) {
          console.error('Error ehile registering user', error);
        }
      };
      
      
      
  
    
    useEffect(() => {
      
  
      if (isAuthenticated && user) {
        console.log("isuserautenthicated", isAuthenticated)
        registerUserWithAPI();
      }
    }, []);




        return(
            <>
            <NavBar/>
            <MovieList/>
            </>
        )
}
