import { Avatar, Box, Stack, Text } from "@chakra-ui/react";

const UserList = ({ user,handleFunction }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="1em"
      marginTop="1em"
      backgroundColor="teal"
      color="white"
      padding="1em"
      borderRadius="8px"
      onClick={handleFunction}
      cursor="pointer"
    >
      <Avatar name={user.name} src={user.photo} size={"sm"} />
      <Stack spacing={1}>
        <Text fontSize="sm" as="b" textTransform="capitalize">
          {user.name}
        </Text>
        <Text fontSize="sm">{user.email}</Text>
      </Stack>
    </Box>
  );
};

export default UserList;
