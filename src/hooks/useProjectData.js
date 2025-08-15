import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjects } from '../app/projectsSlice';
import { useConfig } from '../contexts/ConfigContext';

// Utility function for efficient image matching
const createImageMap = (projectCardImages) => {
  return new Map(
    projectCardImages.map(img => [img.name.toLowerCase(), img.image])
  );
};

// Transform raw GitHub data into app format
const transformProjectData = (projectsData, imageMap, displayNames) => {
  return projectsData.map(element => ({
    id: element.id,
    homepage: element.homepage,
    description: element.description,
    name: element.name,
    originalName: element.name,
    html_url: element.html_url,
    image: imageMap.get(element.name.toLowerCase()) || null,
  })).map(project => ({
    ...project,
    name: displayNames[project.originalName] || project.originalName,
  }));
};

export const useProjectData = (projectsData) => {
  const dispatch = useDispatch();
  const { projects: projectConfig } = useConfig();

  useEffect(() => {
    if (!projectsData?.length) return;

    const imageMap = createImageMap(projectConfig.images);
    const transformedData = transformProjectData(
      projectsData, 
      imageMap, 
      projectConfig.displayNames
    );

    dispatch(setProjects(transformedData));
  }, [projectsData, projectConfig.images, projectConfig.displayNames, dispatch]);
};