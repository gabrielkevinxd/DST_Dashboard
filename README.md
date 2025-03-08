# DST_Dashboard

Dashboard para visualização de dados do Don't Starve Together

## Sobre o Projeto

Este projeto é um dashboard interativo para visualização e análise de dados do jogo Don't Starve Together. Ele permite aos jogadores acompanhar estatísticas, gerenciar recursos e otimizar suas estratégias de jogo.

## Status do Projeto

- [x] Estrutura básica do monorepo
- [x] Configuração do ambiente de desenvolvimento
- [x] Arquivos de configuração (package.json, tsconfig.json)
- [ ] Implementação do frontend
- [ ] Implementação do backend
- [ ] Integração com Supabase
- [ ] Implementação dos módulos principais
- [ ] Testes e documentação

## Arquitetura

O projeto segue uma estrutura de monorepo com as seguintes divisões principais:

```
/
├── frontend/     # Aplicação React + TypeScript
├── backend/      # API Node.js + Express
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