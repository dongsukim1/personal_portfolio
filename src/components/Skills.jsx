import React from "react";
import { track } from "@vercel/analytics";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
// Components
import { Element } from "react-scroll";
import { Button, Col, Container, Row } from "react-bootstrap";
import Title from "./Title";
// Contexts
import { useConfig } from "../contexts/ConfigContext";

// #region component
const Skills = () => {
  const theme = useSelector(selectMode);
  const { skills, content } = useConfig();

  return (
    <Element name={"Skills"} id="skills">
      <section className="section">
        <Container className="text-center">
          <Container className="d-flex justify-content-center">
            <Title size={"h2"} text={"Skills"} />
          </Container>
          <Row className="mt-3 align-items-center">
            {skills.map((skill) => (
              <Col xs={4} key={skill.id} className="my-md-5">
                <figure>
                  {skill.skill}
                  <figcaption>{skill.name}</figcaption>
                </figure>
              </Col>
            ))}
          </Row>
          {content.resume && (
            <a
              href={content.resume}
              onClick={() => track("Resume Clicked", { location: "Skills" })}
            >
              <Button
                size="lg"
                variant={theme === "light" ? "outline-dark" : "outline-light"}
                className="mt-5"
              >
                R&eacute;sum&eacute;
              </Button>
            </a>
          )}
        </Container>
      </section>
    </Element>
  );
};
// #endregion

export default Skills;
