import { useEffect, useState } from "react";
import "./GetPastes.css";

interface getPastesProps {
  user_name: string,
  description: string,
  code: string
}

export function GetPastes(): JSX.Element {
  const [pastes, setPastes] = useState<getPastesProps[]>([])
 

  //get all info by hitting get /pastes endpoint
  //display info

  async function getPastes () {
    const apiBaseURL = process.env.REACT_APP_API_BASE
    const response = await fetch(apiBaseURL + '/',
      {
          method:'GET',
      })      
    const body = await response.json()
    setPastes(body.pastes)
  }
  

  // useEffect(() => {
  //   getPastes()
  // },[])
  // console.log(pastes[1])

  return <div>
    {<button onClick={getPastes}>Get the pastes</button>}
    <br/>
    <div>
     {pastes && pastes.map(paste => <div className="get-pastes"><b>username:</b>{paste.user_name}<br/><b>description:</b>{paste.description}<br/><b>code:</b>{paste.code}</div>)}
    {/* <br/>
    <b>description:</b> {pastes && pastes.map(paste => <div>{paste.description}</div>)}
    <br/>
    <b>code:</b> {pastes && pastes.map(paste => <div>{paste.code}</div>)} */}
    </div>
  </div>;
}
