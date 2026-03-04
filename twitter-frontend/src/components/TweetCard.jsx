import { useState } from 'react';
import axios from 'axios';

const TweetCard = ({ tweet, onDelete, currentUserId }) => {
  const [likes, setLikes] = useState(tweet.likes?.length || 0);
  const [liked, setLiked] = useState(tweet.likes?.includes(currentUserId));

  const handleLike = async () => {
    try {
      const res = await axios.post(`/tweets/like/${tweet._id}`);
      setLikes(res.data.likes);
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this tweet?')) return;
    try {
      await axios.delete(`/tweets/${tweet._id}`);
      onDelete(tweet._id);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="tweet-card">
      <div className="tweet-header">
        <div className="tweet-user">
          <div className="avatar">{tweet.user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div className="user-name">{tweet.user?.name}</div>
            <div className="tweet-date">{formatDate(tweet.createdAt)}</div>
          </div>
        </div>
        {currentUserId === tweet.user?._id && (
          <button className="delete-btn" onClick={handleDelete}>×</button>
        )}
      </div>
      <div className="tweet-content">{tweet.content}</div>
      <div className="tweet-actions">
        <button 
          className={`like-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          ♥ {likes}
        </button>
      </div>
    </div>
  );
};

export default TweetCard;
