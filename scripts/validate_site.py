#!/usr/bin/env python3
from __future__ import annotations

import re
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


def relative_luminance(hex_color: str) -> float:
    channels = [int(hex_color[index:index + 2], 16) / 255 for index in (1, 3, 5)]
    linear = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in channels]
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]


def contrast_ratio(first: str, second: str) -> float:
    light, dark = sorted((relative_luminance(first), relative_luminance(second)), reverse=True)
    return (light + 0.05) / (dark + 0.05)


def hex_token(source: str, name: str) -> str:
    match = re.search(rf"--{re.escape(name)}:\s*(#[0-9a-fA-F]{{6}});", source)
    if not match:
        raise ValueError(f"Missing hexadecimal token --{name}")
    return match.group(1)


def main() -> None:
    ignored_directories = {"node_modules", "playwright-report", "test-results"}
    html_pages = sorted(
        path
        for path in ROOT.rglob("*.html")
        if not ignored_directories.intersection(path.relative_to(ROOT).parts)
    )
    required = [
        ROOT / "index.html",
        ROOT / "en/index.html",
        ROOT / "impressum/index.html",
        ROOT / "datenschutz/index.html",
        ROOT / "assets/styles.css",
        ROOT / "assets/visual-contract.css",
        ROOT / "assets/brand/mark-primary.svg",
        ROOT / "assets/brand/mark-inverse.svg",
        ROOT / "assets/favicon.svg",
        ROOT / "assets/site.js",
        ROOT / "VISUAL-CONTRACT.md",
    ]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.is_file()]
    failures: list[str] = []
    if missing:
        failures.append("Missing required files: " + ", ".join(missing))

    for page in html_pages:
        source = page.read_text(encoding="utf-8")
        parser = LinkParser()
        parser.feed(source)
        for link in parser.links:
            target = local_target(page, link)
            if target is not None and not target.exists():
                failures.append(f"{page.relative_to(ROOT)}: broken local link {link}")

        relative = page.relative_to(ROOT)
        if 'data-visual-contract-version="0.1.0"' not in source:
            failures.append(f"{relative}: Visual Contract version 0.1.0 missing")
        if '<meta name="theme-color" content="#10271f">' not in source:
            failures.append(f"{relative}: canonical theme color missing")
        if re.search(r'class="wordmark-mark"[^>]*>\s*S\s*</', source):
            failures.append(f"{relative}: font-dependent letter mark remains")
        if "site-header" in source:
            if "menu-button" not in source or 'id="site-nav"' not in source:
                failures.append(f"{relative}: responsive navigation control missing")
            if "assets/site.js" not in source:
                failures.append(f"{relative}: navigation script missing")
        if "skip-link" in source and '<main id="main" tabindex="-1">' not in source:
            failures.append(f"{relative}: skip-link target must be programmatically focusable")

    error_page = (ROOT / "404.html").read_text(encoding="utf-8")
    if '<base href="/">' not in error_page:
        failures.append("404.html: asset base must match the sovinity.com root")

    styles = (ROOT / "assets/styles.css").read_text(encoding="utf-8")
    if not styles.startswith('@import "./visual-contract.css";'):
        failures.append("assets/styles.css: local Visual Contract snapshot is not imported first")

    tokens = (ROOT / "assets/visual-contract.css").read_text(encoding="utf-8")
    for declaration in ("--focus: #26755c;", "--brand: #175f4c;", "--radius-xl: 22px;"):
        if declaration not in tokens:
            failures.append(f"assets/visual-contract.css: required token missing: {declaration}")

    contrast_pairs = (
        ("text", "background", 4.5),
        ("text-muted", "background", 4.5),
        ("focus", "background", 3.0),
        ("focus-inverse", "forest", 3.0),
    )
    for foreground, background, minimum in contrast_pairs:
        ratio = contrast_ratio(hex_token(tokens, foreground), hex_token(tokens, background))
        if ratio < minimum:
            failures.append(f"assets/visual-contract.css: contrast {foreground}/{background} is only {ratio:.2f}:1")
    button_ratio = contrast_ratio("#ffffff", hex_token(tokens, "brand"))
    if button_ratio < 4.5:
        failures.append(f"assets/visual-contract.css: primary button contrast is only {button_ratio:.2f}:1")

    if (
        "@media (prefers-reduced-motion: reduce)" not in styles
        or "transition: none !important" not in styles
        or ".button:hover { transform: none; }" not in styles
    ):
        failures.append("assets/styles.css: reduced-motion override missing")

    for path in (
        ROOT / "assets/brand/mark-primary.svg",
        ROOT / "assets/brand/mark-inverse.svg",
        ROOT / "assets/favicon.svg",
    ):
        source = path.read_text(encoding="utf-8")
        if "<path" not in source or re.search(r"<text\b", source, re.IGNORECASE):
            failures.append(f"{path.relative_to(ROOT)}: mark must use a path and no SVG text")

    if failures:
        raise SystemExit("\n".join(failures))
    print("Static site validation passed.")


if __name__ == "__main__":
    main()
