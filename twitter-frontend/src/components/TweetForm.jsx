import { useState } from 'react';
import axios from 'axios';

const TweetForm = ({ onTweetCreated }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    try {
      const res = await axios.post('/tweets', { content });
      onTweetCreated(res.data);
      setContent('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to post tweet');
    }
  };

  return (
    <div className="tweet-form">
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={280}
        />
        <div className="tweet-form-footer">
          <span className="char-count">{content.length}/280</span>
          <button type="submit" disabled={!content.trim()}>
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;
