/**
 * Integração com browser-tools-mcp no backend
 * 
 * Este arquivo fornece utilitários para integrar as ferramentas do navegador
 * com o backend, permitindo o registro de eventos e métricas que podem ser
 * visualizados no frontend.
 */

import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Inicializa o cliente Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Middleware para registrar eventos de browser-tools
 */
export const browserToolsMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Adiciona um cabeçalho para indicar que o servidor suporta browser-tools
  res.setHeader('X-Browser-Tools-Enabled', 'true');
  
  // Continua com a próxima middleware
  next();
};

/**
 * Roteador para endpoints relacionados a browser-tools
 */
export const browserToolsRouter = express.Router();

// Endpoint para registrar eventos do cliente
browserToolsRouter.post('/events', async (req, res) => {
  try {
    const { type, data, timestamp, userId } = req.body;
    
    if (!type || !data) {
      return res.status(400).json({ error: 'Tipo e dados do evento são obrigatórios' });
    }
    
    // Registra o evento no Supabase
    const { data: eventData, error } = await supabase
      .from('browser_tools_events')
      .insert([
        {
          type,
          data,
          timestamp: timestamp || new Date().toISOString(),
          user_id: userId || null
        }
      ]);
    
    if (error) throw error;
    
    res.status(201).json({ success: true, event: eventData });
  } catch (error: any) {
    console.error('Erro ao registrar evento:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obter métricas de performance
browserToolsRouter.get('/metrics/performance', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    
    // Calcula a data de início com base no número de dias
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));
    
    // Obtém as métricas de performance do Supabase
    const { data, error } = await supabase
      .from('browser_tools_events')
      .select('*')
      .eq('type', 'performance')
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    
    // Processa os dados para o formato adequado
    const metrics = data.map(event => ({
      id: event.id,
      timestamp: event.timestamp,
      operation: event.data.operation,
      duration: event.data.duration,
      userId: event.user_id
    }));
    
    res.status(200).json(metrics);
  } catch (error: any) {
    console.error('Erro ao obter métricas de performance:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obter relatório de compatibilidade de navegadores
browserToolsRouter.get('/metrics/compatibility', async (req, res) => {
  try {
    // Obtém os dados de compatibilidade do Supabase
    const { data, error } = await supabase
      .from('browser_tools_events')
      .select('*')
      .eq('type', 'compatibility')
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    
    // Processa os dados para gerar estatísticas
    const browsers: Record<string, number> = {};
    const features: Record<string, { supported: number, notSupported: number }> = {};
    
    data.forEach(event => {
      // Conta os navegadores
      const browser = event.data.userAgent || 'unknown';
      browsers[browser] = (browsers[browser] || 0) + 1;
      
      // Conta o suporte a recursos
      Object.entries(event.data.features || {}).forEach(([feature, supported]) => {
        if (!features[feature]) {
          features[feature] = { supported: 0, notSupported: 0 };
        }
        
        if (supported) {
          features[feature].supported += 1;
        } else {
          features[feature].notSupported += 1;
        }
      });
    });
    
    res.status(200).json({
      totalReports: data.length,
      browsers,
      features
    });
  } catch (error: any) {
    console.error('Erro ao obter relatório de compatibilidade:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Função para registrar um evento de browser-tools diretamente do servidor
 */
export const logBrowserToolsEvent = async (type: string, data: any, userId?: string) => {
  try {
    const { error } = await supabase
      .from('browser_tools_events')
      .insert([
        {
          type,
          data,
          timestamp: new Date().toISOString(),
          user_id: userId || null
        }
      ]);
    
    if (error) {
      console.error('Erro ao registrar evento do servidor:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao registrar evento do servidor:', error);
    return false;
  }
};

export default {
  browserToolsMiddleware,
  browserToolsRouter,
  logBrowserToolsEvent
};