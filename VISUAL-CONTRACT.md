# Umsetzung des visuellen Vertrags auf der Website

Status: **lokale Umsetzung freigegeben**

Vertragsversion: **0.1.0**

Kanonische Quelle: [`sovinityAI/product/design/visual-contract.md`](https://github.com/sovinityAI/product/blob/main/design/visual-contract.md)

Tracking: [sovinityAI/website#6](https://github.com/sovinityAI/website/issues/6)

## Lokaler Snapshot

Die statische Website lädt keine Gestaltungsdaten, Schriftarten oder UI-Bibliotheken aus einem anderen Repository oder von einem externen Dienst. Der benötigte Vertragsstand ist vollständig eingecheckt:

- `assets/visual-contract.css` enthält die semantischen Marketing-Tokens aus Version 0.1.0.
- `assets/brand/mark-primary.svg` und `mark-inverse.svg` sind die kanonischen Markenvarianten.
- `assets/favicon.svg` verwendet dieselbe gezeichnete, schriftunabhängige Form.
- Jedes HTML-Dokument nennt die übernommene Version im Attribut `data-visual-contract-version`.
- `assets/styles.css` setzt die Website-Variante um und importiert den Snapshot lokal.

## Zuordnung des Bestands

| Bereich | Übernommen oder angeglichen | Bewusste Website-Variante |
|---|---|---|
| Marke | gezeichnete S-Marke, inverse Footervariante, visuelle Wortmarke „sovinity“, Produktname „Sovinity“ | 36-px-Lockup in der großzügigen Navigation statt kompakter App-Header |
| Farben | semantische Marketingwerte für Hintergrund, Flächen, Text, Linien, Marke, Akzent, Hervorhebung und Fokus | warme Papierfläche statt neutralem Workspace-Hintergrund |
| Typografie | lokale System-Sans für UI und Fließtext, gemeinsame Größenrollen | Georgia nur für große Marketingüberschriften und redaktionelle Ziffern |
| Abstände und Radien | gemeinsame 4-px-Basis und 8/12/16/22/28-px-Radien | 64–96-px-Abschnittsrhythmus und Displayradien für Marketingrahmen |
| Buttons und Navigation | gemeinsame Marken-, Hover- und Fokusrollen; mindestens 44-px-Mobilziel | 50-px-Marketingbuttons und höchstens 2-px-Hover-Anhebung |
| Karten und Paneele | Linie plus semantische Fläche; 12–22-px-Komponentenradien | großer Marketing-Schatten nur an Produktour und Displayelementen |
| Quellen und Zitate | echte Desktop-Aufnahmen zeigen Frage, nummerierte Belege und Originalprüfung | Darstellung als zugängliche dreistufige Produktour statt interaktiver Dokumentarbeit |
| Bewegung | gemeinsame Dauer-/Easing-Tokens und vollständige Reduktion bei `prefers-reduced-motion` | dezente Hover-Anhebung bleibt nur ohne Reduktionswunsch aktiv |
| Icons | Lucide-Menüpfad mit zugänglichem Namen | Datenfluss-Pfeile bleiben beschriftete Diagrammnotation, keine Funktionsicons |

## Geltungsbereich

Die Identität gilt einheitlich für:

- deutsche und englische Startseite,
- deutsche und englische Preisseite,
- Impressum und Datenschutz in beiden Sprachen,
- die 404-Seite,
- Header, Footer, Metadaten, Favicon und mobile Navigation.

Texte zu Funktionen, Preisen, Verfügbarkeit, Recht und Datenschutz werden durch diese Gestaltungssynchronisation nicht erweitert oder fachlich verändert. Die pausierte Cloud-Anwendung ist keine visuelle Referenz für diese Umsetzung.

## Prüfroutine

1. `python3 scripts/validate_site.py`
2. `git diff --check`
3. Start-, Preis- und Rechtseiten in Deutsch und Englisch sowie die 404-Seite prüfen.
4. Repräsentative Breiten von 360 px, 768 px und mindestens 1180 px kontrollieren.
5. Skip-Link, mobile Navigation, Produktour, FAQ, Sprachwechsel und Fokuspfad per Tastatur prüfen.
6. Reduzierte Bewegung emulieren und sicherstellen, dass keine Information von Bewegung abhängt.
7. Öffentliche Aussagen mit dem unveränderten Seiteninhalt und dem aktuellen Desktop-Stand abgleichen.
