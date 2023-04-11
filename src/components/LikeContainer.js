import './LikeContainer.css';

import PulseLoader from 'react-spinners/PulseLoader';
import {BsHeart, BsHeartFill} from 'react-icons/bs';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {getPhotoLikes} from "../slices/photoSlice"

import { useEffect, useState } from 'react';

import { useParams } from "react-router-dom";

import { debounce } from 'lodash';

const LikeContainer = ({photo, user, handleLike}) => {
  const {id} = useParams();
  
  const[photoLikes, setPhotoLikes]= useState("");

  const[wait, setWait] = useState(false);

  const dispatch = useDispatch();

  const {user: userAuth} = useSelector((state) => state.auth);
  const {likes} = useSelector((state) => state.photo);
  
  useEffect(() => {
    setPhotoLikes(likes)
    setWait(true)
    dispatch(getPhotoLikes(id))
    setWait(false)
    
    }, [likes, dispatch, id])


  return (    
    <div className='like'>
      <>
   {photoLikes.includes(userAuth._id) && !wait ? (
  <BsHeartFill color='red' onClick={() => {
    handleLike(photo, user._id); 
  }} />
) : (
  <BsHeart onClick={() => {
    handleLike(photo, user._id);
  }} />
  
)}
  <p>{photoLikes.length} {photoLikes.length > 1 ? 'likes' : 'like'}</p>
  </>
  </div>  
)
};

 

 
export default LikeContainer