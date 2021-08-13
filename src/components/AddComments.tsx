//import { getPastesProps } from "./GetPastes"
import { Modal, Button } from "react-bootstrap"
import {useState} from 'react'

export interface AddCommentsProps {
   comment: string
  }

export function AddComments():JSX.Element {
    const [showComments, setShowComments] = useState<AddCommentsProps[]>([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//getcomment function
//need to join commentdb with pastebindb to get back specific comment for each id
  async function getComments() {
    const apiBaseURL = process.env.REACT_APP_API_BASE;
    const response = await fetch(apiBaseURL + "/pastes/:paste_id/comments", {
      method: "GET",
    });
    const body = await response.json();
    setShowComments(body.showComments);
  }

  function handleSaveComment(){
      handleClose()
    console.log('Comment saved')
    }

    function handleAddComment() {
        console.log('Comment Added')
    }

    //postcomment function

    

    //deletecomment function


  return (
    <>
    {/* <button onClick={() => handleComment()}>Comment</button> */}
      <Button variant="primary" onClick={handleShow}>
        See comments
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Add comment: <input/>
            <button onClick={handleAddComment}>Add comment</button>
            <hr/>
            <button onClick={getComments}>Show Previous Comments</button>
            <br/>
            
            <ul>
                <li>
                    Able to delete a comment
                </li>
            </ul>
            {showComments && showComments.map((comment) => (
                <div>
                    <b>comment:</b>
                    {comment.comment}
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
