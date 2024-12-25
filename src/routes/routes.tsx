import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../screens/HomePage';
import AITheoryGenerator from '../screens/AITheoryGeneratorPage';
import StoragePermissionInfo from '../screens/StoragePermissionInfoPage';
import { Outlet } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout><Outlet /></Layout>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'ai-theory-generator',
        element: <AITheoryGenerator />
      },
      {
        path: 'storage-permission-info',
        element: <StoragePermissionInfo />
      }
    ]
  }
];

export default routes;