import { Text, Textarea } from "@mantine/core";
import { useState } from "react";

const TweetField = () => {
  const maxLength = 140;
  const [value, setValue] = useState("");

  return (
    <Textarea
      placeholder="what's on your mind..."
      minRows={4}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value.slice(0, maxLength))}
      bottomSection={
        <Text size="xs" c="dimmed">
          {value.length}/{maxLength} characters
        </Text>
      }
    />
  );
};

export default TweetField;
