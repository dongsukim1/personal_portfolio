// Styles
import styled from "styled-components";
// Components
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import Title from "./Title";
// Theme
import { sizes} from "../theme/tokens";
// Utils

// #region styled-components
const StyledAboutMe = styled.section`
  p {
    font-size: 1.25rem;
  }
  
  .avatar-img {
    width: ${sizes.avatar.sm};
    height: ${sizes.avatar.sm};
  }
`;
// #endregion

// #region component
const AboutMe = ({bio, moreInfo }) => {
  return (
    <Element name={"About"} id="about">
      <StyledAboutMe className="section">
        <Container>
          <Container className="d-flex justify-content-center">
            <Title size={"h2"} text={"About Me"} />
          </Container>
        </Container>
      </StyledAboutMe>
    </Element>
  );
};
// #endregion

export default AboutMe;
