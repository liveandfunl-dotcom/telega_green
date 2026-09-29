import { createBrowserRouter, redirect } from 'react-router';

import Authenticate from '../pages/authenticate/Authenticate';
import Chats from '../pages/chats/Chats';
import { getCredentials } from '../api';

const authGuard = () => {
  if (!getCredentials()) {
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

export default router;
