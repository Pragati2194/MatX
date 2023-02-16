import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const Profile = Loadable(lazy(() => import('./profile')));

const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  { path: '/session/profile', element: <Profile />, auth: authRoles.admin },
];

export default dashboardRoutes;
