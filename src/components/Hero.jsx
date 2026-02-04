import React from "react";
// Styles
import styled from "styled-components";
// State
import PropTypes from "prop-types";
// Icons
import { Icon } from "@iconify/react";
// Images
import profilePhoto from "../images/profile_photo.jpg";
import { Light, Dark } from "../config";
// Components
import { useErrorBoundary } from "react-error-boundary";
import { Link } from "react-scroll";
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
  min-height: calc(100vh - var(--nav-height));

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(135deg, var(--bs-primary), var(--bs-light))"
        : "linear-gradient(135deg, var(--bs-primary), var(--bs-dark))"};
    z-index: -2;
  }

  /* Overlay for contrast */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)"};
    z-index: -1;
  }

  .down-container {
    height: 10rem;
  }

  @media screen and (min-width: 1180px) {
    &::before {
      background: ${({ theme }) =>
        theme.name === "light"
          ? `url(${Light}) top center fixed no-repeat`
          : `url(${Dark}) top center fixed no-repeat`};
      background-size: 100vw auto;
    }
  }

  @media screen and (min-width: 1367px) {
    &::before {
      background: ${({ theme }) =>
        theme.name === "light"
          ? `url(${Light}) center center fixed no-repeat`
          : `url(${Dark}) center center fixed no-repeat`};
      background-size: cover;
    }
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
                {hasBio && <p className="mb-2">{bio}</p>}
                {hasMoreInfo && <p className="mb-0">{moreInfo}</p>}
              </div>
            )}
          </Col>
          <Col className="d-none d-md-block">
            <img
            src={profilePhoto}
              alt={`${displayName} profile`}
              className="w-75 mx-auto hero-img rounded-circle border border-primary-subtle"
            />
          </Col>
        </Row>
        <Row className="align-items-end down-container">
          <Col className="m-4 text-center">
            <Link to={"About"} className="link-icons">
              <Icon icon="fa6-solid:circle-chevron-down" />
            </Link>
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
