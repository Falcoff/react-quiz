import React from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import { PathEnum } from "./pages/PathsEnum";

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
        path: PathEnum.ABOUT,
        element: <AboutPage />,
      },
      {
        path: PathEnum.LOGIN,
        element: <div>This is Login Page</div>,
      },
      {
        path: PathEnum.DASHBOARD,
        element: (
          <PrivateRoute>
            <div>This is a private Route</div>
          </PrivateRoute>
        ),
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
      <Link to="/home">{t("Home")}</Link>
      <Link to="/about">{t("About")}</Link>
      <Link to="/dashboard">{t("Dashboard")}</Link>
      <Header />
      <div className="App-content">
        {t("title")}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
