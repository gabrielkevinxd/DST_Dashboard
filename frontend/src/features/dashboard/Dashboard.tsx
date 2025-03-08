import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Button,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useBrowserTools } from '../../utils/browser-tools';

const Dashboard: React.FC = () => {
  const toast = useToast();
  const { debugState, measurePerformance, exportData, checkBrowserCompatibility } = useBrowserTools();
  const [statsData, setStatsData] = useState([
    { label: 'Dias Sobrevividos', value: 42, change: 5, increased: true },
    { label: 'Recursos Coletados', value: 1250, change: 12, increased: true },
    { label: 'Monstros Derrotados', value: 87, change: 3, increased: false },
    { label: 'Estruturas Construídas', value: 35, change: 8, increased: true }
  ]);
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');

  // Exemplo de uso do debugState ao inicializar o componente
  useEffect(() => {
    debugState(statsData, 'Estatísticas iniciais');
    
    // Verificar compatibilidade do navegador ao carregar o componente
    const compatibility = checkBrowserCompatibility();
    console.log('Compatibilidade do navegador:', compatibility);
  }, []);

  // Exemplo de uso do measurePerformance
  const processData = () => {
    const newData = measurePerformance(() => {
      // Simulando um processamento pesado
      const result = [...statsData];
      for (let i = 0; i < result.length; i++) {
        result[i] = { 
          ...result[i], 
          value: Math.floor(result[i].value * (1 + Math.random() * 0.2)),
          change: Math.floor(Math.random() * 15),
          increased: Math.random() > 0.3
        };
      }
      return result;
    }, 'Processamento de estatísticas');
    
    setStatsData(newData);
    
    toast({
      title: 'Dados atualizados',
      description: 'As estatísticas foram atualizadas com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Exemplo de uso do exportData
  const handleExportData = () => {
    const success = exportData(statsData, 'dst-estatisticas.json');
    
    if (success) {
      toast({
        title: 'Exportação concluída',
        description: 'Os dados foram exportados com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading mb={6}>Dashboard</Heading>
      
      <Box mb={4}>
        <Button colorScheme="blue" mr={3} onClick={processData}>
          Atualizar Dados
        </Button>
        <Button colorScheme="green" onClick={handleExportData}>
          Exportar Estatísticas
        </Button>
      </Box>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        {statsData.map((stat, index) => (
          <Box 
            key={index} 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="lg"
            bg={cardBg}
            borderColor={cardBorder}
          >
            <Stat>
              <StatLabel fontSize="md">{stat.label}</StatLabel>
              <StatNumber fontSize="2xl">{stat.value}</StatNumber>
              <StatHelpText>
                <StatArrow type={stat.increased ? 'increase' : 'decrease'} />
                {stat.change}%
              </StatHelpText>
            </Stat>
          </Box>
        ))}
      </SimpleGrid>

      <Box 
        p={5} 
        shadow="md" 
        borderWidth="1px" 
        borderRadius="lg"
        bg={cardBg}
        borderColor={cardBorder}
        mb={8}
      >
        <Heading size="md" mb={4}>Gráfico de Progresso</Heading>
        <Text>Aqui será implementado um gráfico de progresso usando Recharts</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box 
          p={5} 
          shadow="md" 
          borderWidth="1px" 
          borderRadius="lg"
          bg={cardBg}
          borderColor={cardBorder}
        >
          <Heading size="md" mb={4}>Recursos Disponíveis</Heading>
          <Text>Aqui será implementada uma lista de recursos disponíveis</Text>
        </Box>
        <Box 
          p={5} 
          shadow="md" 
          borderWidth="1px" 
          borderRadius="lg"
          bg={cardBg}
          borderColor={cardBorder}
        >
          <Heading size="md" mb={4}>Próximos Objetivos</Heading>
          <Text>Aqui será implementada uma lista de objetivos a cumprir</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;