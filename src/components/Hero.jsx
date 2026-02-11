import React from "react";
// Styles
import styled from "styled-components";
// State
import PropTypes from "prop-types";
// Images
import profilePhoto from "../images/profile_photo.jpg";
// Components
import { useErrorBoundary } from "react-error-boundary";
import { Button, Col, Container, Row } from "react-bootstrap";
import SocialLinks from "./SocialLinks";
import Title from "./Title";
// Contexts
import { useConfig } from "../contexts/ConfigContext";
// Utils
import { isValidString } from "../utils";

// #region styled-components
const StyledHero = styled.header`
  position: relative;
  display: grid;
  place-items: center;
  max-width: 1920px;
  margin: 0 auto;
  min-height: calc(92vh - var(--nav-height));

  .hero-photo {
    width: 50%;
  }
`;
// #endregion

// #region component
const propTypes = {
  name: PropTypes.string,
  bio: PropTypes.string,
  moreInfo: PropTypes.string,
};

const Hero = ({ name, bio, moreInfo }) => {
  const { showBoundary } = useErrorBoundary();
  const { site } = useConfig();

  const displayName = isValidString(name) ? name : site.displayName;
  const hasBio = isValidString(bio);
  const hasMoreInfo = isValidString(moreInfo);

  return (
    <StyledHero>
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <h1 className="mb-3 display-3 title">{displayName}</h1>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <SocialLinks />
            </div>
            {(hasBio || hasMoreInfo) && (
              <div className="mx-auto about-text" style={{ maxWidth: "36rem" }}>
                <div className="mb-2">
                  <Title size={"h2"} text={"About Me"} />
                </div>
                {hasBio && <p className="mb-2 about-description">{bio}</p>}
                {hasMoreInfo && <p className="mb-0 about-description">{moreInfo}</p>}
              </div>
            )}
          </Col>
          <Col className="d-none d-md-block">
            <img
            src={profilePhoto}
              alt={`${displayName} profile`}
              className="mx-auto hero-img hero-photo rounded-circle border border-primary-subtle"
            />
          </Col>
        </Row>
        <Button
          className="d-none"
          onClick={() =>
            showBoundary({
              name: "Error",
              message: "Simulated error message",
            })
          }
        >
          Simulate Error Boundary
        </Button>
      </Container>
    </StyledHero>
  );
};

Hero.propTypes = propTypes;
// #endregion

export default Hero;
