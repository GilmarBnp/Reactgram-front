import { api, requestConfig } from '../utils/config'

// Publish an user photo
const publishPhoto = async(data, token, ) => {
    const config = requestConfig("POST", data, token, true);

    try {
        const res = await fetch(api + "/photos", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        
        console.log(error);
    }
};

// Update a photo
const updatePhoto = async(data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
      const res = await fetch(api + "/photos/" + id, config)
       .then((res) => res.json())
       .catch((err) => err);

    return res;
    } catch (error) {
        console.log(error);
    }
};

// Get user photo
const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + '/photos/user/' + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
    
        console.log(error)
    }
};

// Get a photo by id
const getPhoto = async(id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/" + id, config)
        .then((res) => res.json())
        .catch((err) => err)

        return res;
    } catch (error) {
        console.log(error);
    };

};

// Get a photo likes by id
const getPhotoLikes = async(id) => {
    const config = requestConfig("GET", null);

    try {
        const res = await fetch(api + "/photos/likes/" + id, config)
        .then((res) => res.json())
        .catch((err) => err)

        return res;
    } catch (error) {
        console.log(error);
    };

};

const deletePhoto = async(id, token)=> {
    const config = requestConfig("DELETE", null, token);

    try {
        const res = await fetch(api + '/photos/' + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    };
};

// Like a photo
const like = async(id, token) => {
    const config = requestConfig("PUT", null, token);
    try {
        // Wait for 1 second before sending the request
        //await new Promise(resolve => setTimeout(resolve, 500));
    
        const res = await fetch(api + "/photos/like/" + id, config)
          .then((res) => res.json())
          .catch((err) => err);
    
        return res;
      } catch (error) {
        console.log(error)
      };   
};

// Add comment to a photo
const comment = async(data, id, token) => {
    const config = requestConfig('PUT', data, token);

    try {
        const res = await fetch(api + '/photos/comment/' + id, config)
        .then((res) => res.json())
        .catch((err) => err)

        return res;
    } catch (error) {
        console.log(error);
    };
};

// Get all photos
const getAllPhotos=async(token)=> {
    
    const config = requestConfig("GET", null, token);

    try {
        
        const res = fetch(api + "/photos", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    };
};

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    getPhotoLikes,
    comment,
    getAllPhotos
};

export default photoService;

