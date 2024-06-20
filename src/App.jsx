import { RouterProvider } from 'react-router-dom';
import QueryProvider from './query/QueryProvider';
import router from './routes/router';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
