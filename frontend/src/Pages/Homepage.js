import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Container maxW="x1" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        textAlign="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Text fontSize="4x1" fontFamily="Work sans" color="black">
          Talk-A-Tive
        </Text>
      </Box>
      <Box></Box>
    </Container>
  );
};

export default Homepage;
