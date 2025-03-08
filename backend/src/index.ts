import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Importação da integração com browser-tools
import { browserToolsMiddleware, browserToolsRouter } from './utils/browser-tools-integration';

// Carrega as variáveis de ambiente
dotenv.config();

// Inicializa o cliente Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Inicializa o app Express
const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Middleware do browser-tools
app.use(browserToolsMiddleware);

// Rotas
import userRoutes from './controllers/userController';
import postRoutes from './controllers/postController';
import statsRoutes from './controllers/statsController';
import chatRoutes from './controllers/chatController';

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/chat', chatRoutes);

// Rotas do browser-tools
app.use('/api/browser-tools', browserToolsRouter);

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Rota para verificar status do browser-tools
app.get('/api/browser-tools/status', (req, res) => {
  res.status(200).json({
    enabled: true,
    version: '1.0.0',
    features: [
      'performance-monitoring',
      'compatibility-check',
      'event-logging'
    ]
  });
});

// Middleware de tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Browser-tools MCP ativado e disponível em /api/browser-tools`);
});