# Sovinity AI website

German-first, bilingual static website for **Sovinity AI** and the working product name **Divinity**.

## Status

The repository is public, but GitHub Pages is intentionally **not enabled yet**. The legal pages contain `LEGAL_TODO` markers. Publishing is blocked until those details have been supplied and reviewed and both the company and product names have been cleared.

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
4. Replace **Divinity** and complete professional clearance for the replacement product name.
5. Complete professional clearance of **Sovinity**, including similarity to the established European cloud provider **Solvinity**.
6. Use `sovinity.com` as the intended canonical domain and redirect `sovinity.de` to the German version only after the naming clearance passes.
7. Configure DNS and GitHub Pages only after the preceding gates pass.
8. Update `robots.txt`, `sitemap.xml`, canonical URLs, and Open Graph URLs for the chosen domain.

## Content and licensing

No open-source license has been selected for this website repository. Public visibility does not grant reuse rights. Product and source-code licensing will be decided separately.
