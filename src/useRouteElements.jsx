import React from "react";
import { Navigate, Outlet, useLocation, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

import MainLayout from "./layouts/MainLayout/MainLayout.jsx";
import ManageLayout from "./layouts/ManageLayout/ManageLayout.jsx";
import Login from "./pages/User/Login/Login.jsx";
import Register from "./pages/User/Register/Register.jsx";
import ResetPassword from "./pages/User/ResetPassword/ResetPassword.jsx";
import FindAccount from "./pages/User/FindAccount/findAccount.jsx";
import TemplateCV from "./pages/User/CreateCV/Template/TemplateCV.jsx";
import TemplateCV01 from "./pages/User/CreateCV/TemplateCV01/TemplateCV01.jsx";
import TemplateCV02 from "./pages/User/CreateCV/TemplateCV02/TemplateCV02.jsx";
import MyCV from "./pages/User/CreateCV/MyCV/index.js";
import TemplateCV03 from "./pages/User/CreateCV/TemplateCV03/TemplateCV03.jsx";
import ListCompanies from "./pages/User/ListCompanies/ListCompanies.jsx";
import ApplyCV from "./pages/User/CreateCV/ApplyCV/index.js";
import LandingPage from "./pages/User/LandingPage/LandingPage.jsx";
import ActiveAccount from "./pages/User/ActiveAccount/ActiveAccount.jsx";
import CompanyProfile from "./pages/Recruiter/CompanyProfile/CompanyProfile.jsx";
import { JobCreate, EditJobCreate } from "./pages/Recruiter/JobCreate/index.js";
import Dashboard from "./pages/Recruiter/Dashboard/Dashboard.jsx";
import ProfileUser from "./pages/User/Profile/index.js";
import Page404 from "./pages/Page404/Page404.jsx";
import ProfileCompany from "./pages/User/ListCompanies/ProfileCompany.jsx";
import { FindJobs } from "./pages/User/FindJobs/index.js";
import InforJobs from "./pages/User/FindJobs/InforJobs.jsx";
import Accounts from "./pages/Admin/Accounts/Accounts.jsx";
import Application from "./pages/Recruiter/Application/index.js";


function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && allowedRoles?.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function RejectedRoute() {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
            {
              path: "active-account",
              element: <ActiveAccount />,
            },
            {
              path: "find-account",
              element: <FindAccount />,
            },
            {
              path: "reset-password",
              element: <ResetPassword />,
            },
          ],
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute allowedRoles={[0]} />,
      children: [
        {
          path: "",
          element: <ManageLayout />,
          children: [
           
          ],
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute allowedRoles={[2]} />,
      children: [
        {
          path: "",
          element: <ManageLayout />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "company/edit",
              element: <CompanyProfile />,
            },
            {
              path: "job/create",
              element: <JobCreate />,
            },
            {
              path: "job/edit/:postId",
              element: <EditJobCreate />,
            },
            {
              path: "application/post/:postId",
              element: <Application />,
            },
            
          ],
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute allowedRoles={[1]} />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "profile",
              element: <ProfileUser />,
            },
            {
              path: "/create/templateCV",
              element: <TemplateCV />,
            },
            {
              path: "CVs",
              element: <MyCV />,
            },
            {
              path: "applications",
              element: <ApplyCV />,
            },
            {
              path: "/create/templateCV/01",
              element: <TemplateCV01 />,
            },
            {
              path: "/create/templateCV/02",
              element: <TemplateCV02 />,
            },
            {
              path: "/create/templateCV/03",
              element: <TemplateCV03 />,
            },
            
          ],
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute allowedRoles={[0]} />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "/admin/accounts",
              element: <Accounts />,
            },        
          ],
        },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "",
          index:true,
          element: <LandingPage />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute
              allowedRoles={[0,1,2]}
            />
          ),
          children: [{ path: "", element: <ProfileUser /> }],
        },
        {
          path: "*",
          element: <Page404 />,
        },
        {
          path: "jobs",
          element: <FindJobs />,
        },
        {
          path: "jobs/:postId",
          element: <InforJobs />,
        },
        {
          path: "companies",
          element: <ListCompanies />,
        },
        {
          path: "companies/:postId",
          element: <ProfileCompany />,
        },
      ],
    },
  ]);
  return routeElements;
}

export default useRouteElements;
