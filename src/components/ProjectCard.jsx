import React, { useState } from "react";
// Styles
import styled from "styled-components";
// State
import PropTypes from "prop-types";
// Icons
import { Icon } from "@iconify/react";
// Images
import GH from "../images/GH.svg";
// Components
import { Card, Button } from "react-bootstrap";
import ONNXDemo from "./ONNXDemo";
// Theme
import { spacing, sizes, animations } from "../theme/tokens";
// Utils
import { isValidUrl } from "../utils";
// Config
import { onnxDemoConfig } from "../config";

// #region styled-components
const StyledCard = styled.div`
  .card {
    height: ${sizes.cardHeight};
    border: var(--border);
    transition: ${animations.transition};
    background: ${({ theme }) =>
    theme.name === "light" ? "" : "var(--bs-gray)"};
    box-shadow: ${({ theme }) =>
    theme.name === "light"
      ? "0 3px 10px rgb(0 0 0 / 0.2)"
      : "0 3px 10px rgb(255 255 255 / 0.2)"};

    .card-img-top {
      height: ${sizes.cardImage};
      object-fit: contain;
      margin-top: ${spacing.xl};
    }

    .card-body {
      .card-title {
        margin-top: ${spacing.lg};
      }
    }

    .card-link {
      text-decoration: none;
      font-size: ${spacing.lg};

      &:hover {
        color: ${({ theme }) =>
    theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
      }
    }

    .card-footer {
      border-top: var(--border);
      background: ${({ theme }) =>
    theme.name === "light" ? "" : "var(--bs-gray-dark)"};

      .card-link {
        color: ${({ theme }) =>
    theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};

        &:hover {
          color: var(--bs-primary);
        }
      }
    }

    &:hover {
      transform: scale(1.03);
    }
  }
`;
// #endregion

// #region component
const propTypes = {
  demo: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.node,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  hasOnnxDemo: PropTypes.bool, // New prop for ONNX demo
};

const ProjectCard = ({ demo, description, image, name, url, hasOnnxDemo = false }) => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <StyledCard>
        <Card>
          <Card.Img
            variant="top"
            src={image || GH}
            alt={name}
            className="mx-auto"
          />
          <Card.Body className="overflow-auto text-center">
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            
            {/* Demo buttons */}
            <div className="demo-buttons mb-3">
              {hasOnnxDemo && (
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => setShowDemo(true)}
                >
                  <Icon icon="mdi:brain" className="me-1" />
                  Try Demo - Insert bobcat image!
                </Button>
              )}
              
              {isValidUrl(demo) && (
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="icon-park-outline:code-computer" className="me-1" />
                  Live Demo
                </Button>
              )}
            </div>
          </Card.Body>
          <Card.Footer className="text-center">
            <Card.Link href={url}>
              {"View on GitHub "}
              <Icon icon="icomoon-free:github" />
            </Card.Link>
          </Card.Footer>
        </Card>
      </StyledCard>
      
      {/* ONNX Demo Modal */}
      {hasOnnxDemo && (
        <ONNXDemo 
          show={showDemo}
          onHide={() => setShowDemo(false)}
          modelConfig={onnxDemoConfig}
        />
      )}
    </>
  );
};

ProjectCard.propTypes = propTypes;
// #endregion

export default ProjectCard;
