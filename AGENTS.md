# Arbeitsvereinbarung für Menschen und KI im Website-Repository

## GitHub-Auftragsvertrag

- GitHub Issues sind die verbindliche Quelle für geplante Arbeit. Das organisationsweite Project ist [Sovinity Product](https://github.com/orgs/sovinityAI/projects/1).
- Umsetzungsarbeit benötigt ein offenes Issue in `sovinityAI/website` oder ein ausdrücklich verknüpftes repositoryübergreifendes Issue. Analyse und reine Leseprüfungen benötigen kein Issue.
- Lies vor jeder Änderung das vollständige Issue einschließlich Kommentaren, Labels, Abhängigkeiten, verknüpften Pull Requests und Akzeptanzkriterien.
- Halte Änderungen innerhalb des Issue-Scopes. Neu entdeckte Arbeit wird als separates verknüpftes Issue erfasst, statt den Scope stillschweigend zu erweitern.
- Markiere ein Issue erst dann als abgeschlossen, wenn jedes Akzeptanzkriterium anhand konkreter Nachweise geprüft wurde.
- Chats, lokale Notizen und Agenten-Memory sind kein dauerhafter Auftragsstand. Halte Entscheidungen, Blocker, Übergaben und Abschlussnachweise im GitHub Issue oder im verknüpften Pull Request fest.
- Neue und wesentlich überarbeitete interne Arbeit wird nach [`sovinityAI/.github/SPRACHE.md`](https://github.com/sovinityAI/.github/blob/main/SPRACHE.md) auf Deutsch geführt.

## Verbindliche Project-Synchronisierung

Menschen und KI-Agenten verwenden den in [`sovinityAI/.github/WORKFLOW.md`](https://github.com/sovinityAI/.github/blob/main/WORKFLOW.md) dokumentierten Lebenszyklus:

- **Backlog**: gültige Arbeit, die noch nicht bereit oder ausgewählt ist.
- **Bereit**: ausreichend beschrieben, nicht blockiert, manuell eingeordnet, nicht zugewiesen und für geeignete Mitwirkende verfügbar.
- **In Arbeit**: Ein Mensch oder KI-Agent hat das Issue übernommen und arbeitet aktiv daran.
- **Benötigt Input**: Die Arbeit pausiert wegen einer benannten Entscheidung, Abhängigkeit, sensiblen Information oder externen Zuständigkeit.
- **In Prüfung**: Ein Ergebnis liegt vor und wartet auf menschliche, rechtliche, visuelle oder technische Prüfung.
- **Erledigt**: Die Akzeptanzkriterien sind nachgewiesen und das Issue ist geschlossen.

Halte das Project-Feld **Arbeitsart** aktuell: `Alle Mitwirkenden`, `KI-geeignet`, `Menschliche Entscheidung`, `Gemeinsame Arbeit` oder `Extern`. Es beschreibt die Arbeit und weist sie niemandem zu.

- Behandle die bestätigte Zuordnung zu `sovinityAI/projects/1` als Aufnahme-Gate. Bei Erstellung per CLI, API oder außerhalb der gemeinsamen Formulare: Issue sofort zum Project hinzufügen und die Zuordnung zurücklesen. Ohne bestätigte Zuordnung keine Zuweisung, kein Status **In Arbeit**, kein Branch und keine Umsetzung.
- Übernimm Arbeit nur aus **Bereit**, nachdem du geprüft hast, dass sie nicht zugewiesen oder bereits übernommen ist. Weise das verantwortliche GitHub-Konto zu, ergänze bei Bedarf einen KI-Übernahmekommentar und verschiebe das Issue vor der Bearbeitung nach **In Arbeit**.
- Begrenze parallele Arbeit auf ein Umsetzungs-Issue pro mitwirkender Person oder KI-Sitzung, sofern keine dokumentierte Ausnahme erforderlich ist.
- Bei einer Pause: Dokumentiere den exakt fehlenden Input oder die Abhängigkeit, entferne die aktive Zuweisung und verschiebe das Issue nach **Benötigt Input**.
- Nach Abschluss der Umsetzung: Dokumentiere die Prüfnachweise, entferne die Umsetzungszuweisung und verschiebe das Issue nach **In Prüfung**.
- Lasse ein Issue nie in **In Arbeit**, wenn die Arbeit gestoppt wurde oder eine Agenten-Sitzung ohne aktive Fortsetzung endet.

## Auswahl der nächsten Aufgabe

- Prüfe bei der Frage nach der nächsten Aufgabe die offenen Issues in `sovinityAI/cloud`, `sovinityAI/SovinityDesktop`, `sovinityAI/website`, `sovinityAI/product` und `sovinityAI/.github`.
- Prüfe dabei `org:sovinityAI is:issue is:open no:project` und ordne offene Treffer zuerst dem gemeinsamen Project zu.
- Schließe Epics, Arbeit in **Benötigt Input** und Issues aus, die bereits durch einen offenen Pull Request abgedeckt sind.
- Übernimm Arbeit aus **Bereit**, nicht aus bereits zugewiesener Arbeit anderer Mitwirkender. Verwende die gespeicherte Reihenfolge des Product Boards von oben nach unten: Das oberste geeignete Issue in **Bereit** ist als Nächstes dran.
- Überspringe Arbeit, deren **Arbeitsart** für die verfügbaren Mitwirkenden ungeeignet ist. `KI-geeignet` bedeutet, dass eine KI die Arbeit ausführen darf; Menschen sind dadurch nicht ausgeschlossen.
- Empfiehl genau ein nächstes Issue und nenne getrennt davon bis zu drei Folgeaufgaben.

## Git und Pull Requests

- Verwende für Umsetzungsarbeit einen Branch nach dem Muster `<akteur>/<issue-nummer>-<kurzname>`, zum Beispiel `codex/12-fix-import` oder `ludwig/12-fix-import`.
- Referenziere das Issue in Commits und Pull Requests. Verwende `Closes #<nummer>` für Issues im selben Repository oder `Closes owner/repository#<nummer>` für repositoryübergreifende Issues.
- Pull Requests müssen die Änderung zusammenfassen, die ausgeführten Prüfungen nennen und verbleibende Risiken oder unerfüllte Akzeptanzkriterien offenlegen.
- Führe Pull Requests und Commits auf Deutsch; technische Präfixe und unveränderliche Bezeichner dürfen gemäß `SPRACHE.md` bestehen bleiben.
- Merge oder schließe ein Issue nicht allein deshalb, weil Dateien geändert wurden; der Nachweis entscheidet über den Abschluss.

## Website-Prüfung und Veröffentlichungssicherheit

- Führe bei jeder funktionalen oder inhaltlichen Änderung `python3 scripts/validate_site.py` aus und prüfe betroffene deutsche und englische Seiten visuell in Desktop- und Mobilgrößen.
- Halte rechtliche, Namens-, Domain- und Indexierungs-Gates ausdrücklich aufrecht. Entferne keine Entwurfswarnungen, aktiviere keine Indexierung und konfiguriere keine Produktivdomain, bevor die zugehörigen Issues abgeschlossen sind.
- Veröffentliche niemals private Adressen, Identitätsdokumente, Zugangsdaten oder nicht freigegebene rechtliche Aussagen.
