---
title: Product Context
type: note
permalink: product-context
---

# Product Context: Senshac

## Why This Project Exists

Migration from WordPress to a modern JAMstack approach for improved:

- Performance (static HTML vs PHP)
- Security (no database, no PHP vulnerabilities)
- Developer experience (type-safe, reproducible builds)
- Hosting flexibility (any static host)
- Maintenance burden (no WordPress/plugin updates)

## Problems Solved

1. **WordPress overhead** - Heavy CMS for what appears to be content-focused site
2. **Performance** - Static sites load faster than dynamic PHP
3. **Security surface** - WordPress is a common attack target
4. **Dependency management** - Nix provides reproducible dev environment

## Target Users

- Site visitors (end users)
- Developers maintaining the site

## UX Goals

- Fast page loads
- Accessible design
- Multilingual support (es_ES, ca locales detected in reference)
- Interactive elements where needed (Alpine.js)
- Progressive enhancement (HTMX for dynamic content)
