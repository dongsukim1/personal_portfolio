import React from "react";
import { track } from "@vercel/analytics";
// Styles
import { ThemeProvider } from "styled-components";
// State
import { useDispatch, useSelector } from "react-redux";
import { selectMode, setMode } from "./app/appSlice";
import { useGetUsersQuery, useGetProjectsQuery } from "./app/apiSlice";
// Router
import { HashRouter, Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";
// Components
import { ErrorBoundary } from "react-error-boundary";
import AppFallback from "./components/AppFallback";
import GlobalStyles from "./components/GlobalStyles";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import ErrorDisplay from "./components/ErrorDisplay";
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
// Contexts
import ConfigProvider, { useConfig } from "./contexts/ConfigContext";
// Hooks
import { useProjectData } from "./hooks/useProjectData";
import { useProjectFiltering } from "./hooks/useProjectFiltering";
// Utils
import { getStoredTheme, getPreferredTheme, setTheme } from "./utils";

// Main App Component
const AppContent = () => {
  // const theme = useSelector(selectMode);
  const dispatch = useDispatch();
  const { ui } = useConfig();
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const { data: projectsData } = useGetProjectsQuery();

  // Use custom hooks for data processing
  useProjectData(projectsData);
  useProjectFiltering();

  // Theme management
  const setThemes = React.useCallback(
    (theme) => {
      if (theme) {
        dispatch(setMode(theme));
        setTheme(theme);
      } else {
        dispatch(setMode(getPreferredTheme()));
        setTheme(getPreferredTheme());
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    setThemes();
  }, [setThemes]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setThemes();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setThemes]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("from") !== "redirect") return;

    track("Redirect Landing", { source: "redirect" });
    params.delete("from");
    const queryString = params.toString();
    const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, []);


  // Render content based on loading state
  if (isLoading) {
    return (
      <Container className="d-flex vh-100 align-items-center">
        <Loading />
      </Container>
    );
  }

  if (isError) {
    return <ErrorDisplay error={error} context="GitHub API" />;
  }

  if (isSuccess) {
    return (
      <>
        <Element name={"Home"} id="home">
          {/* <NavBar Logo={ui.navLogo} callBack={setThemes} /> */}
          <div
            style={{
              position: "fixed",
              top: "1rem",
              right: "1rem",
              zIndex: 1031,
            }}
          >
            <ThemeToggle setTheme={setThemes} />
          </div>
        </Element>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/All-Projects" element={<AllProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer mode={ui.footerTheme} />
      </>
    );
  }

  return null;
};

// Wrapper component with providers
const App = () => {

  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      <ConfigProvider>
        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ThemeProvider theme={{ name: useSelector(selectMode) }}>
            <ScrollToTop />
            <GlobalStyles />
            <AppContent />
          </ThemeProvider>
        </HashRouter>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

// #endregion

export default App;
