import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjects } from '../app/projectsSlice';
import { useConfig } from '../contexts/ConfigContext';

// Create lookup maps from unified config for efficient matching
const createProjectMaps = (projectsConfig) => {
  const imageMap = new Map();
  const displayNameMap = new Map();
  const onnxDemoMap = new Map();
  const descriptionMap = new Map();
  const tagsMap = new Map();
  const demoUrlMap = new Map();
  const urlMap = new Map();
  
  projectsConfig.forEach(project => {
    const lowerName = project.repoName.toLowerCase();
    imageMap.set(lowerName, project.image);
    displayNameMap.set(lowerName, project.displayName);
    onnxDemoMap.set(lowerName, project.hasOnnxDemo);
    descriptionMap.set(lowerName, project.description);
    tagsMap.set(lowerName, project.tags);
    demoUrlMap.set(lowerName, project.demoUrl);
    urlMap.set(lowerName, project.url);
  });
  
  return {
    imageMap,
    displayNameMap,
    onnxDemoMap,
    descriptionMap,
    tagsMap,
    demoUrlMap,
    urlMap,
  };
};

// Transform raw GitHub data into app format using unified config
const transformProjectData = (projectsData, projectMaps) => {
  const {
    imageMap,
    displayNameMap,
    onnxDemoMap,
    descriptionMap,
    tagsMap,
    demoUrlMap,
    urlMap,
  } = projectMaps;
  
  return projectsData.map(element => {
    const repoKey = element.name.toLowerCase();
    const configuredTags = tagsMap.get(repoKey);

    return {
      id: element.id,
      homepage: demoUrlMap.get(repoKey) ?? element.homepage,
      description: descriptionMap.get(repoKey) ?? element.description,
      name: displayNameMap.get(repoKey) ?? element.name,
      originalName: element.name,
      html_url: urlMap.get(repoKey) ?? element.html_url,
      image: imageMap.get(repoKey) || null,
      hasOnnxDemo: onnxDemoMap.get(repoKey) ?? false,
      tags: Array.isArray(configuredTags) ? configuredTags : null,
    };
  });
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
