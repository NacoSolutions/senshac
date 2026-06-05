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
    ... on HomeBlocksHomeHero {
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
    ... on HomeBlocksHomeAbout {
      image
      title
      description
      ctaText
      ctaLink
    }
    ... on HomeBlocksAboutHero {
      title
    }
    ... on HomeBlocksBehindName {
      title
      p1
      p2
      footnote
    }
    ... on HomeBlocksBannerImage {
      image
      alt
    }
    ... on HomeBlocksBio {
      title
      image
      paragraphs
    }
    ... on HomeBlocksAwards {
      title
      items {
        __typename
        year
        project
        award
        link
      }
    }
    ... on HomeBlocksMission {
      title
      p1
      p2
      quote
    }
    ... on HomeBlocksServicesHero {
      title
    }
    ... on HomeBlocksServicesIntro {
      text
      image
    }
    ... on HomeBlocksServiceGroups {
      groups {
        __typename
        title
        items {
          __typename
          title
          description
        }
      }
    }
    ... on HomeBlocksFaq {
      title
      image
      items {
        __typename
        question
        answer
      }
    }
    ... on HomeBlocksWorkProcess {
      title
      p1
      p2
      image
    }
    ... on HomeBlocksContactForm {
      bannerImage
      heading
      subheading
    }
    ... on HomeBlocksEditorialHero {
      title
      intro
      ctaText
      ctaLink
      mediaType
      image
      imageAlt
      placeholderLabel
    }
    ... on HomeBlocksEditorialCopy {
      eyebrow
      title
      headingLevel
      body
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
      image
      imageAlt
      placeholderLabel
      ctaText
      ctaLink
      items {
        __typename
        title
        link
        image
        imageAlt
        placeholderLabel
      }
    }
    ... on HomeBlocksEditorialMission {
      label
      paragraphs
      statement
      image
      imageAlt
      placeholderLabel
    }
  }
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  title
  description
  heroImage
  blocks {
    __typename
    ... on AboutBlocksHomeHero {
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
    ... on AboutBlocksHomeAbout {
      image
      title
      description
      ctaText
      ctaLink
    }
    ... on AboutBlocksAboutHero {
      title
    }
    ... on AboutBlocksBehindName {
      title
      p1
      p2
      footnote
    }
    ... on AboutBlocksBannerImage {
      image
      alt
    }
    ... on AboutBlocksBio {
      title
      image
      paragraphs
    }
    ... on AboutBlocksAwards {
      title
      items {
        __typename
        year
        project
        award
        link
      }
    }
    ... on AboutBlocksMission {
      title
      p1
      p2
      quote
    }
    ... on AboutBlocksServicesHero {
      title
    }
    ... on AboutBlocksServicesIntro {
      text
      image
    }
    ... on AboutBlocksServiceGroups {
      groups {
        __typename
        title
        items {
          __typename
          title
          description
        }
      }
    }
    ... on AboutBlocksFaq {
      title
      image
      items {
        __typename
        question
        answer
      }
    }
    ... on AboutBlocksWorkProcess {
      title
      p1
      p2
      image
    }
    ... on AboutBlocksContactForm {
      bannerImage
      heading
      subheading
    }
    ... on AboutBlocksEditorialHero {
      title
      intro
      ctaText
      ctaLink
      mediaType
      image
      imageAlt
      placeholderLabel
    }
    ... on AboutBlocksEditorialCopy {
      eyebrow
      title
      headingLevel
      body
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
      image
      imageAlt
      placeholderLabel
      ctaText
      ctaLink
      items {
        __typename
        title
        link
        image
        imageAlt
        placeholderLabel
      }
    }
    ... on AboutBlocksEditorialMission {
      label
      paragraphs
      statement
      image
      imageAlt
      placeholderLabel
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
    ... on ServicesBlocksHomeHero {
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
    ... on ServicesBlocksHomeAbout {
      image
      title
      description
      ctaText
      ctaLink
    }
    ... on ServicesBlocksAboutHero {
      title
    }
    ... on ServicesBlocksBehindName {
      title
      p1
      p2
      footnote
    }
    ... on ServicesBlocksBannerImage {
      image
      alt
    }
    ... on ServicesBlocksBio {
      title
      image
      paragraphs
    }
    ... on ServicesBlocksAwards {
      title
      items {
        __typename
        year
        project
        award
        link
      }
    }
    ... on ServicesBlocksMission {
      title
      p1
      p2
      quote
    }
    ... on ServicesBlocksServicesHero {
      title
    }
    ... on ServicesBlocksServicesIntro {
      text
      image
    }
    ... on ServicesBlocksServiceGroups {
      groups {
        __typename
        title
        items {
          __typename
          title
          description
        }
      }
    }
    ... on ServicesBlocksFaq {
      title
      image
      items {
        __typename
        question
        answer
      }
    }
    ... on ServicesBlocksWorkProcess {
      title
      p1
      p2
      image
    }
    ... on ServicesBlocksContactForm {
      bannerImage
      heading
      subheading
    }
    ... on ServicesBlocksEditorialHero {
      title
      intro
      ctaText
      ctaLink
      mediaType
      image
      imageAlt
      placeholderLabel
    }
    ... on ServicesBlocksEditorialCopy {
      eyebrow
      title
      headingLevel
      body
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
      image
      imageAlt
      placeholderLabel
      ctaText
      ctaLink
      items {
        __typename
        title
        link
        image
        imageAlt
        placeholderLabel
      }
    }
    ... on ServicesBlocksEditorialMission {
      label
      paragraphs
      statement
      image
      imageAlt
      placeholderLabel
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
    ... on ContactBlocksHomeHero {
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
    ... on ContactBlocksHomeAbout {
      image
      title
      description
      ctaText
      ctaLink
    }
    ... on ContactBlocksAboutHero {
      title
    }
    ... on ContactBlocksBehindName {
      title
      p1
      p2
      footnote
    }
    ... on ContactBlocksBannerImage {
      image
      alt
    }
    ... on ContactBlocksBio {
      title
      image
      paragraphs
    }
    ... on ContactBlocksAwards {
      title
      items {
        __typename
        year
        project
        award
        link
      }
    }
    ... on ContactBlocksMission {
      title
      p1
      p2
      quote
    }
    ... on ContactBlocksServicesHero {
      title
    }
    ... on ContactBlocksServicesIntro {
      text
      image
    }
    ... on ContactBlocksServiceGroups {
      groups {
        __typename
        title
        items {
          __typename
          title
          description
        }
      }
    }
    ... on ContactBlocksFaq {
      title
      image
      items {
        __typename
        question
        answer
      }
    }
    ... on ContactBlocksWorkProcess {
      title
      p1
      p2
      image
    }
    ... on ContactBlocksContactForm {
      bannerImage
      heading
      subheading
    }
    ... on ContactBlocksEditorialHero {
      title
      intro
      ctaText
      ctaLink
      mediaType
      image
      imageAlt
      placeholderLabel
    }
    ... on ContactBlocksEditorialCopy {
      eyebrow
      title
      headingLevel
      body
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
      image
      imageAlt
      placeholderLabel
      ctaText
      ctaLink
      items {
        __typename
        title
        link
        image
        imageAlt
        placeholderLabel
      }
    }
    ... on ContactBlocksEditorialMission {
      label
      paragraphs
      statement
      image
      imageAlt
      placeholderLabel
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
      image
      alt
    }
    ... on ProjectsBlocksProjectDetails {
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
    ... on ProjectsBlocksProjectBrief {
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
    ... on ProjectsBlocksProjectConcept {
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
    ... on ProjectsBlocksProjectStrategy {
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
    ... on ProjectsBlocksProjectCollaborators {
      title
      list {
        __typename
        name
        role
      }
    }
    ... on ProjectsBlocksProjectFinalImage {
      src
      alt
    }
    ... on ProjectsBlocksBannerImage {
      image
      alt
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
      url: "https://content.tinajs.io/2.4/content/7a1540b8-e9a1-493f-8cc5-83d85b2c335d/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
