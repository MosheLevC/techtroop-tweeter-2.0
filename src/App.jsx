import { useEffect, useState } from "react";
import "./App.css";
import TweetField from "./components/TweetField";
import Tweet from "./components/Tweet";

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const storedTweets = localStorage.getItem("tweets");
    if (storedTweets) {
      setTweets(JSON.parse(storedTweets));
    }
  }, []);

  return (
    <div className="container">
      <TweetField />
      <div className="tweet-container">
        {tweets &&
          tweets
            .reverse()
            .map((tweet) => (
              <Tweet key={tweet.id} username={tweet.userName} date={tweet.date} content={tweet.content} />
            ))}
      </div>
    </div>
  );
}

export default App;
