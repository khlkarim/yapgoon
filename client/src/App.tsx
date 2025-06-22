import './App.css';

import { Routes, Route, Navigate } from 'react-router'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Inbox from './pages/main/Inbox'
import Channels from './pages/main/Channels'
import Profile from './pages/main/Profile'
import { UserProvider } from './providers/UserProvider';
import NotificationSystem from './components/notification/NotificationSystem';
import WsProvider from './providers/WsProvider';

function App() {
  return (
    <UserProvider>
      <WsProvider>
        <div className='app'>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
            </Route>

            <Route element={<MainLayout />}>
              <Route path='/inbox' element={<Inbox />}></Route>
              <Route path='/channels' element={<Channels />}></Route>
              <Route path='/profile/*' element={<Profile />}></Route>
            </Route>

            <Route
              path="*"
              element={<Navigate to="/channels" replace />}
            />
          </Routes>
    
          <NotificationSystem />
        </div>
      </WsProvider>
    </UserProvider>
  )
}

export default App
