import React, { useState } from "react";
import "./EditPastes.css";
import { Modal, Button } from "react-bootstrap";
import { getPastesProps } from "./GetPastes";

interface editPasteProps {
  paste: getPastesProps;
  getPastes: () => Promise<void>;
}

export function EditPastes({ paste, getPastes }: editPasteProps): JSX.Element {
  //console.log(paste)
  const [code, setCode] = useState<string>(paste.code);
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
    setCode(code);
  }

  function handleShow() {
    setShow(true);
  }

  //edit code function
  async function updateCode(paste_id: number) {
    try {
      const body = { code };
      const apiBaseURL = process.env.REACT_APP_API_BASE;
      await fetch(apiBaseURL + `/pastes/${paste.paste_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      getPastes();
      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <Button className="edit-btn" onClick={handleShow}>
        Edit Paste
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        onClick={() => setCode(paste.code)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Paste Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => updateCode(paste.paste_id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
