import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import IdentitySelection from './IdentitySelection.tsx';
import Passphrase from './Passphrase.tsx';
import PrivateData from './PrivateData.tsx';
import CreateAccount from './CreateAccount.tsx';
import LoginWithPasskey from './LoginWithPasskey.tsx';
import LoginWithoutPasskey from './LoginWithoutPasskey.tsx';
import IdentityPage from './IdentityPage.tsx';
import ComponentsTesting from './ComponentsTesting.tsx';

const router = createBrowserRouter([
  { path: '/', element: <IdentitySelection /> },
  { path: '/passphrase', element: <Passphrase /> },
  { path: '/private-data', element: <PrivateData /> },
  { path: '/create-account', element: <CreateAccount /> },
  { path: '/login-with-passkey', element: <LoginWithPasskey /> },
  { path: '/login-without-passkey', element: <LoginWithoutPasskey /> },
  { path: '/identity-page', element: <IdentityPage /> },
  { path: '/components', element: <ComponentsTesting /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
