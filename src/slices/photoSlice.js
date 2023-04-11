import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import photoService from '../services/photoService'


const initialState = {
    photos: [],
    photo: {},
    error: false,
    sucess: false,
    loading: false,
    message: null,
    likes: [],
}

export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async(photo, thunkAPI) => {
      const token = thunkAPI.getState().auth.user.token;

      const data = await photoService.publishPhoto(photo, token);

      // Check for error
      if(data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }
      return data;
    }
);

// Get user photos
export const getUserPhotos = createAsyncThunk(
  "photo/userphotos",
  async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getUserPhotos(id, token);

    console.log(data.errors);

    return data;
  }
);

// Get a photo by id
export const getPhoto = createAsyncThunk(
  "photo/getphoto", 
  async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhoto(id, token);

    console.log(data.errors);

    return data;
  });

  // Get a photo likes by id
export const getPhotoLikes = createAsyncThunk(
  "photo/getphotolikes", 
  async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhotoLikes(id, token);

    console.log(data?.errors);
    
    

    return data;
  });

export const updatePhoto = createAsyncThunk(
  "photo/update",
  async(photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.updatePhoto(
      {title: photoData.title},
      photoData.id, token
      );

      // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }  
);
// Like a photo
export const like = createAsyncThunk("photo/like", async(id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  //await new Promise(resolve => setTimeout(resolve, 1000));

  const data = await photoService.like(id, token);

  return data;
});




export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.deletePhoto(id, token);

    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(publishPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
            state.photos.unshift(state.photo);
            state.message = "foto publicada com sucesso!"
          })
          .addCase(publishPhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
          })
          .addCase(getUserPhotos.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUserPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
          })
          .addCase(deletePhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deletePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photos = state.photos.filter((photo) => {
              return photo._id !== action.payload.id
            })

            state.message = action.payload.message;
          
          })
          .addCase(deletePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
          })
          .addCase(updatePhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updatePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photos.map((photo) => {
              if (photo._id === action.payload.photo._id) {
                return (photo.title = action.payload.photo.title);
              }
              return photo;
            });
    
            state.message = action.payload.message;
          
          })
          .addCase(updatePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = null;
          })
          .addCase(getPhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
          })
          .addCase(getPhotoLikes.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getPhotoLikes.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.likes = action.payload;
          })
          .addCase(getPhotoLikes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(like.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(like.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
       
            state.photos.map((photo) => {
              if (photo._id === action.payload.photoId) {
                return photo.likes.push(action.payload.userId);
              }
              return photo;
            });      
          })
          .addCase(like.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        }
});

export const {resetMessage} = photoSlice.actions;
export default photoSlice.reducer;


