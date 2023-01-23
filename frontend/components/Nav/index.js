import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Nav({ account, onClick }) {
  return (
    <Flex bg="black" w="full" p={4} justifyContent="center" alignItems="center">
      <Text flex={1} color="#fff" fontWeight="700" fontSize={{base: '20px', md:"30px"}} whiteSpace="nowrap">
        NEAR <Text display={{base: 'none', md: "inline-block"}}>Quote</Text>
      </Text>
      <Text color="#fff" fontWeight="600" mx={6}>
        {account}
      </Text>
      <Button className="link" bg="red" color="#fff" whiteSpace="nowrap" onClick={onClick}>
        Disconnect
      </Button>
    </Flex>
  );
}
