import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    siteConfig,
    skillData,
    projectsConfig,
    navigationConfig,
    externalResourcesConfig,
    footerTheme,
    moreInfo,
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

    const config = {
        site: siteConfig,
        skills: skillData,
        navigation: {
            ...navigationConfig,
            externalResources: validatedExternalResources,
        },
        projects: {
            config: projectsConfig,
        },
        onnx: onnxDemoConfig,
        ui: {
            footerTheme,
        },
        content: {
            moreInfo,
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
