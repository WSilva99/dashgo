import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  siblingsPages?: number;
  onPageChange: (page: number) => void;
}

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => from + index + 1).filter(page => page > 0);
}

export function Pagination({ totalCountOfRegisters, registerPerPage = 10, currentPage = 1, siblingsPages = 1, onPageChange }: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);
  const previousPages = currentPage > 1 ? generatePagesArray(currentPage - siblingsPages - 1, currentPage - 1) : [];
  const nextPages = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsPages, lastPage)) : [];
  
  return (
    <Stack direction={["column", "row"]} mt="8" spacing="6" justify="space-between" align="center">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>30</strong>
      </Box>
      <HStack spacing="2">
        { currentPage > (1 + siblingsPages) && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            { currentPage > (2 + siblingsPages) && (
              <Text color="gray.300" w="8" textAlign="center">...</Text> 
            )}
          </>
        )}
        
        { previousPages.length > 0 && previousPages.map(page => (
            <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        ))}
        
        <PaginationItem isCurrently={true} number={currentPage} onPageChange={onPageChange} />
        
        { nextPages.length > 0 && nextPages.map(page => (
          <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        ))}
        
        { (currentPage + siblingsPages) < lastPage && (
          <>
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
            { (currentPage + 1 + siblingsPages) < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">...</Text> 
            )}
          </>
        )}
      </HStack>
    </Stack>
  )
}