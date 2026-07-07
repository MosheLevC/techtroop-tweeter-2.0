import { useState } from "react";
import { Button, Stack, TextInput, Title } from "@mantine/core";

const Profile = ({ currentUsername, onSave }) => {
  const [tempUsername, setTempUsername] = useState(currentUsername);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tempUsername.trim()) {
      onSave(tempUsername.trim());
    }
  };

  return (
    <Stack style={{ maxWidth: "400px", margin: "0 auto", marginTop: "40px" }} gap="md">
      <Title order={2}>Profile</Title>
      <form onSubmit={handleSubmit}>
        <Stack gap="sm">
          <TextInput
            label="Change Username"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            required
          />
          <Button type="submit">Save</Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Profile;
