import './LikeContainer.css';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotoLikes, like, getPhoto } from '../slices/photoSlice';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useResetComponentMessage } from "../hooks/useResetComponentMesssage"; 

const LikeContainer = ({ photo, user }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user: userAuth, likes } = useSelector((state) => ({
    user: state.auth.user,
    likes: state.photo.likes,
  }));

  const resetMessage = useResetComponentMessage(dispatch);

  const [isLiking, setIsLiking] = useState(false);

  const photoLikes = useMemo(() => likes, [likes]);

  useEffect(() => {
    dispatch(getPhoto(id))

  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getPhoto(id))
    dispatch(getPhotoLikes(id));

  }, [dispatch, id]);

  const handleLike = async () => {
    if (isLiking) {
      return;
    }
    setIsLiking(true);
    try {
      await dispatch(like(photo._id));
      
      dispatch(getPhotoLikes(id));
      
      resetMessage();
    } catch (error) {
      
      console.log(error);
      resetMessage();
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className='like'>
      <>
        {photoLikes.includes(userAuth._id) ? (
          <BsHeartFill
            color='white'
            onClick={() => {
              handleLike(photo, user._id);
            }}
          />
        ) : (
          <BsHeart
            onClick={() => {
              handleLike(photo, user._id);
            }}
          />
        )}
        <div>
        <p className='likess'>  
          {photoLikes.length} {photoLikes.length > 1 ? 'likes' : 'like'}
        </p>
        </div>
         
      </>
    </div>
  );
};

export default LikeContainer;