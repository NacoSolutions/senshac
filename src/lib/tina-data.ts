import { requestWithMetadata } from '@tinacms/astro';
import { createClient } from 'tinacms/dist/client';
import { queries, type AboutQuery, type HomeQuery, type ProjectsQuery, type ServicesQuery, type TranslationsQuery, type ContactQuery, type LegalQuery } from '../../tina/__generated__/types';

export interface TinaRuntimeEnv {
  TINA_BRANCH?: string;
  CF_PAGES_BRANCH?: string;
  TINA_CLIENT_ID?: string;
  TINA_TOKEN?: string;
}

export function getTinaRuntimeEnv(locals: App.Locals): TinaRuntimeEnv | undefined {
  return (locals as { runtime?: { env?: TinaRuntimeEnv } }).runtime?.env;
}

function getClient(env?: TinaRuntimeEnv) {
  // Use local GraphQL server during development
  if (import.meta.env.DEV) {
    return createClient({
      url: 'http://localhost:4001/graphql',
      clientId: '',
      token: '',
      queries,
    });
  }

  const branch = env?.TINA_BRANCH || env?.CF_PAGES_BRANCH || import.meta.env.TINA_BRANCH || import.meta.env.CF_PAGES_BRANCH || 'main';
  const clientId = env?.TINA_CLIENT_ID || import.meta.env.TINA_CLIENT_ID || '';
  const token = env?.TINA_TOKEN || import.meta.env.TINA_TOKEN || '';

  return createClient({
    url: `https://content.tinajs.io/2.4/content/${clientId}/github/${branch}`,
    token,
    queries,
  });
}

export function pageRelativePath(lang: string | undefined, filename: string) {
  return `${lang || 'es'}/${filename}`;
}

export function getHome(relativePath: string, env?: TinaRuntimeEnv) {
  return requestWithMetadata<HomeQuery>(
    getClient(env).queries.home({ relativePath }),
    { priority: 'primary' }
  );
}

export function getAbout(relativePath: string, env?: TinaRuntimeEnv) {
  return requestWithMetadata<AboutQuery>(
    getClient(env).queries.about({ relativePath }),
    { priority: 'primary' }
  );
}

export function getServices(relativePath: string, env?: TinaRuntimeEnv) {
  return requestWithMetadata<ServicesQuery>(
    getClient(env).queries.services({ relativePath }),
    { priority: 'primary' }
  );
}

export function getProject(relativePath: string, env?: TinaRuntimeEnv) {
  return requestWithMetadata<ProjectsQuery>(
    getClient(env).queries.projects({ relativePath }),
    { priority: 'primary' }
  );
}

export function getTranslations(relativePath: string, env?: TinaRuntimeEnv) {
  return requestWithMetadata<TranslationsQuery>(
    getClient(env).queries.translations({ relativePath }),
    { priority: 'primary' }
  );
}

export function getContact(relativePath: string, env?: TinaRuntimeEnv) {
  return requestWithMetadata<ContactQuery>(
    getClient(env).queries.contact({ relativePath }),
    { priority: 'primary' }
  );
}

export function getLegal(relativePath: string, env?: TinaRuntimeEnv) {
  return requestWithMetadata<LegalQuery>(
    getClient(env).queries.legal({ relativePath }),
    { priority: 'primary' }
  );
}
