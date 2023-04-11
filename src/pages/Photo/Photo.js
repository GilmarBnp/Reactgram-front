import "./Photo.css";
import PulseLoader from "react-spinners/PulseLoader";

// Components
import message from "../../components/Message";

//import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getPhoto, like } from "../../slices/photoSlice"
import LikeContainer from "../../components/LikeContainer";

const Photo = () => {
    const {id} = useParams();
    
    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.auth);
    const { photo, loading, error, message } = useSelector((state) => state.photo);

    
    // Comentários

    // Load photo data
    useEffect((e) => {
        dispatch(getPhoto(id))
       
    }, [dispatch, id])

    const handleLike = () => { 
      dispatch(like(photo._id));
    };
   
    return (
    <div id="photo">
        <PhotoItem photo={photo} />
        <LikeContainer photo={photo} user={user} id={photo._id} handleLike={handleLike}/>
    </div>
  )

}

export default Photo