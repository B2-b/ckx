import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Ingest } from './pages/Ingest';
import { Chat } from './pages/Chat';

// Placeholder components for routes we haven't built yet
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
    <p className="text-gray-400">Coming soon...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ingest" element={<Ingest />} />
          <Route path="recipes" element={<Placeholder title="Recipe Index" />} />
          <Route path="library" element={<Placeholder title="Library Index" />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
