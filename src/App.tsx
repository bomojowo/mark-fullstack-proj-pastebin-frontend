import React, { useState } from "react";
import "./App.css";
import { InputPaste } from "./components/InputPaste";
import {GetPastes } from "./components/GetPastes"
function App() {
  const [data, setData] = useState<string[]>([])
  // const [code, setCode] = useState<string>()

  //fetching form API
  const loadData = async () => {
    const apiBaseURL = process.env.REACT_APP_API_BASE;
    const response = await fetch(apiBaseURL + "/");
    const body = await response.json();
    setData([...data, body.pastes[0].description])
    setData(body.pastes[1].pasted_text)
    console.log(body.pastes[0]);
  };
  

  return (
    <div className="App">
      <h1>Paste Bin</h1>
      <InputPaste/>
      <hr />
      <h3>GET previous pastes</h3>
      {<button onClick={loadData}>Get Pastes</button>}
      <br/>
      {data}
      
      
    </div>
  );
}

export default App;
