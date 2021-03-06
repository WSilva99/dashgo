import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Props as apexchartsProps } from "react-apexcharts" 
// Apexchart needs Window, dynamic solve with lazy load, server-side-render false
const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

const chartConfig: apexchartsProps = {
  type: "area",
  width: 430,
  height: 200,
  options: {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      foreColor: theme.colors.gray['500']
    },
    grid: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray['600']
      },
      axisTicks: {
        color: theme.colors.gray['600']
      }
    },
    stroke: {
      colors: [
        theme.colors.teal['500']
      ]
    },
    fill: {
      colors: [
        theme.colors.teal['500']
      ],
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    }
  },
  series: [
    {
      name: "series1",
      data: [
        {
          x: new Date('2022-06-18T00:00:00.000Z'),
          y: 86
        },
        {
          x: new Date('2022-06-19T00:00:00.000Z'),
          y: 120
        },
        {
          x: new Date('2022-06-20T00:00:00.000Z'),
          y: 97
        },
        {
          x: new Date('2022-06-21T00:00:00.000Z'),
          y: 85
        }
      ]
    }
  ]
}

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="300px">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb={4}
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart {...chartConfig} />
          </Box>
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb={4}
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart {...chartConfig} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}