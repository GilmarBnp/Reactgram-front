import "./Home.css"

// Components
import LikeContainer from '../../components/LikeContainer';
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

// Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMesssage";

// Redux
import { getAllPhotos, like } from "../../slices/photoSlice";

const Home = () => {

  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage();

  const {user: authUser, photo, loading} = useSelector((state) =>({

    user: state.auth.user,
    photos: state.photo.photos,
    loading: state.photo.photos.loading
  }));

    useEffect(()=> {
      dispatch(getAllPhotos());
      
    },[dispatch])
  
    if(loading){
      return <p>Loading...</p>
    }

    // Like a photo
    const handleLike = ()=> {
      dispatch(like(photo._id))

      resetMessage()
    }

  return(
  <div>
    <h3>Home</h3>
  </div>
  )
}

export default Home