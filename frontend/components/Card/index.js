import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import DateUtil from "../../utils";
import DeleteModal from "../Modal";

export default function CardContainer({
  author,
  item,
  loading,
  tipAuthor,
  deleteQuote,
  refresh
}) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      my={6}
      border="none"
      bg="blackAlpha.600"
      boxShadow="xl"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack w="full">
        <CardBody>
          <Text fontSize="18px" fontWeight="500" py="1" color="#fff">
            {item.author}
          </Text>
          <Text fontSize="14px" fontWeight="500" color="grey">
            {DateUtil(item.created_at)}
          </Text>
          <Text
            fontSize="20px"
            fontWeight="500"
            textTransform="capitalize"
            py="2"
            color="#fff"
          >
            {item.text}
          </Text>
        </CardBody>

        <CardFooter
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={4}
        >
          <Box flex={1}>
            <Badge variant="solid" colorScheme="green">
              {item.tip_count} Tips
            </Badge>
          </Box>
          <Button onClick={tipAuthor} bg="blue" color="#fff">
            Tip 1NEAR
          </Button>
          {author === item.author && (
            <DeleteModal
              text={item.text}
              deleteQuote={deleteQuote}
              isDisabled={loading === true ? true : false}
              isLoading={loading}
              refresh={refresh}
            />
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
}
