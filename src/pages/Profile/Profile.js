import './Profile.css';
import { uploads } from '../../utils/config'
import PulseLoader from 'react-spinners/PulseLoader';

// Components
import Message from '../../components/Message'
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, getUserPhotos, resetMessage, deletePhoto, updatePhoto } from '../../slices/photoSlice'

const Profile = () => {
  const {id} = useParams();

  const dispatch = useDispatch();

  const {user, loading} = useSelector((state) => state.user);
  const {user: userAuth} = useSelector((state) => state.auth);

  const {photos, loading: photoLoading, 
           message: photoMessage, error: photoErr } = useSelector((state) => state.photo);

  const[title, setTitle] = useState("");
  const[image, setImage] = useState("");

  const[editId, setEditId] = useState("")
  const[editImage, setEditImage] = useState("");
  const[editTitle, setEditTitle] = useState("");


  function refreshPage() {
    window.location.reload();
  }

  // New photo and editPhoto refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000);
  }
 
  const handleFile = (e) => {
    const image = e.target.files[0];
   
    // Send image from form to image useState 
    setImage(image);
  };

  // Show or hide forms
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  }

  const handleCancelEdit = (e) => {
    e.preventDefault();
    hideOrShowForms();
  };

  // Open edit photo
  const handleEdit = (photo) => {
    if(editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  // Update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    }
  
    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  };

  const submitHandle = (e) => {
    e.preventDefault();

  // Build a form data
  const photoData = {
    title,
    image
  };
  
  const formData = new FormData();

  const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));

  formData.append('photo', photoFormData);

  dispatch(publishPhoto(formData));

  setTitle("");

  resetComponentMessage();   
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id))

    setTimeout(() => {
     
      refreshPage();

      resetComponentMessage();
    }, 600);  
  };

  if(photoLoading) {
    return <PulseLoader/>
  }

  return (
    <div id='profile'>
        <div className="profile-header">
          {user.profileImage && (
            <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
          )}
          <div className="profile-description">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
          </div>
        </div>
        {id === userAuth._id && (
          <>
          <div className="new-photo" ref={newPhotoForm}>
          <h3>Compartilhe algum momento seu:</h3>
          <form onSubmit={submitHandle}>
            <label>
              <span>Título para a foto:</span>
              <input 
              type="text" 
              placeholder='Insira um título:'
              required
              minLength="3"        
              value={title || ""} 
              onChange={((e) => setTitle(e.target.value))} />
            </label>
            <label>
              <span>Imagem:</span>
              <input type="file" onChange={handleFile} />
            </label>
            {!photoLoading && <input type="submit" className='btn-submit' value='Postar' /> }
            {photoLoading && <PulseLoader className='loading' size={10} color="#0094f6" />}
          </form>
          </div>
          <div className='edit-photo hide' ref={editPhotoForm}>
            <p>Editando:</p>
            <form onSubmit={handleUpdate}>
             {editImage && (
                <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
              )}
              <input 
              type="text" 
              placeholder='Insira um título:'
              required
              minLength="3"        
              value={editTitle || ""} 
              onChange={((e) => setEditTitle(e.target.value))}/>
            <input type="submit" value='Atualizar' />
            <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar Edição</button>
          </form>
          </div>
          {photoErr && <Message msg={photoErr} type="error"/>}
          {photoMessage && <Message msg={photoMessage} type="sucess"/>}
          </>
        ) }
        <div className="user-photos">
          <h2>Fotos publicadas:</h2>
          <div className="photos-container">
            {photos && photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>)}
                {id === userAuth._id ? 
                (<div className='actions'>
                  <Link to={`/photos/${photo._id}`}>
                    <BsFillEyeFill />
                    
                  </Link>
                  <BsPencilFill onClick={() => handleEdit(photo)} />
                  <BsXLg onClick={() => handleDelete(photo._id)} />
                </div>) 
                : 
                (<Link className='btn' to={`/photos/${photo._id}`}>Ver</Link>)}
              </div>
            ))}
            {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
          </div>
        </div>
    </div>
  )
}

export default Profile