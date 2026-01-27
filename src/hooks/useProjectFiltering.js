import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMainProjects, selectProjects } from '../app/projectsSlice';
import { useConfig } from '../contexts/ConfigContext';

export const useProjectFiltering = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const { projects: projectConfig } = useConfig();

  useEffect(() => {
    if (!projects.length) return;

    // Get projects marked for homepage display from unified config
    const homepageRepoNames = projectConfig.config
      .filter(p => p.showOnHomepage)
      .map(p => p.repoName);
    
    // Debug logging
    console.log('All projects from GitHub:', projects.map(p => ({ name: p.name, originalName: p.originalName })));
    console.log('Homepage projects config:', homepageRepoNames);
    
    if (homepageRepoNames.length > 0) {
      const filteredData = projects.filter(project =>
        homepageRepoNames.includes(project.originalName || project.name)
      );
      
      console.log('Matched homepage projects:', filteredData.map(p => ({ name: p.name, originalName: p.originalName })));
      
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