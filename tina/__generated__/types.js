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
  blocks {
    __typename
    ... on HomeBlocksContactForm {
      mediaId
      heading
      subheading
    }
    ... on HomeBlocksEditorialBanner {
      title
      subtitle
      topRight {
        __typename
        lines
      }
      mediaId
      imageAlt
      placeholderLabel
      objectFit
    }
    ... on HomeBlocksEditorialHero {
      title
      intro
      ctaText
      ctaLink
      mediaType
      mediaId
      imageAlt
      placeholderLabel
      objectFit
    }
    ... on HomeBlocksEditorialCopy {
      eyebrow
      title
      headingLevel
      body
      showStar
    }
    ... on HomeBlocksEditorialAccordion {
      intro
      items {
        __typename
        number
        title
        summary
        open
        details {
          __typename
          label
          text
        }
      }
    }
    ... on HomeBlocksEditorialRows {
      title
      intro
      items {
        __typename
        title
        text
      }
    }
    ... on HomeBlocksEditorialCta {
      text
      link
    }
    ... on HomeBlocksEditorialShowcase {
      eyebrow
      title
      mediaType
      mediaId
      imageAlt
      placeholderLabel
      ctaText
      ctaLink
      items {
        __typename
        title
        link
        mediaId
        imageAlt
        placeholderLabel
      }
    }
    ... on HomeBlocksEditorialMission {
      label
      content
      statement
      mediaId
      imageAlt
      placeholderLabel
    }
    ... on HomeBlocksEditorialCarousel {
      items {
        __typename
        mediaId
        alt
        caption
      }
    }
    ... on HomeBlocksEditorialInstagram {
      title
      description
      tag
      limit
      maxVisible
    }
    ... on HomeBlocksEditorialGallery {
      cols
      images {
        __typename
        mediaId
        alt
      }
    }
  }
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  title
  description
  blocks {
    __typename
    ... on AboutBlocksContactForm {
      mediaId
      heading
      subheading
    }
    ... on AboutBlocksEditorialBanner {
      title
      subtitle
      topRight {
        __typename
        lines
      }
      mediaId
      imageAlt
      placeholderLabel
      objectFit
    }
    ... on AboutBlocksEditorialHero {
      title
      intro
      ctaText
      ctaLink
      mediaType
      mediaId
      imageAlt
      placeholderLabel
      objectFit
    }
    ... on AboutBlocksEditorialCopy {
      eyebrow
      title
      headingLevel
      body
      showStar
    }
    ... on AboutBlocksEditorialAccordion {
      intro
      items {
        __typename
        number
        title
        summary
        open
        details {
          __typename
          label
          text
        }
      }
    }
    ... on AboutBlocksEditorialRows {
      title
      intro
      items {
        __typename
        title
        text
      }
    }
    ... on AboutBlocksEditorialCta {
      text
      link
    }
    ... on AboutBlocksEditorialShowcase {
      eyebrow
      title
      mediaType
      mediaId
      imageAlt
      placeholderLabel
      ctaText
      ctaLink
      items {
        __typename
        title
        link
        mediaId
        imageAlt
        placeholderLabel
      }
    }
    ... on AboutBlocksEditorialMission {
      label
      content
      statement
      mediaId
      imageAlt
      placeholderLabel
    }
    ... on AboutBlocksEditorialCarousel {
      items {
        __typename
        mediaId
        alt
        caption
      }
    }
    ... on AboutBlocksEditorialInstagram {
      title
      description
      tag
      limit
      maxVisible
    }
    ... on AboutBlocksEditorialGallery {
      cols
      images {
        __typename
        mediaId
        alt
      }
    }
  }
}
    `;
export const ServicesPartsFragmentDoc = gql`
    fragment ServicesParts on Services {
  __typename
  title
  description
  blocks {
    __typename
    ... on ServicesBlocksContactForm {
      mediaId
      heading
      subheading
    }
    ... on ServicesBlocksEditorialBanner {
      title
      subtitle
      topRight {
        __typename
        lines
      }
      mediaId
      imageAlt
      placeholderLabel
      objectFit
    }
    ... on ServicesBlocksEditorialHero {
      title
      intro
      ctaText
      ctaLink
      mediaType
      mediaId
      imageAlt
      placeholderLabel
      objectFit
    }
    ... on ServicesBlocksEditorialCopy {
      eyebrow
      title
      headingLevel
      body
      showStar
    }
    ... on ServicesBlocksEditorialAccordion {
      intro
      items {
        __typename
        number
        title
        summary
        open
        details {
          __typename
          label
          text
        }
      }
    }
    ... on ServicesBlocksEditorialRows {
      title
      intro
      items {
        __typename
        title
        text
      }
    }
    ... on ServicesBlocksEditorialCta {
      text
      link
    }
    ... on ServicesBlocksEditorialShowcase {
      eyebrow
      title
      mediaType
      mediaId
      imageAlt
      placeholderLabel
      ctaText
      ctaLink
      items {
        __typename
        title
        link
        mediaId
        imageAlt
        placeholderLabel
      }
    }
    ... on ServicesBlocksEditorialMission {
      label
      content
      statement
      mediaId
      imageAlt
      placeholderLabel
    }
    ... on ServicesBlocksEditorialCarousel {
      items {
        __typename
        mediaId
        alt
        caption
      }
    }
    ... on ServicesBlocksEditorialInstagram {
      title
      description
      tag
      limit
      maxVisible
    }
    ... on ServicesBlocksEditorialGallery {
      cols
      images {
        __typename
        mediaId
        alt
      }
    }
  }
}
    `;
export const ContactPartsFragmentDoc = gql`
    fragment ContactParts on Contact {
  __typename
  title
  description
  blocks {
    __typename
    ... on ContactBlocksContactForm {
      mediaId
      heading
      subheading
    }
    ... on ContactBlocksEditorialBanner {
      title
      subtitle
      topRight {
        __typename
        lines
      }
      mediaId
      imageAlt
      placeholderLabel
      objectFit
    }
    ... on ContactBlocksEditorialHero {
      title
      intro
      ctaText
      ctaLink
      mediaType
      mediaId
      imageAlt
      placeholderLabel
      objectFit
    }
    ... on ContactBlocksEditorialCopy {
      eyebrow
      title
      headingLevel
      body
      showStar
    }
    ... on ContactBlocksEditorialAccordion {
      intro
      items {
        __typename
        number
        title
        summary
        open
        details {
          __typename
          label
          text
        }
      }
    }
    ... on ContactBlocksEditorialRows {
      title
      intro
      items {
        __typename
        title
        text
      }
    }
    ... on ContactBlocksEditorialCta {
      text
      link
    }
    ... on ContactBlocksEditorialShowcase {
      eyebrow
      title
      mediaType
      mediaId
      imageAlt
      placeholderLabel
      ctaText
      ctaLink
      items {
        __typename
        title
        link
        mediaId
        imageAlt
        placeholderLabel
      }
    }
    ... on ContactBlocksEditorialMission {
      label
      content
      statement
      mediaId
      imageAlt
      placeholderLabel
    }
    ... on ContactBlocksEditorialCarousel {
      items {
        __typename
        mediaId
        alt
        caption
      }
    }
    ... on ContactBlocksEditorialInstagram {
      title
      description
      tag
      limit
      maxVisible
    }
    ... on ContactBlocksEditorialGallery {
      cols
      images {
        __typename
        mediaId
        alt
      }
    }
  }
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
  blocks {
    __typename
    ... on ProjectsBlocksProjectBanner {
      mediaId
      alt
    }
    ... on ProjectsBlocksProjectDetails {
      title
      subtitle
      mediaId
      services
      servicesLabel
      category
      categoryLabel
      area
      areaLabel
      location
      locationLabel
    }
    ... on ProjectsBlocksProjectBrief {
      title
      text
    }
    ... on ProjectsBlocksProjectConcept {
      title
      text
    }
    ... on ProjectsBlocksProjectStrategy {
      title
      text
    }
    ... on ProjectsBlocksProjectCollaborators {
      title
      list {
        __typename
        name
        role
      }
    }
    ... on ProjectsBlocksProjectFinalImage {
      mediaId
      alt
    }
    ... on ProjectsBlocksEditorialGallery {
      cols
      images {
        __typename
        mediaId
        alt
      }
    }
    ... on ProjectsBlocksEditorialCarousel {
      items {
        __typename
        mediaId
        alt
        caption
      }
    }
    ... on ProjectsBlocksEditorialInstagram {
      title
      description
      tag
      limit
      maxVisible
    }
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
    links {
      __typename
      label
      href
    }
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
    invalidEmail
    missingFields
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
