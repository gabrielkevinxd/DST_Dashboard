import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

// Importação de páginas (serão criadas posteriormente)
import Dashboard from './features/dashboard/Dashboard';
import Forum from './features/forum/Forum';
import Chat from './features/chat/Chat';
import Admin from './features/admin/Admin';

// Importação de componentes compartilhados
import Layout from './components/shared/Layout';

const App: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="forum" element={<Forum />} />
          <Route path="chat" element={<Chat />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;