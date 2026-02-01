import React from "react";
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
// Router
import { Link, useLocation } from "react-router-dom";
// Images
import defaultLogo from "../images/Vite.js.svg";
// Components
import { Link as ScrollLink } from "react-scroll";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Icon } from "@iconify/react";
import ThemeToggle from "./ThemeToggle";
// Contexts
import { useConfig } from "../contexts/ConfigContext";
// Utils
import { generateResourceUrl } from "../utils/urlUtils";

// #endregion

// #region styled-components
const StyledDiv = styled.div`
  .navbar {
    border-bottom: var(--border);
  }

  .spacer {
    height: var(--nav-height);
  }

  .logo-img {
    background: ${({ theme }) =>
      theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
  }

  .external-resource {
    color: ${({ theme }) =>
      theme.name === "light" ? "var(--bs-primary)" : "var(--bs-info)"};
    text-decoration: none;
    position: relative;
    
    &:hover {
      color: ${({ theme }) =>
        theme.name === "light" ? "var(--bs-primary)" : "var(--bs-info)"};
      opacity: 0.8;
      text-decoration: none;
    }
    
    &:focus {
      color: ${({ theme }) =>
        theme.name === "light" ? "var(--bs-primary)" : "var(--bs-info)"};
      outline: 2px solid ${({ theme }) =>
        theme.name === "light" ? "var(--bs-primary)" : "var(--bs-info)"};
      outline-offset: 2px;
    }
    
    &.nav-link {
      display: flex;
      align-items: center;
      transition: all 0.2s ease-in-out;
    }
    
    /* Visual indicator for external links */
    &::after {
      content: "↗";
      font-size: 0.8em;
      margin-left: 0.25rem;
      opacity: 0.7;
    }
    
    /* Hide external indicator for download types */
    &.download-type::after {
      content: "⬇";
    }
  }
`;
// #endregion

// #region component
const propTypes = {
  Logo: PropTypes.node,
  callBack: PropTypes.func,
  closeDelay: PropTypes.number,
};

const NavBar = ({ Logo = defaultLogo, callBack, closeDelay = 125 }) => {
  const theme = useSelector(selectMode);
  const [isExpanded, setisExpanded] = React.useState(false);
  const { pathname } = useLocation();
  const { navigation } = useConfig();

  return (
    <StyledDiv>
      <div className="spacer" />
      <Navbar
        id="nav"
        collapseOnSelect={true}
        expand="xl"
        expanded={isExpanded}
        bg={theme === "light" ? "light" : "dark"}
        variant={theme === "light" ? "light" : "dark"}
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <img
              alt="Logo"
              src={Logo === null ? defaultLogo : Logo}
              width="35"
              height="35"
              className="rounded-circle logo-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setisExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav navbarScroll className="me-auto">
              {pathname === "/" 
                ? navigation.sections.map((section) => (
                    <Nav.Item key={section.id}>
                      <ScrollLink
                        to={section.to}
                        spy={true}
                        activeClass="active"
                        className="nav-link"
                        onClick={() => {
                          setTimeout(() => {
                            setisExpanded(false);
                          }, closeDelay);
                        }}
                      >
                        {section.name}
                      </ScrollLink>
                    </Nav.Item>
                  ))
                : navigation.routes.map((route) => (
                    <Nav.Item key={route.id}>
                      <Link
                        to={route.route}
                        className={`nav-link ${pathname === route.route ? 'active' : ''}`}
                        onClick={() => {
                          setTimeout(() => {
                            setisExpanded(false);
                          }, closeDelay);
                        }}
                      >
                        {route.name}
                      </Link>
                    </Nav.Item>
                  ))
              }
              
              {/* External Resources Navigation */}
              {navigation.externalResources && navigation.externalResources.length > 0 && 
                navigation.externalResources
                  .filter(resource => resource.showOnMobile !== false) // Show by default unless explicitly hidden
                  .map((resource) => {
                    const fullUrl = generateResourceUrl(resource.url);
                    if (!fullUrl) return null; // Skip invalid URLs
                    
                    return (
                      <Nav.Item key={resource.id}>
                        <a
                          href={fullUrl}
                          className={`nav-link external-resource ${resource.type === 'download' ? 'download-type' : ''}`}
                          target="_self"
                          rel="noopener"
                          aria-label={resource.description || `${resource.name} - ${resource.type || 'external resource'}`}
                          tabIndex="0"
                          onClick={() => {
                            setTimeout(() => {
                              setisExpanded(false);
                            }, closeDelay);
                          }}
                          onKeyDown={(e) => {
                            // Support Enter and Space key activation
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.location.href = fullUrl;
                              setTimeout(() => {
                                setisExpanded(false);
                              }, closeDelay);
                            }
                          }}
                        >
                          {resource.icon && (
                            <Icon 
                              icon={resource.icon} 
                              className="me-2" 
                              style={{ fontSize: '1.1em' }}
                              aria-hidden="true"
                            />
                          )}
                          {resource.name}
                        </a>
                      </Nav.Item>
                    );
                  })
              }
            </Nav>
            <Nav>
              <ThemeToggle
                closeDelay={closeDelay}
                setExpanded={setisExpanded}
                setTheme={callBack}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledDiv>
  );
};

NavBar.propTypes = propTypes;
// #endregion

export default NavBar;
