// https://redux-toolkit.js.org/usage/usage-guide#simplifying-slices-with-createslice
import { configureStore } from "@reduxjs/toolkit";
//Reducers
import appReducer from "./appSlice";
import projectsReducer from "./projectsSlice";
// API
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    projects: projectsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["projects/setProjects", "projects/setMainProjects"],
        ignoredPaths: ["projects.projects", "projects.mainProjects"],
      },
    }).concat(apiSlice.middleware);
  },
});
