import React from "react";
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectProjects, selectMainProjects } from "../app/projectsSlice";
import { useGetProjectsQuery } from "../app/apiSlice";
// Components
import { Element } from "react-scroll";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "./Loading";
import ProjectCard from "./ProjectCard";
import ErrorDisplay from "./ErrorDisplay";
import BackToTop from "./BackToTop";
// Constants
import { ERROR_MESSAGES } from "../constants";
// Utils
import { isValidArray } from "../utils";

// #region styled-components
const StyledProjectsSection = styled.section`
  min-height: auto;
  display: block;
  margin: 0;
  padding-top: 0.25rem;
  padding-bottom: 0.35rem;
`;
// #endregion

// #region component
const Projects = () => {
  const projects = useSelector(selectProjects);
  const mainProjects = useSelector(selectMainProjects);
  const { isLoading, isSuccess, isError, error } = useGetProjectsQuery();
  let content;

  if (isLoading) {
    content = (
      <Container className="d-flex">
        <Loading />
      </Container>
    );
  } else if (isSuccess) {
    content = (
      <>
        {!error && !isValidArray(projects) && (
          <h2 className="text-center">
            {ERROR_MESSAGES.NO_PROJECTS}
          </h2>
        )}
        {isValidArray(mainProjects) && (
          <>
            <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
              {mainProjects.map((element) => {
                return (
                  <Col key={element.id} className="d-flex">
                    <ProjectCard
                      image={element.image}
                      name={element.name}
                      description={element.description}
                      url={element.html_url}
                      demo={element.homepage}
                      hasOnnxDemo={element.hasOnnxDemo}
                      tags={element.tags}
                    />
                  </Col>
                );
              })}
            </Row>
            <BackToTop home="Home" floating={false} />
          </>
        )}
      </>
    );
  } else if (isError) {
    content = <ErrorDisplay error={error} context="getProjects query in src/app/apiSlice.js" />;
  }

  return (
    <Element name={"Projects"} id="projects">
      <StyledProjectsSection className="section">
        <Container>
          {content}
        </Container>
      </StyledProjectsSection>
    </Element>
  );
};
// #endregion

export default Projects;
