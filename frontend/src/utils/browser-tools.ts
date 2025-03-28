/**
 * Utilitário para integração com browser-tools-mcp no frontend
 */

import { browserTools } from '../../../browser-tools-mcp';

/**
 * Hook personalizado para usar as ferramentas do navegador em componentes React
 */
export const useBrowserTools = () => {
  // Função para depurar o estado de um componente
  const debugState = (state: any, label?: string) => {
    if (process.env.NODE_ENV === 'development') {
      if (label) {
        console.group(`Estado do Componente: ${label}`);
      }
      browserTools.executeTool('debugState', state);
      if (label) {
        console.groupEnd();
      }
    }
    return state;
  };

  // Função para medir a performance de uma operação
  const measurePerformance = <T>(fn: () => T, label?: string): T => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Iniciando medição${label ? `: ${label}` : ''}...`);
      return browserTools.executeTool('measurePerformance', fn);
    }
    return fn();
  };

  // Função para exportar dados
  const exportData = (data: any, filename?: string): boolean => {
    return browserTools.executeTool('exportData', data, filename);
  };

  // Função para verificar a compatibilidade do navegador
  const checkBrowserCompatibility = () => {
    return browserTools.executeTool('checkBrowserCompatibility');
  };

  return {
    debugState,
    measurePerformance,
    exportData,
    checkBrowserCompatibility,
    // Acesso direto às ferramentas originais
    browserTools
  };
};

/**
 * Exemplo de uso em um componente React:
 * 
 * import { useBrowserTools } from '../utils/browser-tools';
 * 
 * const MyComponent = () => {
 *   const { debugState, measurePerformance, exportData } = useBrowserTools();
 *   const [data, setData] = useState([]);
 * 
 *   useEffect(() => {
 *     // Depurar o estado atual
 *     debugState(data, 'Dados iniciais');
 *     
 *     // Medir a performance de uma operação
 *     const processedData = measurePerformance(() => {
 *       return data.map(item => ({ ...item, processed: true }));
 *     }, 'Processamento de dados');
 *     
 *     setData(processedData);
 *   }, []);
 * 
 *   const handleExport = () => {
 *     exportData(data, 'meus-dados.json');
 *   };
 * 
 *   return (
 *     <div>
 *       {/* ... */}
 *       <button onClick={handleExport}>Exportar Dados</button>
 *     </div>
 *   );
 * };
 */