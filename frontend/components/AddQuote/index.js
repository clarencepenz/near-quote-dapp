import { Box, Button, FormControl, FormHelperText, Text, Textarea } from "@chakra-ui/react";
import React from "react";

export default function AddQuote({quote, totalQuotes, onChange, loading, createQuote }) {
  return (
    <>
      <Text fontSize="28px" fontWeight="600" mb={4} color="#fff">
        Total Quotes: {totalQuotes}
      </Text>
      <Box display="flex" flexDirection="column">
        <FormControl>
          <Textarea
            type="text"
            name="quote"
            value={quote}
            onChange={onChange}
            errorBorderColor="crimson"
            placeholder="Enter Quote"
            color="#fff"
            borderColor="#717b7c"
          />
          {quote.length < 6 && (
            <FormHelperText color="red">Enter more words</FormHelperText>
          )}
        </FormControl>
        <Button
          isDisabled={quote.length < 6 && true}
          isLoading={loading}
          onClick={createQuote}
          bg="green"
          color="#fff"
          my={4}
        >
          Add
        </Button>
      </Box>
    </>
  );
}
