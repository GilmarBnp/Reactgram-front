import './Search.css';

// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMesssage';
import { useQuery } from '../../hooks/useQuery';

// Components
import LikeContainerAll from '../../components/LikeContainerAll';
import PhotoItem from '../../components/PhotoItem';
import { Link } from 'react-router-dom';

//redux
import { searchPhotos, like, getPhotoLikesAll } from '../../slices/photoSlice';

const Search = () => {

    const[isLiking, setIsLiking]= useState("");

    const query = useQuery();

    const search = query.get("q")

    const dispatch =useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const {user, photos, loading, likesAll } = useSelector((state) =>({
      user: state.auth.user,
      photos: state.photo.photos,
      loading: state.photo.photos.loading,
      likesAll: state.photo.likesAll,
      message: state.photo.message  
    }));
  
    // Load all photos
    useEffect(() => {
        dispatch(searchPhotos(search));
    },[dispatch, search, likesAll]);

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

      if(loading) {
        return <p>Carregando...</p>;
      }

  return (

    <div id='search'>
        <h2>Você está buscando por {search}</h2>
    {photos && photos.map((photo) => (
        <div key={photo._id}>
        <PhotoItem photo={photo} />
        <LikeContainerAll photos={[photo]} likes={{ [photo._id]: photo.likes }} user={user} handleLike={handleLike}/>
        <div className="message-container">
          </div>
        <Link className="btn" to={`/photos/${photo._id}`}>Ver</Link>
      </div>
    ))}
    
    {photos && photos.length === 0 && (
        <h2 className="no-photos">
         Não foram encontrados resultados para a sua busca...
        </h2>
      )}
    </div>
  )
}

export default Search