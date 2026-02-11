import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjects } from '../app/projectsSlice';
import { useConfig } from '../contexts/ConfigContext';

const normalizeRepoKey = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

// Create lookup maps from unified config for efficient matching
const createProjectMaps = (projectsConfig) => {
  const imageMap = new Map();
  const displayNameMap = new Map();
  const onnxDemoMap = new Map();
  const descriptionMap = new Map();
  const tagsMap = new Map();
  const demoUrlMap = new Map();
  const urlMap = new Map();
  const orderMap = new Map();
  
  projectsConfig.forEach((project, index) => {
    const repoKey = normalizeRepoKey(project.repoName);
    imageMap.set(repoKey, project.image);
    displayNameMap.set(repoKey, project.displayName);
    onnxDemoMap.set(repoKey, project.hasOnnxDemo);
    descriptionMap.set(repoKey, project.description);
    tagsMap.set(repoKey, project.tags);
    demoUrlMap.set(repoKey, project.demoUrl);
    urlMap.set(repoKey, project.url);
    const explicitOrder = Number(project.renderOrder);
    orderMap.set(
      repoKey,
      Number.isFinite(explicitOrder) ? explicitOrder : index
    );
  });
  
  return {
    imageMap,
    displayNameMap,
    onnxDemoMap,
    descriptionMap,
    tagsMap,
    demoUrlMap,
    urlMap,
    orderMap,
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
    orderMap,
  } = projectMaps;
  
  return projectsData
    .map((element, index) => {
    const repoKey = normalizeRepoKey(element.name);
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
      _sortOrder: orderMap.has(repoKey) ? orderMap.get(repoKey) : Number.MAX_SAFE_INTEGER,
      _originalIndex: index,
    };
    })
    .sort((a, b) => {
      if (a._sortOrder !== b._sortOrder) return a._sortOrder - b._sortOrder;
      return a._originalIndex - b._originalIndex;
    })
    .map(({ _sortOrder, _originalIndex, ...project }) => project);
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
