import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Nav({ account, onClick }) {
  return (
    <Flex bg="black" w="full" p={6} justifyContent="center" alignItems="center">
      <Text flex={1} color="#fff" fontWeight="600" fontSize="30px">
        NEAR Quote
      </Text>
      <Text color="#fff" fontWeight="600" mx={6}>
        {account}
      </Text>
      <Button className="link" bg="red" color="#fff" onClick={onClick}>
        Disconnect
      </Button>
    </Flex>
  );
}
