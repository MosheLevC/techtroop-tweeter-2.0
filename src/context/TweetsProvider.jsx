import { useEffect, useState } from "react";
import { fetchTweets, postTweet } from "../api";
import { sortTweets } from "../utils";
import { TweetsContext } from "./TweetsContext";

export const TweetsProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const getTweets = () => {
    fetchTweets()
      .then((data) => {
        const sortedTweets = sortTweets(data);
        setTweets(sortedTweets);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTweets();
    const interval = setInterval(getTweets, 5000);
    return () => clearInterval(interval);
  }, []);

  const createTweet = (newTweet) => {
    setAdding(true);
    setError("");

    return postTweet(newTweet)
      .then(() => {
        setTweets((prevTweets) => sortTweets([newTweet, ...prevTweets]));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setAdding(false);
      });
  };

  return (
    <TweetsContext.Provider
      value={{
        tweets,
        loading,
        adding,
        error,
        createTweet,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
};
