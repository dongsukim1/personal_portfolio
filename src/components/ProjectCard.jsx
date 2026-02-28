import React, { useState } from "react";
import { track } from "@vercel/analytics";
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
import { spacing, animations } from "../theme/tokens";
// Utils
import { isValidUrl } from "../utils";
// Config
import { onnxDemoConfig } from "../config";

// #region styled-components
const StyledCard = styled.div`
  width: 100%;
  height: 100%;

  .card {
    height: 100%;
    border: var(--border);
    transition: ${animations.transition};
    background: ${({ theme }) =>
    theme.name === "light" ? "" : "var(--bs-gray)"};
    box-shadow: ${({ theme }) =>
    theme.name === "light"
      ? "0 3px 10px rgb(0 0 0 / 0.2)"
      : "0 3px 10px rgb(255 255 255 / 0.2)"};

    .title-box {
      border: var(--border);
      border-radius: 0.4rem;
      padding: ${spacing.sm} ${spacing.md};
      margin-bottom: ${spacing.sm};
    }

    .project-title {
      margin: 0;
    }

    .image-box {
      border: var(--border);
      border-radius: 0.4rem;
      padding: ${spacing.sm};
      margin-bottom: 0.25rem;
      background: ${({ theme }) =>
        theme.name === "light" ? "var(--bs-light)" : "var(--bs-gray-dark)"};
    }

    .project-image {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    .project-description {
      margin-top: 0;
      margin-bottom: ${spacing.md};
    }

    .tag-list {
      display: flex;
      justify-content: center;
      gap: ${spacing.sm};
      flex-wrap: wrap;
      margin-bottom: ${spacing.md};
    }

    .project-tag {
      border: 1px solid var(--bs-primary);
      border-radius: 999px;
      padding: 0.15rem 0.65rem;
      font-size: 0.8rem;
      line-height: 1.2;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    .tag-icon {
      font-size: 0.95rem;
      width: 0.95rem;
      height: 0.95rem;
      line-height: 1;
      object-fit: contain;
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
        font-size: 0.9rem;
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
  description: PropTypes.node,
  image: PropTypes.node,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  hasOnnxDemo: PropTypes.bool, // New prop for ONNX demo
  tags: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        icon: PropTypes.string,
      }),
    ])
  ),
};

const fillerDescription =
  "This is placeholder project description text. You can replace it with a custom summary.";

const TAG_ICON_MAP = {
  pytorch: "simple-icons:pytorch",
  keras: "simple-icons:keras",
  numpy: "simple-icons:numpy",
  pandas: "simple-icons:pandas",
  sklearn: "simple-icons:scikitlearn",
  "scikit-learn": "simple-icons:scikitlearn",
  seaborn: "mdi:chart-bell-curve-cumulative",
  opencv: "simple-icons:opencv",
  docker: "simple-icons:docker",
  "aws - s3, ec2, sagemaker": "simple-icons:amazonaws",
  python: "simple-icons:python",
  typescript: "simple-icons:typescript",
  mcp: "simple-icons:modelcontextprotocol",
  nlp: "mdi:brain",
  whisper: "mdi:microphone",
  openapi: "simple-icons:openai",
  "javascript/css/html": "simple-icons:javascript",
  sqlite3: "simple-icons:sqlite",
  fastapi: "simple-icons:fastapi",
  "google places api": "simple-icons:googlemaps",
  onnx: "simple-icons:onnx",
};

const normalizeTag = (tag) => {
  const isSvgPath = (value) =>
    typeof value === "string" &&
    (value.trim().toLowerCase().endsWith(".svg") || value.trim().startsWith("/"));

  if (typeof tag === "string") {
    const key = tag.trim().toLowerCase();
    return {
      label: tag,
      icon: TAG_ICON_MAP[key] || "mdi:tag-outline",
      isSvgPath: false,
    };
  }

  if (tag && typeof tag === "object" && typeof tag.label === "string") {
    const iconValue =
      typeof tag.icon === "string" && tag.icon.trim() ? tag.icon.trim() : "mdi:tag-outline";

    return {
      label: tag.label,
      icon: iconValue,
      isSvgPath: isSvgPath(iconValue),
    };
  }

  return { label: "Tech", icon: "mdi:tag-outline", isSvgPath: false };
};

const ProjectCard = ({
  demo,
  description,
  image,
  name,
  url,
  hasOnnxDemo = false,
  tags = ["Python"],
}) => {
  const [showDemo, setShowDemo] = useState(false);
  const hasLiveDemo = isValidUrl(demo);
  const hasDemoActions = hasOnnxDemo || hasLiveDemo;
  const hasDescription =
    typeof description === "string"
      ? description.trim().length > 0
      : description !== null && description !== undefined;
  const cardDescription =
    hasDescription ? description : fillerDescription;
  const cardTags = Array.isArray(tags) && tags.length > 0 ? tags : ["Python"];
  const normalizedTags = cardTags.map(normalizeTag);
  const handleGithubClick = () =>
    track("GitHub Repo Clicked", { project: name, url });

  return (
    <>
      <StyledCard>
        <Card>
          <Card.Body className="text-center">
            <div className="title-box">
              <Card.Title className="project-title">{name}</Card.Title>
            </div>
            <div className="image-box">
              <img
                src={image || GH}
                alt={name}
                className="project-image"
              />
            </div>
            <Card.Text className="project-description">{cardDescription}</Card.Text>
            <div className="tag-list">
              {normalizedTags.map((tag, index) => (
                <span key={`${name}-${tag.label}-${index}`} className="project-tag">
                  {tag.isSvgPath ? (
                    <img src={tag.icon} alt={`${tag.label} logo`} className="tag-icon" />
                  ) : (
                    <Icon icon={tag.icon} className="tag-icon" />
                  )}
                  {tag.label}
                </span>
              ))}
            </div>
            
            {/* Demo buttons */}
            {hasDemoActions && (
              <div className="demo-buttons mb-2">
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
                
                {hasLiveDemo && (
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
            )}
          </Card.Body>
          <Card.Footer className="text-center">
            <Card.Link href={url} onClick={handleGithubClick}>
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
