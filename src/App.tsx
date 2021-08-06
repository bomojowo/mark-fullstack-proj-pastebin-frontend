import React, { useState } from "react";
import "./App.css";
import { InputPaste } from "./components/InputPaste";

function App() {
  const [data, setData] = useState<string>()
  const [paste, setPaste] = useState<string>()

  //fetching form API
  const loadData = async () => {
    const apiBaseURL = process.env.REACT_APP_API_BASE;
    const response = await fetch(apiBaseURL + "/");
    const body = await response.json();
    setData(body.pastes[1].pasted_text)
    console.log(body.pastes[1].pasted_text);
  };
  

  function storePaste (){
    console.log('testing the store button')
  }

  return (
    <div className="App">
      <h1>Paste Bin</h1>
      <input placeholder="Paste your code" />
      <button onClick={storePaste}>Save Paste</button>
      <hr />
      <button onClick={loadData}>Get Pastes</button>
      <h3>GET pastes</h3>
      {data}
      <InputPaste />
      
    </div>
  );
}

export default App;
