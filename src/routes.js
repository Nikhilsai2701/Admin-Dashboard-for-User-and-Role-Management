// src/routes.js
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import UserManagement from './components/usermanagement/UserManagement';
import RoleManagement from './components/rolemanagement/RoleManagement';
import PermissionManagement from './components/permissiontree/PermissionTree';

const routes = [
  { path: "/", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/users", element: <UserManagement /> },
  { path: "/roles", element: <RoleManagement /> },
  { path: "/permissions", element: <PermissionManagement /> },
];

export default routes;
