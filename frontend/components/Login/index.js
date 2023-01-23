import { Box, Button, Heading, Image } from "@chakra-ui/react";
import React from "react";

export default function Login({ login }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="1440px"
      h="100vh"
      m="auto"
    >
      <Heading textAlign="center" color="#fff" fontSize={{base: "40px", md: "72px"}}>
        NEAR Quote
      </Heading>
      <Image
        src="https://www.pngall.com/wp-content/uploads/13/NFT-Art-PNG.png"
        w="auto"
        h={{base: "auto", md: "400px"}}
        my="6rem"
      />
      <Button onClick={login} color="#fff" bg="green" w="200px">
        Connect
      </Button>
    </Box>
  );
}
