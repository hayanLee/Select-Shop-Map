import { RouterProvider } from 'react-router-dom';
import QueryProvider from './query/QueryProvider';
import router from './routes/router';

// const queryClient = new QueryClient();

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
