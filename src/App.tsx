import React from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import { PathEnum } from "./pages/PathsEnum";
import RankingPage from "./pages/RankingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    errorElement: <Navigate to={PathEnum.HOME} />,
    children: [
      { index: true, element: <Navigate to={PathEnum.HOME} replace /> },
      {
        element: <HomePage />,
        path: PathEnum.HOME,
      },
      {
        path: PathEnum.QUESTION,
        element: <QuestionPage />,
      },
      {
        path: PathEnum.RANKING,
        element: <RankingPage />,
      },
    ],
  },
]);

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = false; // checkUserAuthentication();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function LayoutComponent() {
  const { t } = useTranslation();

  return (
    <div className="App">
      {/* <Link to="/home">{t("Home")}</Link>
      <Link to="/about">{t("About")}</Link>
      <Link to="/dashboard">{t("Dashboard")}</Link>
      <Header /> */}
      <div className="App-content">
        {/* {t("title")} */}
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
