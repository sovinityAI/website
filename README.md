# Sovinity AI website

German-first, bilingual static website for **Sovinity**.

## Status

GitHub Pages publishes the site as a public **technical preview**. On 24 September 2026, the repository-path URL `https://sovinityai.github.io/website/` redirected to `https://sovinity.com/`. This does not mean that the domain setup or the indexed commercial launch is complete; those remain tracked in [#3](https://github.com/sovinityAI/website/issues/3) and [#4](https://github.com/sovinityAI/website/issues/4).

The German and English imprint and privacy pages contain published operator information. Their placeholders and review banners were removed under [#1](https://github.com/sovinityAI/website/issues/1). No external professional legal review was performed. Search indexing remains blocked by `robots.txt`.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Qualitätsprüfungen

Die statische Validierung und die Browserprüfungen lassen sich gemeinsam ausführen:

```bash
npm ci
npx playwright install chromium
npm test
```

`npm run test:static` prüft die vorhandenen Dateien, internen Links, den Visual Contract und grundlegende Kontraste. Die funktionalen Browserprüfungen starten einen lokalen Server und prüfen alle deutschen und englischen Seiten sowie die 404-Seite in einem Desktop- und einem Mobil-Viewport. Die Suite kontrolliert Überlauf, Navigation, Assets, interne Links, wesentliche Interaktionen, sichtbaren Tastaturfokus, reduzierte Bewegung und schwere automatisiert erkennbare Barrierefreiheitsverstöße.

Stabile Screenshots für Kopfbereich, Hero, Produktvorschau, CTA und Footer liegen unter `tests/browser/__screenshots__/`. Weil die Website bewusst lokale Systemschriften verwendet, laufen Screenshot-Vergleiche in der fest versionierten offiziellen Playwright-Umgebung. Dafür wird Docker benötigt:

```bash
npm run test:visual
```

Nach einer bewusst freigegebenen visuellen Änderung werden die Referenzen in derselben Umgebung aktualisiert und anschließend erneut geprüft:

```bash
npm run test:visual:update
npm run test:visual
```

Die CI führt weiterhin zuerst `scripts/validate_site.py` aus. Nur nach erfolgreicher statischer Validierung startet der Browser-Job; dort laufen funktionale und visuelle Prüfungen gemeinsam in derselben festgelegten Playwright-Umgebung.

## Structure

- `/` — German product page
- `/en/` — English product page
- `/preise/` and `/en/pricing/` — German and English pricing pages
- `/impressum/` and `/datenschutz/` — published German imprint and privacy notice
- `/en/imprint/` and `/en/privacy/` — published English versions
- `/assets/` — local CSS, JavaScript, and favicon

The site intentionally uses no analytics, advertising, external fonts, forms, trackers, or third-party embeds.

## Remaining launch work

- [#13](https://github.com/sovinityAI/website/issues/13) must clarify GitHub Pages' GDPR role and any applicable data-processing agreement before the final indexed/commercial launch or adding forms, tracking, accounts, or non-public personal data.
- [#12](https://github.com/sovinityAI/website/issues/12) tracks an additional direct contact channel before commercial lead capture, paid pilots, subscriptions, or online contract initiation.
- The [naming decision in #2](https://github.com/sovinityAI/website/issues/2) accepts the documented risk without a professional written clearance. [#3](https://github.com/sovinityAI/website/issues/3) still tracks complete domain and redirect setup, including `sovinity.de`.
- [#4](https://github.com/sovinityAI/website/issues/4) tracks the indexed/commercial launch, including the approved indexing policy, sitemap, canonical URLs, and metadata.

[`LEGAL-TODO.md`](LEGAL-TODO.md) records the completed legal-page work and the remaining publication gates. The published pages do not establish external legal approval.

## Content and licensing

All rights are reserved for this website repository's code, text, images, and other visual assets, except where an individual file expressly states otherwise. No open-source or content license granting general reuse is offered.

GitHub's [Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) permit viewing and forking a public repository through GitHub's features. Public visibility does not otherwise grant permission to use, modify, redistribute, or republish this material. Licensing of other Sovinity repositories is separate.
