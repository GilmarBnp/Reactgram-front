import React from 'react'
import './EditProfile.css'
import PulseLoader from 'react-spinners/PulseLoader';

import { uploads } from '../../utils/config';

// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { profile, resetMessage, updateProfile } from   '../../slices/userSlice'

// Components
import Message from '../../components/Message'

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user)

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[profileImage, setProfileImage] = useState("");
  const[bio, setBio] = useState("");
  const[previewImage, setPreviewImage] = useState("");
  const[gender, setGender]= useState("");

  // Load user data
  useEffect(()=> {
    dispatch(profile()); 
  },[dispatch]);
  
  // Fill for with user data
  useEffect(() => {
  
  if(user) {
    setName(user.name);
    setEmail(user.email);
    setBio(user.bio);
    setGender(user.gender);
   }

  },[user])

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Gather user data
    const userData = {
      name,
    }

    if(profileImage) {
      userData.profileImage = profileImage;
    }
 
    if(bio) {
      userData.bio = bio;
    }

    if(password) {
      userData.password = password;
    }

    // Build a form data
    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData))

    setTimeout(()=> {
      dispatch(resetMessage())
    }, 2000)

  };

  const handleFile = (e) => {
    // Image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // Update image state
    setProfileImage(image)
  }

    return (
    <div id='edit-profile'>
        <h2>Edite os seus dados</h2>
        <p className="subtitle">
          Adicione uma imagem de perfil
        </p>
         {(user.profileImage || previewImage) && (
          <img className = 'profile-image' 
          src={previewImage 
            ? URL.createObjectURL(previewImage)
            : `${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <form onSubmit={handleSubmit}>
            <span className='labe-span'>Nome:</span>
            <input type="text" 
                   placeholder='Nome' 
                   onChange={(e)=> setName(e.target.value)} 
                   value={name || ""}/>
            <span className='labe-span'>Email:</span>
            <input type="text"
                   placeholder='E-mail'
                   className='email-input' 
                   disabled 
                   value={email || ""}/>
            <label>
                <span className='labe-span'>Imagem do perfil:</span>
                <input id='file' 
                       type="file" 
                       className='file' 
                       placeholder='Enviar arquivo'
                       onChange={handleFile}/>
            </label>
            <label>
                <span className='labe-span'>Bio:</span>
                <input type="text" 
                       placeholder='Descrição do perfil' 
                       onChange={(e)=> setBio(e.target.value)} 
                       value={bio || ""} />
            </label>
            <label>
            <span className='labe-span'>Sexo:</span>
            <input type="text" 
                   disabled 
                   value={gender || ""}/>
            </label>
           <label >
            <span className='labe-span'>Alterar a senha</span>
            <input type="password" 
                   placeholder='Digite a sua nova senha' 
                   onChange={(e)=> setPassword(e.target.value)} 
                   value={password || ""} />
           </label>
           {!loading && <input type="submit" value="Atualizar" />}
           {loading && <PulseLoader className='loading' size={10} color="#0094f6" />}
           {error && <Message msg= {error} type="error"/>}
           {message && <Message msg= {message} type="sucess"/>}
        </form>
    </div>
  )
}

export default EditProfile