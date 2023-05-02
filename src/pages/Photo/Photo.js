import "./Photo.css";
//import PulseLoader from "react-spinners/PulseLoader";
import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message"

//import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMesssage"; 

// Redux
import { getPhoto, comment } from "../../slices/photoSlice"
import LikeContainer from "../../components/LikeContainer";

const Photo = () => {

    const[commentText, setCommentText]=useState('');

    const {id} = useParams();
    
    const dispatch = useDispatch();
    
    const resetMessage = useResetComponentMessage(dispatch)

    const {user} = useSelector((state) => state.auth);
    const { photo, loading, error, message } = useSelector((state) => state.photo);

    // Comentários

    // Load photo data
    useEffect(() => {
      dispatch(getPhoto(id))
    }, [dispatch, id])

    const handleComment = (e) => {
      e.preventDefault()

      const commentData = {
        comment: commentText,
        id: photo._id,
      };

      dispatch(comment(commentData));

      setCommentText('');
      resetMessage();
    };
   
    return (
    <div id="photo">
        <PhotoItem photo={photo} />
        <LikeContainer photo={photo} user={user} id={photo._id}/>
        <div className="message-container">
          {error && <Message msg={error} type="error"/>}
          {message && <Message msg={message} type="sucess"/>}
        </div>
       {photo.comments && (
        <>
         <div className="comments">
         <h3>Comentários ({photo.comments.length })</h3>
          <form onSubmit={handleComment}>
            <input 
            type="text" 
            placeholder="Insira o seu comentário..."
            onChange={(e)=> setCommentText(e.target.value)}
            value={commentText || ""}
            required
            minLength={3}/>
            <input type="submit" value="Enviar" />
          </form>
          {photo.comments.length === 0 && <p>Não há comentários...</p>}
          {photo.comments.map((comment) => (
            <div className="comment" key={comment.comment}>
              <div className="author">
                {comment.userImage && (
                    <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} />
                )}
                <Link to={`/users/${comment.userId}`}>
                  <p>{comment.userName}</p>
                </Link>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
        </>
       )}
    </div>
  )

}

export default Photo