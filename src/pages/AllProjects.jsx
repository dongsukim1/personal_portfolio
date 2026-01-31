import React from "react";
// Styles
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectProjects } from "../app/projectsSlice";
import { useGetUsersQuery, useGetProjectsQuery } from "../app/apiSlice";
// Icons
import { Icon } from "@iconify/react/dist/iconify.js";
// Components
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import Loading from "../components/Loading";
import Title from "../components/Title";
import ProjectCard from "../components/ProjectCard";
import BackToTop from "../components/BackToTop";
// Hooks
import { useTitle, TITLES } from "../hooks/useTitle";
// Components
import ErrorDisplay from "../components/ErrorDisplay";
// Constants
import { PAGINATION, ARIA_LABELS } from "../constants";
// Utils
import { isValidString} from "../utils";

// #region styled-components
const StyledSection = styled.section`
  .input-group {
    max-width: 90vw;
  }

  @media screen and (min-width: 800px) {
    .input-group {
      width: 75%;
    }
  }
`;
// #endregion

// #region component
const AllProjects = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [activePage, setActivePage] = React.useState(1);
  const data = useSelector(selectProjects);
  const { data: userData } = useGetUsersQuery();
  const { isLoading, isSuccess, isError, error } = useGetProjectsQuery();
  let content;

  // Use centralized title management
  useTitle(TITLES.ALL_PROJECTS, userData);

  const filteredData = React.useMemo(() => {
    return isValidString(searchInput)
      ? data.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : data;
    }, [data, searchInput]);

  const { ITEMS_PER_PAGE } = PAGINATION;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const pageItems = React.useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === activePage}
            onClick={() => setActivePage(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      });
    }, [activePage, totalPages]);

    // Set current page results
  const filteredResults = React.useMemo(() => {
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [activePage, filteredData, ITEMS_PER_PAGE]);

  React.useEffect(() => {
    setActivePage(1);
  }, [searchInput, data]);

  React.useEffect(() => {
    if (totalPages > 0 && activePage > totalPages) {
      setActivePage(totalPages);
    }
  }, [activePage, totalPages]);

  if (isLoading) {
    content = (
      <>
        <Container className="d-flex justify-content-center">
          <Title size={"h2"} text={"All Projects"} />
        </Container>
        <Container className="d-flex flex-column justify-content-center">
          <Loading />
        </Container>
      </>
    );
  } else if (isSuccess) {
    content = (
      <>
        <Container className="d-flex justify-content-center">
          <Title size={"h2"} text={"All Projects"} />
        </Container>
        <Container>
          <InputGroup className="mx-auto mb-3">
            <InputGroup.Text id="search">
              <Icon icon="ic:round-search" />
            </InputGroup.Text>
            <FormControl
              placeholder="Project name"
              aria-label={ARIA_LABELS.SEARCH_PROJECTS}
              aria-describedby="search"
              onChange={(e) => setSearchInput(e.currentTarget.value)}
            />
          </InputGroup>
          <Row xs={1} md={2} lg={3} className="g-4 justify-content-center row">
            {filteredResults.map((element) => (
              <Col key={element.id}>
                <ProjectCard
                  image={element.image}
                  name={element.name}
                  description={element.description}
                  url={element.html_url}
                  demo={element.homepage}
                  hasOnnxDemo={element.hasOnnxDemo}
                />
              </Col>
            ))}
          </Row>
          <Container className="d-flex justify-content-center mt-5">
            {pageItems.length <= 2 ? (
              <Pagination size="lg">{pageItems}</Pagination>
            ) : (
              <Pagination>
                <Pagination.Prev
                  onClick={() =>
                    activePage === 1
                      ? setActivePage(pageItems.length)
                      : setActivePage(activePage - 1)
                  }
                />
                {pageItems[0]}
                <Pagination.Ellipsis />
                <Pagination.Item active={true}>{activePage}</Pagination.Item>
                <Pagination.Ellipsis />
                {pageItems[pageItems.length - 1]}
                <Pagination.Next
                  onClick={() =>
                    activePage === pageItems.length
                      ? setActivePage(1)
                      : setActivePage(activePage + 1)
                  }
                />
              </Pagination>
            )}
          </Container>
        </Container>
      </>
    );
  } else if (isError) {
    content = <ErrorDisplay error={error} context="projects API" />;
  }

  return (
    <>
      <main>
        <StyledSection className="d-flex flex-column justify-content-center">
          {content}
        </StyledSection>
      </main>
      <BackToTop home={"Home"} />
    </>
  );
};
// #endregion

export default AllProjects;
