//import { getPastesProps } from "./GetPastes"
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { getPastesProps } from "./GetPastes";
import "./AddComments.css";

export interface AddCommentsProps {
  paste: getPastesProps
  
}

export interface getCommentsProps{
    comment_id: number,
    comment: string,
    paste_id: number
}

export function AddComments({paste}: AddCommentsProps): JSX.Element {

    const [comment, setComment] = useState<string>()
  const [showComments, setShowComments] = useState<getCommentsProps[]>([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //getcomment function
  //need to join commentdb with pastebindb to get back specific comment for each id
  async function getComments(){
    const apiBaseURL = process.env.REACT_APP_API_BASE;
    const response = await fetch(apiBaseURL + `/pastes/${paste.paste_id}/comments`, {
      method: "GET",
    });
    const body = await response.json();
    setShowComments(body.comments);
    console.log(showComments)
    console.log(body)
  }

  //testing button works
  function handleSaveComment() {
    handleClose();
    console.log("Comment saved");
  }
  //testing button works
  function handleAddComment() {
      postComments()
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
    
  } 
  

  //deletecomment function
  function handleDeleteComment(){
      console.log('Comment deleted')
  }

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
          {showComments.map((comment) => (
              <div key={comment.comment_id}>
              <ul>
              <li>{comment.comment}
              <button onClick={handleDeleteComment}>❌</button>
              </li>
              </ul>
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
