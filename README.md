# Sovinity AI website

German-first, bilingual static website for **Sovinity**.

## Status

GitHub Pages publishes the current site as a **technical preview** at `https://sovinityai.github.io/website/`. The legal pages still contain `LEGAL_TODO` markers, search indexing remains blocked, and the custom domains must not be treated as a production launch until the operator details and naming review are complete.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Structure

- `/` — German product page
- `/en/` — English product page
- `/impressum/` and `/datenschutz/` — German legal drafts
- `/en/imprint/` and `/en/privacy/` — English translations
- `/assets/` — local CSS, JavaScript, and favicon

The site intentionally uses no analytics, advertising, external fonts, forms, trackers, or third-party embeds.

## Before publication

1. Complete every item in [`LEGAL-TODO.md`](LEGAL-TODO.md).
2. Remove all `LEGAL_TODO` markers and draft warnings.
3. Have the legal pages reviewed for the actual operator.
4. Complete professional clearance of **Sovinity**, including similarity to the established European cloud provider **Solvinity**.
5. Use `sovinity.com` as the intended canonical domain and redirect `sovinity.de` to the German version only after the naming clearance passes.
6. Configure the custom-domain DNS only after the preceding gates pass. GitHub Pages currently serves the repository-path preview.
7. Update `robots.txt`, `sitemap.xml`, canonical URLs, and Open Graph URLs for the chosen domain.

## Content and licensing

No open-source license has been selected for this website repository. Public visibility does not grant reuse rights. Product and source-code licensing will be decided separately.
