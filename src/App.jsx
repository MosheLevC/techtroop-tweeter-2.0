import { useEffect, useState } from "react";
import { Alert, Center, Loader, Text } from "@mantine/core";
import "./App.css";
import TweetField from "./components/TweetField";
import Tweet from "./components/Tweet";

const API_URL = "https://njdihbyxnbavdjygtdep.supabase.co/rest/v1/Tweets";
const API_KEY = "sb_publishable_fqIGoUk5BoNDCrYSnzRWxQ_f2a88xs1";

function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  function getTweets() {
    setLoading(true);
    fetch(`${API_URL}?select=*`, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load tweets from server");
        }
        return res.json();
      })
      .then((data) => {
        const sortedTweets = data.sort((a, b) => new Date(b.date) - new Date(a.date));
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

    fetch(API_URL, {
      method: "POST",
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newTweet.content,
        userName: newTweet.userName,
        date: newTweet.date,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add tweet to server");
        }
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
