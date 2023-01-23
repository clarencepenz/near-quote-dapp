import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function Notification({message}) {
  return (
    <Box position="relative" top="2rem" right={0}>
      <Text color="gold">✔ {message}</Text>
    </Box>
  )
}
