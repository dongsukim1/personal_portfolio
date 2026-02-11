import React from "react";
// Styles
import styled from "styled-components";
// State
import PropTypes from "prop-types";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Link } from "react-scroll";

// #region styled-components
const StyledDiv = styled.div`
  visibility: hidden;
  z-index: 2;
  margin-top: 1.25rem;
  text-align: center;

  .link-icons {
    color: ${({ theme }) => (theme.name === "light" ? "#45413C" : "#F5F2E8")};
    cursor: pointer;
    font-size: 1.6rem;
    line-height: 1;
  }

  &.show-up {
    visibility: visible;
  }

  &.floating {
    position: fixed;
    bottom: calc(var(--min-footer-height) + 1.5rem);
    right: 1.5rem;
    margin-top: 0;
    text-align: initial;
  }
`;
// #endregion

// #region component
const propTypes = {
  home: PropTypes.string,
  floating: PropTypes.bool,
};

const BackToTop = ({ home = "Home", floating = true }) => {
  const [isVisible, setIsVisible] = React.useState(!floating);
  const up = React.useRef(null);

  React.useEffect(() => {
    if (!floating) {
      setIsVisible(true);
      return undefined;
    }

    const updateScrollY = () => {
      setIsVisible(window.scrollY > 500);
    };

    updateScrollY();
    window.addEventListener("scroll", updateScrollY);

    return () => window.removeEventListener("scroll", updateScrollY);
  }, [floating]);

  React.useEffect(() => {
    if (!up.current) return;
    if (isVisible) up.current.classList.add("show-up");
    else up.current.classList.remove("show-up");
  }, [isVisible]);

  return (
    <StyledDiv ref={up} className={floating ? "floating" : ""}>
      <Link to={home} className="link-icons">
        <Icon icon="fa6-solid:circle-chevron-up" />
      </Link>
    </StyledDiv>
  );
};

BackToTop.propTypes = propTypes;
// #endregion

export default BackToTop;
