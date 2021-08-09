import "./InputPaste.css";
import { useState } from "react";

export function InputPaste(): JSX.Element {
  const [user_name, setUser_name] = useState<string>("")
  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");

  async function storeCode () {
    console.log(user_name, description, code);
    //send info to post /pastes endpoint
    const apiBaseURL = process.env.REACT_APP_API_BASE
    const response = await fetch(apiBaseURL + '/pastes', 
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({user_name, description, code})
        })
        console.log(await response.text())
  }
  return (
    <div className="input-form">
      {
        <form>
            <label>
            Username:
            <input
              className="form-input"
              type="text"
              name="name"
              value={user_name}
              onChange={(e) => {
                setUser_name(e.target.value);
              }}
            />
          </label>
          <br />

          <label>
            Description:
            <input
              className="form-input"
              type="text"
              name="name"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
          <br />

          <label>
            Code:
            <input
              className="form-input"
              type="text"
              name="name"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </label>
          <br />
        </form>
      }
      <br />
      {<button className="form-submit-btn"onClick={storeCode}>Submit</button>}
      
    </div>
  );
}
