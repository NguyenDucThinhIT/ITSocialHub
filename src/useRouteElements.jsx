import MainLayout from "./layouts/MainLayout/index.jsx";
import Login from "./pages/User/Login/Login.jsx";
import Register from "./pages/User/Register/Register.jsx";
import ResetPassword from "./pages/User/ResetPassword/ResetPassword.jsx";
import FindAccount from "./pages/User/FindAccount/findAccount.jsx";
import { useRoutes } from "react-router-dom";
import Profile from "./pages/User/Profile/Profile.jsx";
import EditProfile from "./pages/User/Profile/EditProfile.jsx";
import TemplateCV from "./pages/User/CreateCV/Template/TemplateCV.jsx";
import TemplateCV01 from "./pages/User/CreateCV/TemplateCV01/TemplateCV01.jsx";
import TemplateCV02 from "./pages/User/CreateCV/TemplateCV02/TemplateCV02.jsx";
import MyCV from "./pages/User/CreateCV/MyCV/index.js";
import TemplateCV03 from "./pages/User/CreateCV/TemplateCV03/TemplateCV03.jsx";




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
          path: "templateCV",
          element: <TemplateCV />,
        },
        {
          path: "CVs",
          element: <MyCV />,
        },
        {
          path: "templateCV01",
          element: <TemplateCV01 />,
        },
        {
          path: "templateCV02",
          element: <TemplateCV02 />,
        },
        {
          path: "templateCV03",
          element: <TemplateCV03 />,
        },
      ],
    },
  ]);
  return routeElements;
}

export default useRouteElements;
