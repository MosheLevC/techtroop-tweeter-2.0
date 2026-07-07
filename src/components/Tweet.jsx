import { Group, Paper, Text } from "@mantine/core";

const Tweet = ({ username, date, content }) => {
  return (
    <Paper shadow="xs" p="lg" bg="gray.8" display="flex" style={{ flexWrap: "wrap", marginBottom: "10px" }}>
      <Group justify="space-between" style={{ width: "100%" }}>
        <Text size="xs" c="dimmed">
          {username}
        </Text>
        <Text size="xs" c="dimmed">
          {date}
        </Text>
      </Group>
      <Text size="xs" c="white" style={{ marginTop: "10px" }}>
        {content}
      </Text>
    </Paper>
  );
};

export default Tweet;
