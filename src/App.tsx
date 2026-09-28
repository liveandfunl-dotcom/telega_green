import { createBrowserRouter, redirect, RouterProvider } from 'react-router';

import Authenticate from './pages/authenticate/Authenticate';
import Chats from './pages/chats/Chats';
import './App.css';

const authGuard = () => {
  const idInstance = localStorage.getItem('idInstance');
  const apiTokenInstance = localStorage.getItem('apiTokenInstance');

  if (!idInstance || !apiTokenInstance) {
    return redirect('/authenticate');
  } else {
    return null;
  }
};

const router = createBrowserRouter([
  { path: '/', loader: () => redirect('/chats/0')},
  { path: '/authenticate', element: <Authenticate /> },
  { path: '/chats/:id', loader: authGuard, element: <Chats /> },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
		</div>
  )
};

export default App;
