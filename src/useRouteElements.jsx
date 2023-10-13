import MainLayout from "./layouts/MainLayout/index.jsx";
import Login from "./pages/User/Login/Login.jsx";
import Register from "./pages/User/Register/Register.jsx";
import ResetPassword from "./pages/User/ResetPassword/ResetPassword.jsx";
import FindAccount from "./pages/User/FindAccount/findAccount.jsx";
import { useRoutes } from "react-router-dom";
import Profile from "./pages/User/Profile/Profile.jsx";
import EditProfile from "./pages/User/Profile/EditProfile.jsx";
import CreateCV from "./pages/User/CreateCV/CreateCV.jsx";
import TestCV from "./pages/User/testCV/testCV.jsx";

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "find-account",
          element: <FindAccount />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "createCV",
          element: <CreateCV />,
        },
        {
          path: "testCV",
          element: <TestCV />,
        },
      ],
    },
  ]);
  return routeElements;
}

export default useRouteElements;
