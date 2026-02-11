// State
import { useGetUsersQuery } from "../app/apiSlice";
// Components
import Hero from "../components/Hero";
import Projects from "../components/Projects";
// import BackToTop from "../components/BackToTop";
// Contexts
import { useConfig } from "../contexts/ConfigContext";
// Hooks
import { useTitle, TITLES } from "../hooks/useTitle";

// #region component
const Home = () => {
  const { data: userData } = useGetUsersQuery();
  const { content } = useConfig();

  // Use centralized title management
  useTitle(TITLES.HOME, userData);

  return (
    <>
      <Hero
        name={userData?.name}
        bio={userData?.bio}
        moreInfo={content.moreInfo}
      />
      <main>
        {/* <Skills /> */}
        <Projects />
      </main>
      {/* <BackToTop /> */}
    </>
  );
};
// #endregion

export default Home;
