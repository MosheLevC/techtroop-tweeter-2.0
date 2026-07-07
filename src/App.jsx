import { useEffect, useState } from "react";
import { Alert, Center, Loader, Text, Paper, Group, Button } from "@mantine/core";
import "./App.css";
import TweetField from "./components/TweetField";
import Tweet from "./components/Tweet";
import Profile from "./components/Profile";
import { fetchTweets, postTweet } from "./api";
import { sortTweets } from "./utils";

const App = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "Anonymous";
  });

  const getTweets = () => {
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
  };

  useEffect(() => {
    getTweets();
  }, []);

  const handleTweetSubmit = (newTweet) => {
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
  };

  const handleSaveUsername = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
    setCurrentPage("home");
  };

  return (
    <div>
      <Paper
        withBorder
        p="md"
        style={{
          position: "sticky",
          top: 0,
          marginBottom: "20px",
        }}
      >
        <Group>
          <Button
            variant={currentPage === "home" ? "light" : "subtle"}
            onClick={() => setCurrentPage("home")}
          >
            Home
          </Button>
          <Button
            variant={currentPage === "profile" ? "light" : "subtle"}
            onClick={() => setCurrentPage("profile")}
          >
            Profile
          </Button>
        </Group>
      </Paper>

      <div className="container">
        {error && (
          <Alert color="red" title="Server Error" mb="md">
            {error}
          </Alert>
        )}

        {currentPage === "home" ? (
          <>
            {adding ? (
              <Center my="md">
                <Loader size="sm" mr="xs" />
                <Text size="sm">Adding new tweet...</Text>
              </Center>
            ) : (
              <TweetField handleTweetSubmit={handleTweetSubmit} username={username} />
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
          </>
        ) : (
          <Profile currentUsername={username} onSave={handleSaveUsername} />
        )}
      </div>
    </div>
  );
};

export default App;
