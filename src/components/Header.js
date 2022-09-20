import React, { useContext } from "react";
import dig from "object-dig";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { addTodo } from "../service/api";
const Header = () => {
  const currentUser = useContext(AuthContext);

  return (
    <Flex
      px={8}
      h="80px"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="teal.700"
    >
      <Box>
        <Heading as="h1" fontSize="xl" color="#fff">
          SlefCare
        </Heading>
      </Box>
      <Box>
        {dig(currentUser, "currentUser", "uid") ? (
          <Button onClick={logOut}>LogOut</Button>
        ) : (
          <Button onClick={signInWithGoogle}>LogIn</Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
