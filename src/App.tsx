//import React, { useState } from "react";
import "./App.css";
import { InputPaste } from "./components/InputPaste";
import { GetPastes } from "./components/GetPastes";
function App() {

  return (
    <div className="App">
      <h1>Paste Bin</h1>
      <InputPaste />
      <hr />
      <GetPastes/>
    </div>
  );
}

export default App;
