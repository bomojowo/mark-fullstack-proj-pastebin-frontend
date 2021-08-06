import './InputPaste.css'
import { useState } from 'react';
// export interface InputPasteProps {
//     code: string
//     setCode: React.Dispatch<React.SetStateAction<string | undefined>>
// }

export function InputPaste(): JSX.Element {
    const [description, setDescription] = useState<string>("")
    const [code, setCode] = useState<string>("")

    function storeCode (){
        //send info to post /pastes endpoint
        //console.log('testing the store button')
        console.log(code, description)

      }
  return <div className="input-form">
      
      {<form>
          <label>
              Description:
              <input type="text" name="name" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
          </label>
          <br/>
          
          <label>
              Code:
              <input type="text" name="name" value={code} onChange={(e) => {setCode(e.target.value)}}/>
          </label>
          <br/>
          
          </form>}
          <br/>
      {<button onClick={storeCode}>Submit</button>}
      <hr/>
      Description output
      <br/>
      
  </div>;
}
