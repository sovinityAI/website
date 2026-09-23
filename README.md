# Sovinity AI website

German-first, bilingual static website for **Sovinity AI** and the working product name **Divinity**.

## Status

The repository is public, but GitHub Pages is intentionally **not enabled yet**. The legal pages contain `LEGAL_TODO` markers. Publishing is blocked until those details have been supplied, reviewed, and committed.

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
4. Complete trademark clearance for the product name **Divinity**.
5. Decide whether `sovinity.de` or a product subdomain is the canonical URL.
6. Configure DNS and GitHub Pages only after the preceding gates pass.
7. Update `robots.txt`, `sitemap.xml`, canonical URLs, and Open Graph URLs for the chosen domain.

## Content and licensing

No open-source license has been selected for this website repository. Public visibility does not grant reuse rights. Product and source-code licensing will be decided separately.
