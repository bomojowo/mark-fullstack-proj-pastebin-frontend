//import { getPastesProps } from "./GetPastes"
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { getPastesProps } from "./GetPastes";
import "./AddComments.css";

export interface AddCommentsProps {
  paste: getPastesProps
}


export function AddComments({paste}: AddCommentsProps): JSX.Element {

    const [comment, setComment] = useState<string>()
  const [showComments, setShowComments] = useState<AddCommentsProps[]>([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //getcomment function
  //need to join commentdb with pastebindb to get back specific comment for each id
  async function getComments() {
    const apiBaseURL = process.env.REACT_APP_API_BASE;
    const response = await fetch(apiBaseURL + `/pastes/${paste.paste_id}/comments`, {
      method: "GET",
    });
    const body = await response.json();
    setShowComments(body.showComments);
  }
  //testing button works
  function handleSaveComment() {
    handleClose();
    console.log("Comment saved");
  }
  //testing button works
  function handleAddComment() {
      postComments()
    console.log("Comment Added");
  }

  //postcomment function
  async function postComments(){
    const apiBaseURL = process.env.REACT_APP_API_BASE;
    console.log(comment)
    console.log(paste.paste_id)
    const response = await fetch(apiBaseURL + `/pastes/${paste.paste_id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    console.log(response)
    const status = await response.text()
    console.log(status)
    // const body = await response.json();
    // setShowComments(body.showComments);
  } 
  

  //deletecomment function

  return (
    <>
      <Button className="see-commonets-btn" variant="primary" onClick={handleShow}>
        See comments
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add comment: <input type="text" onChange={(e) => {setComment(e.target.value)}}/>
          <button onClick={handleAddComment} >Add comment</button>
          <hr />
          <button onClick={getComments}>Show Previous Comments</button>
          <br />
          <ul>
            <li>Able to delete a comment</li>
          </ul>
          {showComments &&
            showComments.map((comment) => (
              <div>
                <b>comment:</b>
                {/* {comment.comment} */}
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveComment}>
            Save Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
