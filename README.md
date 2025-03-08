# DST_Dashboard

Dashboard para visualização de dados do Don't Starve Together

## Sobre o Projeto

Este projeto é um dashboard interativo para visualização e análise de dados do jogo Don't Starve Together. Ele permite aos jogadores acompanhar estatísticas, gerenciar recursos e otimizar suas estratégias de jogo.

## Status do Projeto

- [x] Estrutura básica do monorepo
- [x] Configuração do ambiente de desenvolvimento
- [x] Arquivos de configuração (package.json, tsconfig.json)
- [x] Integração com browser-tools-mcp
- [ ] Implementação do frontend
- [ ] Implementação do backend
- [ ] Integração com Supabase
- [ ] Implementação dos módulos principais
- [ ] Testes e documentação

## Arquitetura

O projeto segue uma estrutura de monorepo com as seguintes divisões principais:

```
/
├── frontend/                  # Aplicação React + TypeScript
│   └── src/utils/browser-tools/  # Ferramentas para navegador (frontend)
├── backend/                   # API Node.js + Express
│   └── src/utils/browser-tools/  # Ferramentas para navegador (backend)
└── tools/                     # Repositório clonado do browser-tools-mcp
```

### Frontend

- Desenvolvido com React e TypeScript
- Arquitetura de componentes baseada em features
- UI construída com Chakra UI
- Gerenciamento de estado com React Query
- Visualizações de dados com Recharts

### Backend

- Node.js com Express
- TypeScript para tipagem segura
- Arquitetura em camadas (controllers, services, repositories)
- Integração com Supabase para persistência de dados
- Documentação de API com OpenAPI/Swagger

### Browser Tools MCP

O projeto inclui uma biblioteca de ferramentas para navegador (browser-tools-mcp) que fornece:

- Depuração de estado de componentes
- Medição de performance
- Exportação de dados
- Verificação de compatibilidade do navegador
- Integração com Supabase para sincronização de dados

## Módulos Principais

- **Dashboard de Estatísticas**: Visualização de métricas de jogo
- **Biblioteca/Fórum**: Sistema de compartilhamento de estratégias e dicas
- **Chat Integrado**: Assistente IA para ajudar jogadores (integração n8n)
- **Painel Administrativo**: Gerenciamento de conteúdo e usuários

## Requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

## Como Iniciar

### Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/gabrielkevinxd/DST_Dashboard.git
cd DST_Dashboard
```

2. Instale as dependências:
```bash
# Instalar todas as dependências do monorepo
npm install

# Ou instalar separadamente
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Configure as variáveis de ambiente:
   - Crie arquivos `.env` baseados nos exemplos `.env.example` em cada diretório

4. Inicie o desenvolvimento:
```bash
# Iniciar ambos (frontend e backend)
npm start

# Ou iniciar separadamente
# Frontend
npm run start:frontend

# Backend
npm run start:backend
```

## Utilizando o Browser Tools MCP

O Browser Tools MCP é uma biblioteca de utilitários para ajudar no desenvolvimento e depuração do projeto.

### No Frontend

```typescript
import { useBrowserTools } from '../../utils/browser-tools';

const MyComponent = () => {
  const { debugState, measurePerformance, exportData, checkBrowserCompatibility } = useBrowserTools();
  
  // Depurar estado
  debugState(myState, 'Estado do componente');
  
  // Verificar compatibilidade do navegador
  const compatibility = checkBrowserCompatibility();
  console.log('Compatibilidade do navegador:', compatibility);
  
  // Medir performance
  const result = measurePerformance(() => {
    // Código a ser medido
    return processData(data);
  }, 'Processamento de dados');
  
  // Exportar dados
  const handleExport = () => {
    exportData(data, 'export.json');
  };
  
  return (
    // ...
  );
};
```

### No Backend

O backend expõe endpoints para integração com o Browser Tools MCP:

```typescript
import { createBrowserToolsExpress } from './utils/browser-tools';

// Inicializa o Browser Tools
const browserTools = createBrowserToolsExpress({
  supabaseUrl,
  supabaseKey,
  enableLogging: process.env.NODE_ENV === 'development'
});

// Adicionar o middleware
app.use(browserTools.middleware());

// Adicionar as rotas
app.use('/api/browser-tools', browserTools.router());

// Registrar eventos do servidor
browserTools.logEvent('server-start', { 
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'development'
});
```

Endpoints disponíveis:
- `GET /api/browser-tools/status` - Verifica o status da integração
- `POST /api/browser-tools/events` - Registra eventos do cliente
- `GET /api/browser-tools/metrics/performance` - Obtém métricas de performance
- `GET /api/browser-tools/metrics/compatibility` - Obtém relatório de compatibilidade

## Extensão Chrome (Opcional)

Para uma experiência completa com o Browser Tools MCP, você pode instalar a extensão Chrome:

1. Baixe a extensão: [BrowserToolsMCP Chrome Extension](https://github.com/AgentDeskAI/browser-tools-mcp/releases/download/v1.1.0/chrome-extension-v1-1-0.zip)
2. Descompacte o arquivo
3. Abra o Chrome e navegue para `chrome://extensions/`
4. Ative o "Modo do desenvolvedor"
5. Clique em "Carregar sem compactação" e selecione a pasta descompactada

## Padrões de Desenvolvimento

- **Commits**: Seguimos o padrão Conventional Commits
- **Branches**: Utilizamos feature branches com prefixos (feature/, bugfix/, hotfix/)
- **Código**: TypeScript com tipagem estrita e linting rigoroso
- **Testes**: Jest para testes unitários e Cypress para E2E

## Contribuição

1. Crie uma branch a partir de `main`
2. Desenvolva suas alterações
3. Abra um Pull Request para `main`
4. Aguarde a revisão e aprovação

## Licença

Este projeto está licenciado sob a licença MIT.