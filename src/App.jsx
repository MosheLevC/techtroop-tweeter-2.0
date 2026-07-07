import { useEffect, useState } from "react";
import "./App.css";
import TweetField from "./components/TweetField";
import Tweet from "./components/Tweet";

function App() {
  const [tweets, setTweets] = useState(() => {
    try {
      const storedTweets = localStorage.getItem("tweets");
      return storedTweets ? JSON.parse(storedTweets) : [];
    } catch (error) {
      console.error("Error parsing tweets from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tweets", JSON.stringify(tweets));
    } catch (error) {
      console.error("Error saving tweets to localStorage:", error);
    }
  }, [tweets]);

  return (
    <div className="container">
      <TweetField
        handleTweetSubmit={(newTweet) => {
          setTweets((prevTweets) => [newTweet, ...prevTweets]);
        }}
      />
      <div className="tweet-container">
        {tweets &&
          tweets.map((tweet) => (
            <Tweet key={tweet.id} username={tweet.userName} date={tweet.date} content={tweet.content} />
          ))}
      </div>
    </div>
  );
}

export default App;
