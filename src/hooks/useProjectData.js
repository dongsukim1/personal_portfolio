import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjects } from '../app/projectsSlice';
import { useConfig } from '../contexts/ConfigContext';

// Create lookup maps from unified config for efficient matching
const createProjectMaps = (projectsConfig) => {
  const imageMap = new Map();
  const displayNameMap = new Map();
  const onnxDemoMap = new Map();
  
  projectsConfig.forEach(project => {
    const lowerName = project.repoName.toLowerCase();
    imageMap.set(lowerName, project.image);
    displayNameMap.set(project.repoName, project.displayName);
    onnxDemoMap.set(project.repoName, project.hasOnnxDemo);
  });
  
  return { imageMap, displayNameMap, onnxDemoMap };
};

// Transform raw GitHub data into app format using unified config
const transformProjectData = (projectsData, projectMaps) => {
  const { imageMap, displayNameMap, onnxDemoMap } = projectMaps;
  
  return projectsData.map(element => ({
    id: element.id,
    homepage: element.homepage,
    description: element.description,
    name: displayNameMap.get(element.name) || element.name,
    originalName: element.name,
    html_url: element.html_url,
    image: imageMap.get(element.name.toLowerCase()) || null,
    hasOnnxDemo: onnxDemoMap.get(element.name) || false,
  }));
};

export const useProjectData = (projectsData) => {
  const dispatch = useDispatch();
  const { projects: projectConfig } = useConfig();

  useEffect(() => {
    if (!projectsData?.length) return;

    // Use unified config instead of separate arrays
    const projectMaps = createProjectMaps(projectConfig.config);
    const transformedData = transformProjectData(projectsData, projectMaps);

    dispatch(setProjects(transformedData));
  }, [projectsData, projectConfig.config, dispatch]);
};