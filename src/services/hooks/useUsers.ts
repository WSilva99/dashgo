import { Options } from "next/dist/server/base-server";
import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../axios/api";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

type GetUsersResponse = {
  totalOfRegisters: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page
    }
  });
  const totalOfRegisters = Number(headers['x-total-count']);
  const users: User[] = data.users.map((user): User => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
  })
  return {
    totalOfRegisters,
    users
  }
}

export function useUsers(page: number, options?: UseQueryOptions) {
  let optionsQuery = {}
  if(!!options) {
    optionsQuery = {
      ...options,
      initialData: options['initialData'] as GetUsersResponse
    }
  }

  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutos
    ...optionsQuery
  })
}