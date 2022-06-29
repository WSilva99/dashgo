import { Box, HStack, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

export function Pagination() {
  return (
    <Stack direction={["column", "row"]} mt="8" spacing="6" justify="space-between" align="center">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>30</strong>
      </Box>
      <HStack spacing="2">
        <PaginationItem isCurrently={true} number={1} />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
      </HStack>
    </Stack>
  )
}