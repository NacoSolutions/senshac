import type { QueryResult } from '@tinacms/astro';
import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { AboutQuery, HomeQuery, ProjectsQuery, ServicesQuery } from '../../tina/__generated__/types';
import AboutPage from '../components/islands/AboutPage.astro';
import HomePage from '../components/islands/HomePage.astro';
import ProjectPage from '../components/islands/ProjectPage.astro';
import ServicesPage from '../components/islands/ServicesPage.astro';
import { getAbout, getHome, getProject, getServices, type TinaRuntimeEnv } from './tina-data';

export function createIslands(env?: TinaRuntimeEnv): IslandRegistry {
  return {
    home: {
      fetch: (_request, params) => getHome(params.get('relativePath') ?? 'es/home.json', env),
      component: HomePage,
      wrapper: { tag: 'main' },
      propsFromData: (data) => ({
        data: (data as QueryResult<HomeQuery>).data.home,
      }),
    },
    about: {
      fetch: (_request, params) => getAbout(params.get('relativePath') ?? 'es/about.json', env),
      component: AboutPage,
      wrapper: { tag: 'main', className: 'min-h-screen' },
      propsFromData: (data) => ({
        data: (data as QueryResult<AboutQuery>).data.about,
      }),
    },
    services: {
      fetch: (_request, params) => getServices(params.get('relativePath') ?? 'es/services.json', env),
      component: ServicesPage,
      wrapper: { tag: 'main', className: 'min-h-screen' },
      propsFromData: (data) => ({
        data: (data as QueryResult<ServicesQuery>).data.services,
      }),
    },
    project: {
      fetch: (_request, params) => getProject(params.get('relativePath') ?? 'es/la-trobada.json', env),
      component: ProjectPage,
      wrapper: { tag: 'main', className: 'min-h-screen' },
      propsFromData: (data) => ({
        data: (data as QueryResult<ProjectsQuery>).data.projects,
      }),
    },
  };
}
