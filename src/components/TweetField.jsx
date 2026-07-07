import { Button, Group, Text, Textarea } from "@mantine/core";
import { useState } from "react";

const TweetField = () => {
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
        <Group justify="space-between" style={{ width: "100%" }}>
          <Text size="xs" c={value.length > maxLength ? "red" : "dimmed"}>
            {value.length}/{maxLength} characters
          </Text>
          <Button
            variant="filled"
            disabled={value.length === 0 || value.length > maxLength}
            onClick={() => {}}
          >
            Tweet
          </Button>
        </Group>
      }
    />
  );
};

export default TweetField;
