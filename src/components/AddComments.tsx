import { getPastesProps } from "./GetPastes"
// import { Modal, Button } from "react-bootstrap"
// import {useState} from 'react'

interface AddCommentsProps {
    paste: getPastesProps;
  } 

export function AddComments({paste}: AddCommentsProps):JSX.Element {

    // const [code, setCode] = useState<string>("");
    // const [show, setShow] = useState(false);

    // function handleClose() {
    //     setShow(false);
    //     setCode(code)
    //   }

    //   function handleShow() {
    //     setShow(true);
    //   }
    
    function handleComment(){
    console.log('testing comment function')
    }

    //postcomment function

    //getcomment function

    //deletecomment function


  return (
      <button onClick={() => handleComment()}>Comment</button>
  )
}
