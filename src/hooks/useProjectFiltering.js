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

    const { filtered: filteredProjects } = projectConfig;
    
    if (filteredProjects?.length > 0) {
      const filteredData = projects.filter(project =>
        filteredProjects.includes(project.originalName || project.name)
      );
      
      const mainProjects = filteredData.length > 0 
        ? filteredData 
        : projects.slice(0, 3);
        
      dispatch(setMainProjects(mainProjects));
    } else {
      dispatch(setMainProjects(projects.slice(0, 3)));
    }
  }, [projects, projectConfig, dispatch]);
};