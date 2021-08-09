import { useState } from "react";
import "./GetPastes.css";

interface getPastesProps {
  user_name: string,
  description: string,
  code: string,
  id: number
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
  

  return <div>
    {<button className="get-posts-btn"onClick={getPastes}>Get Posts Pastes</button>}
    <br/>
    <div>
     {pastes && pastes.map(paste => <div className="get-pastes" key={paste.id}><b>username:</b>{paste.user_name}<br/><b>description:</b>{paste.description}<br/><b>code:</b>{paste.code}</div>)}
    </div>
  </div>;
}
