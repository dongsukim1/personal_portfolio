import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    siteConfig,
    skillData,
    projectsConfig,
    navigationConfig,
    externalResourcesConfig,
    footerTheme,
    navLogo,
    moreInfo,
    resume,
    onnxDemoConfig
} from '../config';
import { processExternalResources } from '../utils/urlUtils';

const ConfigContext = createContext();

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};

const ConfigProvider = ({ children }) => {
    // Process and validate external resources
    const validatedExternalResources = processExternalResources(externalResourcesConfig);

    // Derive legacy arrays from unified config for backward compatibility
    const homepageProjects = projectsConfig.filter(p => p.showOnHomepage);
    const filteredProjects = homepageProjects.map(p => p.repoName);
    const projectCardImages = projectsConfig.map(p => ({ name: p.repoName, image: p.image }));
    const projectDisplayNames = Object.fromEntries(
        projectsConfig.map(p => [p.repoName, p.displayName])
    );
    const projectsWithOnnxDemo = projectsConfig
        .filter(p => p.hasOnnxDemo)
        .map(p => p.repoName);

    const config = {
        site: siteConfig,
        skills: skillData,
        navigation: {
            ...navigationConfig,
            externalResources: validatedExternalResources,
        },
        projects: {
            // New unified config
            config: projectsConfig,
            // Legacy derived arrays for backward compatibility
            filtered: filteredProjects,
            images: projectCardImages,
            displayNames: projectDisplayNames,
            withOnnxDemo: projectsWithOnnxDemo,
        },
        onnx: onnxDemoConfig,
        ui: {
            footerTheme,
            navLogo,
        },
        content: {
            moreInfo,
            resume,
        },
    };

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

ConfigProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ConfigProvider;