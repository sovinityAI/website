# Sovinity-AI-Website

Deutschsprachige, zweisprachig verfügbare statische Website für **Sovinity**.

## Status

GitHub Pages veröffentlicht die Website als öffentliche **technische Vorschau**. Am 24. September 2026 leitete die Repository-URL `https://sovinityai.github.io/website/` auf `https://sovinity.com/` weiter. Das bedeutet nicht, dass die Domain-Einrichtung oder der indexierte kommerzielle Start abgeschlossen ist; diese Arbeiten werden weiterhin in [#3](https://github.com/sovinityAI/website/issues/3) und [#4](https://github.com/sovinityAI/website/issues/4) verfolgt.

Das deutsche und englische Impressum sowie die deutschen und englischen Datenschutzhinweise enthalten veröffentlichte Betreiberangaben. Ihre Platzhalter und Prüfhinweise wurden mit [#1](https://github.com/sovinityAI/website/issues/1) entfernt. Eine externe professionelle Rechtsprüfung fand nicht statt. `robots.txt` verhindert weiterhin die Suchmaschinenindexierung.

## Lokale Vorschau

```bash
python3 -m http.server 8080
```

Danach `http://localhost:8080` öffnen.

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

## Struktur

- `/` — deutsche Produktseite
- `/en/` — englische Produktseite
- `/preise/` und `/en/pricing/` — deutsche und englische Preisseite
- `/impressum/` und `/datenschutz/` — veröffentlichtes deutsches Impressum und veröffentlichte deutsche Datenschutzhinweise
- `/en/imprint/` und `/en/privacy/` — veröffentlichte englische Fassungen
- `/assets/` — lokale CSS-, JavaScript- und Favicon-Dateien

Die Website verwendet bewusst keine Analysewerkzeuge, Werbung, externen Schriftarten, Formulare, Tracker oder Einbettungen Dritter.

## Verbleibende Arbeiten vor dem Start

- [#13](https://github.com/sovinityAI/website/issues/13) muss vor dem endgültigen indexierten beziehungsweise kommerziellen Start oder dem Hinzufügen von Formularen, Tracking, Konten oder nicht öffentlichen personenbezogenen Daten die DSGVO-Rolle von GitHub Pages und eine gegebenenfalls anwendbare Auftragsverarbeitungsvereinbarung klären.
- [#12](https://github.com/sovinityAI/website/issues/12) verfolgt einen zusätzlichen direkten Kontaktkanal, der vor kommerzieller Lead-Erfassung, bezahlten Pilotprojekten, Abonnements oder Online-Vertragsabschlüssen erforderlich ist.
- Die [Namensentscheidung in #2](https://github.com/sovinityAI/website/issues/2) akzeptiert das dokumentierte Risiko ohne professionelle schriftliche Freigabe. [#3](https://github.com/sovinityAI/website/issues/3) verfolgt weiterhin die vollständige Domain- und Weiterleitungseinrichtung einschließlich `sovinity.de`.
- [#4](https://github.com/sovinityAI/website/issues/4) verfolgt den indexierten beziehungsweise kommerziellen Start einschließlich freigegebener Indexierungsrichtlinie, Sitemap, kanonischer URLs und Metadaten.

[`LEGAL-TODO.md`](LEGAL-TODO.md) dokumentiert die abgeschlossenen Arbeiten an den Rechtstexten und die verbleibenden Veröffentlichungs-Gates. Die veröffentlichten Seiten stellen keine externe rechtliche Freigabe dar.

## Inhalte und Lizenzierung

Für Code, Texte, Bilder und andere visuelle Inhalte dieses Website-Repositories bleiben alle Rechte vorbehalten, sofern eine einzelne Datei nicht ausdrücklich etwas anderes bestimmt. Es wird keine Open-Source- oder Inhaltslizenz angeboten, die eine allgemeine Weiterverwendung erlaubt.

Die [Nutzungsbedingungen von GitHub](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) erlauben, ein öffentliches Repository über die GitHub-Funktionen anzusehen und zu forken. Die öffentliche Sichtbarkeit erteilt darüber hinaus keine Erlaubnis, dieses Material zu verwenden, zu verändern, weiterzugeben oder erneut zu veröffentlichen. Für andere Sovinity-Repositories gelten eigene Lizenzbedingungen.
