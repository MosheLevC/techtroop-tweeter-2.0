import { useContext, useState } from "react";
import { Button, Group, Text, Textarea } from "@mantine/core";
import { TweetsContext } from "../context/TweetsContext";

const TweetField = ({ username }) => {
  const { createTweet } = useContext(TweetsContext);
  const maxLength = 140;
  const [value, setValue] = useState("");

  return (
    <Textarea
      placeholder="what's on your mind..."
      minRows={4}
      value={value}
      autosize
      onChange={(e) => setValue(e.currentTarget.value)}
      styles={{
        input: {
          paddingBottom: "50px",
        },
        bottomSection: {
          bottom: "10px",
        },
      }}
      bottomSection={
        <Group justify="space-between" flex={1}>
          <Text size="xs" c={value.length > maxLength ? "red" : "dimmed"}>
            {value.length}/{maxLength} characters
          </Text>
          <Button
            variant="filled"
            disabled={!value.trim() || value.length > maxLength}
            onClick={() => {
              createTweet({
                id: crypto.randomUUID(),
                content: value.trim(),
                userName: username,
                date: new Date().toISOString(),
              });
              setValue("");
            }}
          >
            Tweet
          </Button>
        </Group>
      }
    />
  );
};

export default TweetField;
