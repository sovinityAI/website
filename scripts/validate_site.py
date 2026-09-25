#!/usr/bin/env python3
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = dict(attrs)
        if tag in {"a", "link", "script", "img"}:
            value = attr.get("href") or attr.get("src")
            if value:
                self.links.append(value)


def local_target(page: Path, link: str) -> Path | None:
    parsed = urlparse(link)
    if parsed.scheme or parsed.netloc or link.startswith(("mailto:", "tel:", "#")):
        return None
    path = unquote(parsed.path)
    if not path:
        return None
    target = ROOT / path.lstrip("/") if path.startswith("/") else page.parent / path
    target = target.resolve()
    if path.endswith("/"):
        target /= "index.html"
    return target


def main() -> None:
    required = [
        ROOT / "index.html",
        ROOT / "en/index.html",
        ROOT / "impressum/index.html",
        ROOT / "datenschutz/index.html",
        ROOT / "assets/styles.css",
        ROOT / "assets/site.js",
    ]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.is_file()]
    failures: list[str] = []
    if missing:
        failures.append("Missing required files: " + ", ".join(missing))

    for page in ROOT.rglob("*.html"):
        parser = LinkParser()
        parser.feed(page.read_text(encoding="utf-8"))
        for link in parser.links:
            target = local_target(page, link)
            if target is not None and not target.exists():
                failures.append(f"{page.relative_to(ROOT)}: broken local link {link}")

    if failures:
        raise SystemExit("\n".join(failures))
    print("Static site validation passed.")


if __name__ == "__main__":
    main()
