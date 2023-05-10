import './LikeContainer.css';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const LikeContainerAll = ({ photos, likes, user, handleLike }) => {
    
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