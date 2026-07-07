import { useEffect, useState } from "react";
import { Alert, Center, Loader, Text } from "@mantine/core";
import "./App.css";
import TweetField from "./components/TweetField";
import Tweet from "./components/Tweet";
import { fetchTweets, postTweet } from "./api";
import { sortTweets } from "./utils";

function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  function getTweets() {
    setLoading(true);
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
  }

  useEffect(() => {
    getTweets();
  }, []);

  function handleTweetSubmit(newTweet) {
    setAdding(true);
    setError("");

    postTweet(newTweet)
      .then(() => {
        getTweets();
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setAdding(false);
      });
  }

  return (
    <div className="container">
      {error && (
        <Alert color="red" title="Server Error" mb="md">
          {error}
        </Alert>
      )}

      {adding ? (
        <Center my="md">
          <Loader size="sm" mr="xs" />
          <Text size="sm">Adding new tweet...</Text>
        </Center>
      ) : (
        <TweetField handleTweetSubmit={handleTweetSubmit} />
      )}

      <div className="tweet-container">
        {loading ? (
          <Center my="xl">
            <Loader size="md" />
          </Center>
        ) : (
          tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              username={tweet.userName}
              date={tweet.date}
              content={tweet.content}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
