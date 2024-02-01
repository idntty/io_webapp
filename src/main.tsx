import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import IdentitySelection from './pages/IdentitySelection.tsx';
import Passphrase from './pages/Passphrase.tsx';
import PrivateData from './pages/PrivateData.tsx';
import CreateAccount from './pages/CreateAccount.tsx';
import LoginWithPasskey from './pages/LoginWithPasskey.tsx';
import LoginWithoutPasskey from './pages/LoginWithoutPasskey.tsx';
import IdentityPage from './pages/IdentityPage.tsx';
import ComponentsTesting from './pages/ComponentsTesting.tsx';
import ShareForm from './components/identity-page/ShareForm.tsx';
import AddItemForm from './components/identity-page/AddIdemForm.tsx';
import EditItemForm from './components/identity-page/EditItemForm.tsx';

const router = createBrowserRouter([
  { path: '/', element: <IdentitySelection /> },
  { path: '/passphrase', element: <Passphrase /> },
  { path: '/private-data', element: <PrivateData /> },
  { path: '/create-account', element: <CreateAccount /> },
  { path: '/login-with-passkey', element: <LoginWithPasskey /> },
  { path: '/login-without-passkey', element: <LoginWithoutPasskey /> },
  { path: '/identity-page', element: <IdentityPage /> },
  { path: '/components', element: <ComponentsTesting /> },
  {
    path: '/share-form',
    element: (
      <div className="flex justify-center self-stretch px-[300px] py-[20px]">
        <ShareForm />
      </div>
    ),
  },
  {
    path: '/add-item-form',
    element: (
      <div className="flex justify-center self-stretch px-[300px] py-[20px]">
        <AddItemForm />
      </div>
    ),
  },
  {
    path: '/edit-item-form',
    element: (
      <div className="flex justify-center self-stretch px-[300px] py-[20px]">
        <EditItemForm />
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
