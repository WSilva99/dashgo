import { Box, Button, Checkbox, Flex, Heading, Icon, Link as ChakraLink, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useState } from "react"
import { RiAddLine, RiPencilLine, RiRefreshLine } from "react-icons/ri"
import { Header } from "../../components/Header"
import { Pagination } from "../../components/Pagination"
import { Sidebar } from "../../components/Sidebar"
import { api } from "../../services/axios/api"
import { getUsers, useUsers } from "../../services/hooks/useUsers"
import { queryClient } from "../../services/queryClient/queryClient"

export default function UserList({initialDataValues}) {
  const [ page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useUsers(page, { initialData: initialDataValues});

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    }, {
      staleTime: 1000 * 60 * 20 // 20 minutos
    })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="noraml">
              Usuários
              {/* { !isLoading && isFetching && <Spinner size="sm" color="blue.500" ml="4" /> } */}
            </Heading>

            <Flex gap="4" align="center">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={
                  <Icon
                    as={RiRefreshLine}
                    fontSize="20"
                  />
                }
                isLoading={!isLoading && isFetching}
                onClick={() => refetch()}
              >
                Atualizar lista
              </Button>

              {/* Para aparecer o link em baixo no navegador */}
              <Link href="/users/create" passHref> 
                <Button as="a" size="sm" fontSize="sm" colorScheme="teal" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                  Criar novo
                </Button>
              </Link>

            </Flex>

          </Flex>

          { isLoading ? (
            <Flex align="center" justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex align="center" justify="center">
              <Text>Falha ao carregar os usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="teal" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  { data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                          <Td px={["4", "4", "6"]}>
                            <Checkbox colorScheme="teal" />
                          </Td>
                          <Td>
                            <Box>
                              <ChakraLink onMouseEnter={() => handlePrefetchUser(String(user.id))}>
                                <Text fontWeight="bold">{user.name}</Text>
                              </ChakraLink>
                              <Text fontSize="sm" color="gray.300">{user.email}</Text>
                            </Box>
                          </Td>
                          {isWideVersion && <Td> {user.created_at}</Td>}
                          <Td>
                            {isWideVersion && (
                              <Button as="a" size="sm" fontSize="sm" colorScheme="yellow" leftIcon={<Icon as={RiPencilLine} />}>
                                Editar
                              </Button>
                            )}
                            {!isWideVersion && (
                              <Button as="a" size="sm" fontSize="sm" colorScheme="yellow">
                                <Icon as={RiPencilLine} />
                              </Button>
                            )}
                          </Td>
                        </Tr>
                    )
                  }) }
                </Tbody>
              </Table >
              <Pagination totalCountOfRegisters={data.totalOfRegisters} currentPage={page} onPageChange={setPage} />
            </>
          )}
        </Box >
      </Flex >
    </Box >
  )
}

// Server-side Props Not Working

// export const getServerSideProps: GetServerSideProps = async () => {
//   let {totalOfRegisters, users} = await getUsers(1);

//   return {
//     props: {
//       initialDataValues: {
//         totalOfRegisters,
//         users
//       }
//     }
//   }
// }