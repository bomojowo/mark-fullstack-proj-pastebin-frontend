import { useState } from "react";
import { AddComments } from "./AddComments";
import { EditPastes } from "./EditPastes";
import "./GetPastes.css";

export interface getPastesProps {
  user_name: string;
  description: string;
  code: string;
  paste_id: number;
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
    console.log(body)
    console.log(pastes)
  }

  // function handlePostClick() {
  //   alert("You have clicked this post");
  // }

  async function handlePostDelete(paste_id: number) {
    //deletes post
    const apiBaseURL = process.env.REACT_APP_API_BASE;
    await fetch(apiBaseURL + `/pastes/${paste_id}`, {
      method: "DELETE",
    });
    setPastes(pastes.filter((pastes) => pastes.paste_id !== paste_id));
    console.log()
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
            <div className="get-pastes" key={paste.paste_id}>
              <b>username:</b>
              {paste.user_name}
              <br />
              <b>description:</b>
              {paste.description}
              <br />
              <b>code:</b>
              {paste.code}
              <br />
              {/* <button className="show-more-btn"onClick={handlePostClick}>Show More</button> */}

              <button
                className="delete-btn"
                onClick={() => handlePostDelete(paste.paste_id)}
              >
                Delete
              </button>
              <EditPastes paste={paste} getPastes={getPastes} />
              <AddComments paste={paste}/>
            </div>
          ))}
      </div>
    </div>
  );
}
