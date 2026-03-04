import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TweetForm from '../components/TweetForm';
import TweetCard from '../components/TweetCard';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const res = await axios.get('/tweets');
      setTweets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };

  const handleDelete = (tweetId) => {
    setTweets(tweets.filter(t => t._id !== tweetId));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home">
      <div className="home-header">
        <h2>Home</h2>
      </div>
      <TweetForm onTweetCreated={handleNewTweet} />
      <div className="tweets-list">
        {tweets.map(tweet => (
          <TweetCard 
            key={tweet._id} 
            tweet={tweet} 
            onDelete={handleDelete}
            currentUserId={user?._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
