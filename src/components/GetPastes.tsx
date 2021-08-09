import { useState } from "react";
import "./GetPastes.css";

interface getPastesProps {
  user_name: string;
  description: string;
  code: string;
  id: number;
}

export function GetPastes(): JSX.Element {
  const [pastes, setPastes] = useState<getPastesProps[]>([]);

  async function getPastes() {
    const apiBaseURL = process.env.REACT_APP_API_BASE;
    const response = await fetch(apiBaseURL + "/pastes", {
      method: "GET",
    });
    const body = await response.json();
    setPastes(body.pastes);
  }


  function handlePostClick() {
    alert('You have clicked this post')
  }

  return (
    <div>
      {
        <button className="get-posts-btn" onClick={getPastes}>
          Public Posts
        </button>
      }
      <br />
      <div>
        {pastes &&
          pastes.map((paste) => (
            <div className="get-pastes" key={paste.id} onClick={handlePostClick}>
              <b>username:</b>
              {paste.user_name}
              <br />
              <b>description:</b>
              {paste.description}
              <br />
              <b>code:</b>
              {paste.code}
            </div>
          ))}
      </div>
    </div>
  );
}
