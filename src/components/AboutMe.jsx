// Styles
import styled from "styled-components";
// State
import PropTypes from "prop-types";
// Components
import { Element } from "react-scroll";
import { Col, Container, Row } from "react-bootstrap";
import Title from "./Title";
// Theme
import { sizes} from "../theme/tokens";
// Utils
import { isValidString } from "../utils";
// Images
import profilePhoto from "../images/profile_photo.jpg";

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
const propTypes = {
  // avatar_url: PropTypes.string, // Made optional to use custom image instead
  bio: PropTypes.string,
  moreInfo: PropTypes.string,
};

const AboutMe = ({bio, moreInfo }) => {
  return (
    <Element name={"About"} id="about">
      <StyledAboutMe className="section">
        <Container>
          <Container className="d-flex justify-content-center">
            <Title size={"h2"} text={"About Me"} />
          </Container>
          <Row className="align-items-center mt-5">
            <Col className="d-flex flex-column text-center">
              <Container>
                {isValidString(bio) && <p>{bio}</p>}
                {isValidString(moreInfo) && <p>{moreInfo}</p>}
              </Container>
            </Col>
            <Col className="d-none d-md-block text-center">
              <img
                src={profilePhoto}
                alt="Blackshirt Headshot"
                loading="lazy"
                className="mx-auto rounded-circle border border-primary-subtle avatar-img"
              />
            </Col>
          </Row>
        </Container>
      </StyledAboutMe>
    </Element>
  );
};

AboutMe.propTypes = propTypes;
// #endregion

export default AboutMe;
