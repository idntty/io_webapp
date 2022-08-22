import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import './css/style.scss';

// Import pages
import ProfileId from './pages/digitalId/ProfileId';
import Validate from './pages/digitalId/Validate';
import ValidationLog from './pages/digitalId/ValidationLog';
import Verify from './pages/digitalId/Verify';
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import Onboarding4 from "./pages/Onboarding4";
import SharedData from "./pages/SharedData";
import ResetPassword from "./pages/ResetPassword";
import SignIn from "./pages/SignIn";
import {LoadingOverlay} from './components/LoadingOverlay';
import {store} from './store/store';
import {observer} from 'mobx-react-lite';

const App = observer(() => {

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
      { store.loading && <LoadingOverlay /> }
      <Routes>
        <Route exact path="/" element={<Onboarding1 />} />
        <Route path="/digitalId/profile-id" element={<ProfileId />} />
        <Route path="/digitalId/validate" element={<Validate />} />
        <Route path="/digitalId/validation-log" element={<ValidationLog />} />
        <Route path="/digitalId/verify" element={<Verify />} />
        <Route path="/onboarding-2" element={<Onboarding2 />} />
        <Route path="/onboarding-3" element={<Onboarding3 />} />
        <Route path="/onboarding-4" element={<Onboarding4 />} />
        <Route path="/shared-data" element={<SharedData />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </>
  );
})

export default App;
