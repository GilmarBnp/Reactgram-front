import "./Home.css"

// Components
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMesssage";

// Redux
import { getAllPhotos, like, getPhoto, resetState, getPhotoLikesAll } from "../../slices/photoSlice";
import LikeContainerAll from "../../components/LikeContainerAll";

const Home = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(5);

  const indexOfLastPhoto = currentPage * photosPerPage;

  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const {user, photos, loading, likesAll, message } = useSelector((state) =>({
    user: state.auth.user,
    photos: state.photo.photos,
    loading: state.photo.photos.loading,
    likesAll: state.photo.likesAll,
    message: state.photo.message  
  }));

  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const [isLiking, setIsLiking] = useState(false);

    useEffect(()=> {
      dispatch(getAllPhotos());
    },[dispatch, likesAll])

    useEffect(()=> {
      dispatch(getPhotoLikesAll());
    },[dispatch])

    const handleLike = async (photoId) => {
      if (isLiking) {
        return;
      }
      setIsLiking(true);
      try {
        await dispatch(like(photoId));
        
        dispatch(getPhotoLikesAll());
        
        resetMessage();
      } catch (error) {
        
        console.log(error);
        resetMessage();
      } finally {
        setIsLiking(false);
      }
    };
  
    if(loading){
      return <p>Loading...</p>
    };

    const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(photos.length / photosPerPage); i++) {
     pageNumbers.push(i);
   };

  return(
  <div id="home">
    {photos && currentPhotos.map((photo) => (
    <div key={photo._id}>
      <PhotoItem photo={photo} />
      <LikeContainerAll photos={[photo]} likes={{ [photo._id]: photo.likes }} user={user} handleLike={handleLike}/>
      <div className="message-container">
          {message && <Message msg={message} type="sucess"/>}
        </div>
      <Link className="btn" to={`/photos/${photo._id}`}>Ver</Link>
    </div>
    ))}

    {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user.userId}`}>clique aqui</Link> para começar.
        </h2>
      )}
      <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? "active" : ""}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}
       </div>
       </div>
  );
};

export default Home