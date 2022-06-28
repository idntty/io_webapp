import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import './css/style.scss';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Fintech from './pages/Fintech';
import ProfileId from './pages/digitalId/ProfileId';
import Validate from './pages/digitalId/Validate';
import ValidationLog from './pages/digitalId/ValidationLog';
import Verify from './pages/digitalId/Verify';
import Messages from './pages/Messages';
import ButtonPage from './pages/component/ButtonPage';
import BadgePage from './pages/component/BadgePage';
import AccordionPage from './pages/component/AccordionPage';
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import Onboarding4 from "./pages/Onboarding4";
import SharedData from "./pages/SharedData";
import ResetPassword from "./pages/ResetPassword";
import Signin from "./pages/Signin";

function App() {

  const location = useLocation();
  useEffect(()=> {
    localStorage.setItem('svgAvatar', '')
  },[])

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Onboarding1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/fintech" element={<Fintech />} />
        <Route path="/digitalId/profile-id" element={<ProfileId />} />
        <Route path="/digitalId/validate" element={<Validate />} />
        <Route path="/digitalId/validation-log" element={<ValidationLog />} />
        <Route path="/digitalId/verify" element={<Verify />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/onboarding-2" element={<Onboarding2 />} />
        <Route path="/onboarding-3" element={<Onboarding3 />} />
        <Route path="/onboarding-4" element={<Onboarding4 />} />
        <Route path="/component/button" element={<ButtonPage />} />
        <Route path="/shared-data" element={<SharedData />} />
        <Route path="/component/badge" element={<BadgePage />} />
        <Route path="/component/accordion" element={<AccordionPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
