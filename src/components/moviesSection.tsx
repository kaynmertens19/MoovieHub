import React from "react";
import { useEffect, useState } from "react";
import { movieUrl } from "../types/url";



export const MainSection = () => {

  const [movieData, setMoviedata]= useState([])


  useEffect(()=> {
    fetch(movieUrl)
    .then(response => response.json())
    .then(data => setMoviedata(data))
    })

    console.log(setMoviedata)

return(
  <>
  </>
)


}