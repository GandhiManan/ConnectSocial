import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Profile from './pages/ProfilePage.js';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import SchedulingPage from './pages/SchedulingPage';
import MessagePage from './pages/MessagePage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/:userid/connect-social',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/:userid/connect-social/app" /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'scheduling', element: <SchedulingPage /> },
        { path: 'message', element: <MessagePage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
      index: true,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: '/:userid/connect-social/profile',
      element: <Profile />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/signup" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
