import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { makeServer } from '../services/mirage'
import { queryClient } from '../services/queryClient/queryClient'

if(process.env.NODE_ENV === 'development') {
  makeServer({environment: "development"});
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
