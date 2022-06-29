import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true}: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>
            Walmir Silva
          </Text>
          <Text color="gray.300" fontSize="small">
            walmirsilva305@gmail.com
          </Text>
        </Box>
      ) }
      <Avatar size="md" name="Walmir Silva" src="https://avatars.githubusercontent.com/u/69635394?v=4" />
    </Flex>
  )
}