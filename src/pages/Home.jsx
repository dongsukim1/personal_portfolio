import styled from "styled-components";
// State
import { useGetUsersQuery } from "../app/apiSlice";
// Components
import Hero from "../components/Hero";
import Projects from "../components/Projects";
// import BackToTop from "../components/BackToTop";
// Contexts
import { useConfig } from "../contexts/ConfigContext";
import { Light, Dark } from "../config";
// Hooks
import { useTitle, TITLES } from "../hooks/useTitle";

const StyledHomePage = styled.div`
  position: relative;
  background: ${({ theme }) =>
    theme.name === "light"
      ? `url(${Light}) center top / cover fixed no-repeat`
      : `url(${Dark}) center top / cover fixed no-repeat`};
  isolation: isolate;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.12) 55%,
      rgba(0, 0, 0, 0.28) 68%,
      rgba(0, 0, 0, 0.5) 80%,
      rgba(0, 0, 0, 0.75) 90%,
      #000 100%
    );
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media screen and (max-width: 1179px) {
    background-attachment: scroll;
  }
`;

// #region component
const Home = () => {
  const { data: userData } = useGetUsersQuery();
  const { content } = useConfig();

  // Use centralized title management
  useTitle(TITLES.HOME, userData);

  return (
    <StyledHomePage>
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
    </StyledHomePage>
  );
};
// #endregion

export default Home;
