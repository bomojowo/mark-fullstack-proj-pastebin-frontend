import React, { useState } from "react";
import "./EditPastes.css"
import { Modal, Button } from "react-bootstrap";
import {getPastesProps} from "./GetPastes"


interface editPasteProps{
    paste: getPastesProps
}

export function EditPastes({paste}: editPasteProps): JSX.Element{
  
    //console.log(paste)
    const [code, setCode] = useState<string>(paste.code)
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        //edit code function

        async function updateCode(id: number){
            
            try{
                const body = {code};
                const apiBaseURL = process.env.REACT_APP_API_BASE;
                const response = await fetch(apiBaseURL + `/pastes/${paste.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify(body)
                });

                window.location.reload(false)
            }catch (err){
                console.log(err.message)
            }
        }

        return (
          <>
            <Button className="edit-btn" onClick={handleShow}>
              Edit Paste
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Paste Title</Modal.Title>
              </Modal.Header>
              <Modal.Body><input type="text" className="form-control" value={code} onChange={(e => setCode(e.target.value))}/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => updateCode(paste.id)}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
};

