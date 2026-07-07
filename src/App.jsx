import { useContext, useState } from "react";
import { Alert, Center, Loader, Text, Paper, Group, Button } from "@mantine/core";
import "./App.css";
import TweetField from "./components/TweetField";
import Tweet from "./components/Tweet";
import Profile from "./components/Profile";
import { TweetsContext } from "./context/TweetsContext";

const App = () => {
  const { tweets, loading, adding, error } = useContext(TweetsContext);
  const [currentPage, setCurrentPage] = useState("home");
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "Anonymous";
  });

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
        className="navbar"
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
              <TweetField username={username} />
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
