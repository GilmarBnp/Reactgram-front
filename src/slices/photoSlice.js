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

    if(data.errors) {
      console.log(data.errors);
    };
   
    return data;
  }
);

// Get a photo by id
export const getPhoto = createAsyncThunk(
  "photo/getphoto", 
  async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhoto(id, token);

    if(data.errors) {
      console.log(data.errors);
    };

    return data;
  });

  // Get a photo likes by id
export const getPhotoLikes = createAsyncThunk("photo/getphotolikes", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhotoLikes(id, token);

    //console.log(data?.errors);

    return data;
  });

  // Get all photos likes
export const getPhotoLikesAll = createAsyncThunk("photo/getphotolikesall", async(_, thunkAPI) => {

  const data = await photoService.getPhotoLikesAll();

  //console.log(data?.errors);

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

// Add a comment to a photo
export const comment = createAsyncThunk("photo/comment",async(commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.comment({comment: commentData.comment},commentData.id, token);

    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

// Get All Photos
export const getAllPhotos = createAsyncThunk("photo/getall", async(_, thunkAPI)=> {
  const token = thunkAPI.getState().auth.user.token;
  const data = await photoService.getAllPhotos(token);

  return data;
});

// Search photo by title
export const searchPhotos = createAsyncThunk("photo/search", 
async (query, thunkAPI) => {

  const token = thunkAPI.getState().auth.user.token;
  const data = await photoService.searchPhotos(query, token);

  return data;
});

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
        resetState: (state) => {
          state.photo = '';
          state.likes = '';
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
          .addCase(getPhotoLikesAll.pending, (state) => {
            state.loading = true;
            state.error = null;
       
          })
          .addCase(getPhotoLikesAll.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.likesAll = action.payload.photoAllLikes;
          })
          .addCase(getPhotoLikesAll.rejected, (state, action) => {
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
            state.message = action.payload.message          
          })
          .addCase(like.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(comment.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(comment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo.comments.push(action.payload.comment);
            state.message = action.payload.message;
          })
          .addCase(comment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = null;
          })
          .addCase(getAllPhotos.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getAllPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
          })
          .addCase(searchPhotos.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(searchPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
          })
        }
});

export const {resetMessage, resetState} = photoSlice.actions;
export default photoSlice.reducer;