import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProjects, selectProjects } from '../app/projectsSlice';
import { useConfig } from '../contexts/ConfigContext';

const normalizeRepoKey = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

export const useProjectFiltering = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const { projects: projectConfig } = useConfig();

  useEffect(() => {
    if (!projects.length) return;

    // Get projects marked for homepage display in renderOrder (then config order)
    const orderedHomepageConfig = [...projectConfig.config]
      .filter(p => p.showOnHomepage)
      .sort((a, b) => {
        const orderA = Number(a.renderOrder);
        const orderB = Number(b.renderOrder);
        const hasOrderA = Number.isFinite(orderA);
        const hasOrderB = Number.isFinite(orderB);

        if (hasOrderA && hasOrderB) return orderA - orderB;
        if (hasOrderA) return -1;
        if (hasOrderB) return 1;
        return 0;
      });

    const homepageRepoNames = projectConfig.config
      .filter(p => p.showOnHomepage)
      .map(p => normalizeRepoKey(p.repoName));
    
    const orderedHomepageRepoNames = orderedHomepageConfig
      .map(p => normalizeRepoKey(p.repoName));

    if (homepageRepoNames.length > 0) {
      const projectsByRepo = new Map(
        projects.map(project => [
          normalizeRepoKey(project.originalName || project.name),
          project,
        ])
      );
      const filteredData = orderedHomepageRepoNames
        .map(repoName => projectsByRepo.get(repoName))
        .filter(Boolean);

      const mainProjects = filteredData.length > 0 
        ? filteredData 
        : projects.slice(0, 3);
        
      dispatch(setMainProjects(mainProjects));
    } else {
      // Fallback: show first 3 projects if no homepage projects configured
      dispatch(setMainProjects(projects.slice(0, 3)));
    }
  }, [projects, projectConfig.config, dispatch]);
};
