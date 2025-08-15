import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    siteConfig,
    skillData,
    filteredProjects,
    projectCardImages,
    projectDisplayNames,
    navigationConfig,
    footerTheme,
    navLogo,
    moreInfo,
    resume
} from '../config';

const ConfigContext = createContext();

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};

const ConfigProvider = ({ children }) => {
    const config = {
        site: siteConfig,
        skills: skillData,
        navigation: navigationConfig,
        projects: {
            filtered: filteredProjects,
            images: projectCardImages,
            displayNames: projectDisplayNames,
        },
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