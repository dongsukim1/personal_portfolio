import React from "react";
// State
import { useGetUsersQuery } from "../app/apiSlice";
// Components
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
// import Contact from "../components/Contact"; contacts removed
import BackToTop from "../components/BackToTop";
// Config
import { filteredProjects, moreInfo } from "../config";
// Hooks
import { useTitle, TITLES } from "../hooks/useTitle";

// #region component
const Home = () => {
  const { data: userData } = useGetUsersQuery();

  // Use centralized title management
  useTitle(TITLES.HOME, userData);

  return (
    <>
      <Hero name={userData.name} />
      <main>
        <AboutMe
          avatar_url={userData.avatar_url}
          bio={userData.bio}
          moreInfo={moreInfo}
        />
        <Skills />
        <Projects filteredProjects={filteredProjects} />
        {/* <Contact /> contacts removed */}
      </main>
      <BackToTop />
    </>
  );
};
// #endregion

export default Home;
