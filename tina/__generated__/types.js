export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SiteConfigPartsFragmentDoc = gql`
    fragment SiteConfigParts on SiteConfig {
  __typename
  siteUrl
  locales
  defaultLocale
  company {
    __typename
    name
    legalName
    description
    tagline
  }
  contact {
    __typename
    email
    phone
    phoneLink
    location {
      __typename
      city
      country
    }
  }
  founder {
    __typename
    name
  }
  socialLinks {
    __typename
    name
    url
    icon
  }
  attribution {
    __typename
    design
    development
  }
  branding {
    __typename
    logo
    logoWhite
    symbol
    symbolWhite
    ogImage
  }
  seo {
    __typename
    priceRange
  }
}
    `;
export const HomePartsFragmentDoc = gql`
    fragment HomeParts on Home {
  __typename
  title
  description
  headerStyle
  hero {
    __typename
    image
    topRight {
      __typename
      lines
    }
    tagline {
      __typename
      lines
    }
    taglineSub
  }
  about {
    __typename
    image
    title
    description
    ctaText
    ctaLink
  }
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  title
  description
  heroImage
  hero {
    __typename
    title
  }
  behindName {
    __typename
    title
    p1
    p2
    footnote
  }
  bannerImage
  bio {
    __typename
    title
    image
    paragraphs
  }
  awards {
    __typename
    title
    items {
      __typename
      year
      project
      award
      link
    }
  }
  mission {
    __typename
    title
    p1
    p2
    quote
  }
  missionImage
}
    `;
export const ServicesPartsFragmentDoc = gql`
    fragment ServicesParts on Services {
  __typename
  title
  description
  hero {
    __typename
    title
  }
  intro {
    __typename
    text
    image
  }
  serviceGroups {
    __typename
    title
    items {
      __typename
      title
      description
    }
  }
  faq {
    __typename
    title
    image
    items {
      __typename
      question
      answer
    }
  }
  workProcess {
    __typename
    title
    p1
    p2
    image
  }
}
    `;
export const ContactPartsFragmentDoc = gql`
    fragment ContactParts on Contact {
  __typename
  title
  description
  bannerImage
  heading
  subheading
}
    `;
export const LegalPartsFragmentDoc = gql`
    fragment LegalParts on Legal {
  __typename
  title
  description
  lastUpdated
  body
}
    `;
export const ProjectsPartsFragmentDoc = gql`
    fragment ProjectsParts on Projects {
  __typename
  title
  description
  slug
  publishDate
  completedDate
  tags
  showTags
  featured
  draft
  banner {
    __typename
    image
    alt
  }
  details {
    __typename
    title
    subtitle
    image
    services
    servicesLabel
    category
    categoryLabel
    area
    areaLabel
    location
    locationLabel
  }
  brief {
    __typename
    title
    text
    gallery {
      __typename
      cols
      images {
        __typename
        src
        alt
      }
    }
  }
  concept {
    __typename
    title
    text
    gallery {
      __typename
      cols
      images {
        __typename
        src
        alt
      }
    }
  }
  strategy {
    __typename
    title
    text
    carousel {
      __typename
      src
      alt
    }
    gallery {
      __typename
      cols
      images {
        __typename
        src
        alt
      }
    }
  }
  collaborators {
    __typename
    title
    list {
      __typename
      name
      role
    }
  }
  finalImage {
    __typename
    src
    alt
  }
}
    `;
export const TranslationsPartsFragmentDoc = gql`
    fragment TranslationsParts on Translations {
  __typename
  nav {
    __typename
    social
    menu
    letsTalk
    about
    projects
    services
    contact
  }
  footer {
    __typename
    privacy
    legal
    links {
      __typename
      label
      href
    }
  }
  contactForm {
    __typename
    name
    company
    email
    phone
    projectType
    projectTypes {
      __typename
      value
      label
    }
    serviceType
    serviceTypes {
      __typename
      value
      label
    }
    message
    privacy
    submit
    sending
    success
    error
    turnstileFailed
  }
  projects {
    __typename
    title
    description
    heading
  }
  accessibility {
    __typename
    skipToContent
    selectLanguage
    toggleMenu
    closeMenu
    previousSlide
    nextSlide
    goToSlide
  }
}
    `;
export const SiteConfigDocument = gql`
    query siteConfig($relativePath: String!) {
  siteConfig(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteConfigParts
  }
}
    ${SiteConfigPartsFragmentDoc}`;
export const SiteConfigConnectionDocument = gql`
    query siteConfigConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteConfigFilter) {
  siteConfigConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteConfigParts
      }
    }
  }
}
    ${SiteConfigPartsFragmentDoc}`;
export const HomeDocument = gql`
    query home($relativePath: String!) {
  home(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomeParts
  }
}
    ${HomePartsFragmentDoc}`;
export const HomeConnectionDocument = gql`
    query homeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeFilter) {
  homeConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomeParts
      }
    }
  }
}
    ${HomePartsFragmentDoc}`;
export const AboutDocument = gql`
    query about($relativePath: String!) {
  about(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutParts
  }
}
    ${AboutPartsFragmentDoc}`;
export const AboutConnectionDocument = gql`
    query aboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutFilter) {
  aboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutParts
      }
    }
  }
}
    ${AboutPartsFragmentDoc}`;
export const ServicesDocument = gql`
    query services($relativePath: String!) {
  services(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServicesParts
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ServicesConnectionDocument = gql`
    query servicesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesFilter) {
  servicesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServicesParts
      }
    }
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ContactDocument = gql`
    query contact($relativePath: String!) {
  contact(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactParts
  }
}
    ${ContactPartsFragmentDoc}`;
export const ContactConnectionDocument = gql`
    query contactConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactFilter) {
  contactConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactParts
      }
    }
  }
}
    ${ContactPartsFragmentDoc}`;
export const LegalDocument = gql`
    query legal($relativePath: String!) {
  legal(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...LegalParts
  }
}
    ${LegalPartsFragmentDoc}`;
export const LegalConnectionDocument = gql`
    query legalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LegalFilter) {
  legalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...LegalParts
      }
    }
  }
}
    ${LegalPartsFragmentDoc}`;
export const ProjectsDocument = gql`
    query projects($relativePath: String!) {
  projects(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProjectsParts
  }
}
    ${ProjectsPartsFragmentDoc}`;
export const ProjectsConnectionDocument = gql`
    query projectsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProjectsFilter) {
  projectsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProjectsParts
      }
    }
  }
}
    ${ProjectsPartsFragmentDoc}`;
export const TranslationsDocument = gql`
    query translations($relativePath: String!) {
  translations(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TranslationsParts
  }
}
    ${TranslationsPartsFragmentDoc}`;
export const TranslationsConnectionDocument = gql`
    query translationsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TranslationsFilter) {
  translationsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TranslationsParts
      }
    }
  }
}
    ${TranslationsPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    siteConfig(variables, options) {
      return requester(SiteConfigDocument, variables, options);
    },
    siteConfigConnection(variables, options) {
      return requester(SiteConfigConnectionDocument, variables, options);
    },
    home(variables, options) {
      return requester(HomeDocument, variables, options);
    },
    homeConnection(variables, options) {
      return requester(HomeConnectionDocument, variables, options);
    },
    about(variables, options) {
      return requester(AboutDocument, variables, options);
    },
    aboutConnection(variables, options) {
      return requester(AboutConnectionDocument, variables, options);
    },
    services(variables, options) {
      return requester(ServicesDocument, variables, options);
    },
    servicesConnection(variables, options) {
      return requester(ServicesConnectionDocument, variables, options);
    },
    contact(variables, options) {
      return requester(ContactDocument, variables, options);
    },
    contactConnection(variables, options) {
      return requester(ContactConnectionDocument, variables, options);
    },
    legal(variables, options) {
      return requester(LegalDocument, variables, options);
    },
    legalConnection(variables, options) {
      return requester(LegalConnectionDocument, variables, options);
    },
    projects(variables, options) {
      return requester(ProjectsDocument, variables, options);
    },
    projectsConnection(variables, options) {
      return requester(ProjectsConnectionDocument, variables, options);
    },
    translations(variables, options) {
      return requester(TranslationsDocument, variables, options);
    },
    translationsConnection(variables, options) {
      return requester(TranslationsConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
