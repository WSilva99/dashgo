import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrently?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ number, isCurrently = false, onPageChange }: PaginationItemProps) {
  if (isCurrently) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="teal"
        disabled
        _disabled={{
          bg: "teal.500",
          cursor: "default"
        }}
      >
        {number}
      </Button>
    )
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}