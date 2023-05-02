import './LikeContainer.css';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { getPhotoLikesAll, like } from '../slices/photoSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResetComponentMessage } from "../hooks/useResetComponentMesssage"; 


const LikeContainerAll = ({ photos, likes, user, handleLike }) => {
    const { id } = useParams();
  
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPhotoLikesAll());
  
    }, [dispatch, id]);
  
    return (
      <div>
        {photos.map((photo) => (
          <div key={photo._id} className='like'>
            <>
              {likes[photo._id].includes(user._id) ? (
                <BsHeartFill
                  color='white'
                  onClick={() => {
                    handleLike(photo._id);
                  }}
                />
              ) : (
                <BsHeart
                  onClick={() => {
                    handleLike(photo._id);
                  }}
                />
              )}
                <p>  
                {likes[photo._id].length} {likes[photo._id].length > 1 ? 'likes' : 'like'}
              </p>
            </>
          </div>
        ))}
      </div>
    );
  };

  export default LikeContainerAll