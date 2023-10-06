import {lazy} from "react";
import Loadable from "../utils/Loadable";
import MainLayout from "../layout/MainLayout";

const Dashboard = Loadable(lazy(() => import('../views/dashboard')))

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    }
  ]
}

export default MainRoutes