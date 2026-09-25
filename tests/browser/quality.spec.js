import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  { name: 'start-de', path: '/', status: 200 },
  { name: 'start-en', path: '/en/', status: 200 },
  { name: 'preise-de', path: '/preise/', status: 200 },
  { name: 'preise-en', path: '/en/pricing/', status: 200 },
  { name: 'impressum-de', path: '/impressum/', status: 200 },
  { name: 'datenschutz-de', path: '/datenschutz/', status: 200 },
  { name: 'impressum-en', path: '/en/imprint/', status: 200 },
  { name: 'datenschutz-en', path: '/en/privacy/', status: 200 },
  { name: 'nicht-gefunden', path: '/nicht-vorhanden/', status: 404 },
];

const languagePairs = [
  ['/', '/en/'],
  ['/en/', '/'],
  ['/preise/', '/en/pricing/'],
  ['/en/pricing/', '/preise/'],
  ['/impressum/', '/en/imprint/'],
  ['/en/imprint/', '/impressum/'],
  ['/datenschutz/', '/en/privacy/'],
  ['/en/privacy/', '/datenschutz/'],
];

async function openMobileMenuIfNeeded(page, projectName) {
  if (projectName !== 'mobil') return;
  const menu = page.locator('.menu-button');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
}

for (const route of routes) {
  test.describe(route.name, () => {
    test('lädt ohne Layout-, Asset- oder Linkfehler', async ({ page, request }) => {
      const assetFailures = [];
      page.on('response', (response) => {
        if (
          ['image', 'script', 'stylesheet'].includes(response.request().resourceType())
          && response.status() >= 400
        ) {
          assetFailures.push(`${response.status()} ${response.url()}`);
        }
      });

      const response = await page.goto(route.path);
      expect(response?.status()).toBe(route.status);
      await expect(page.locator('body')).toBeVisible();
      expect(assetFailures, 'Assets mit Fehlerstatus').toEqual([]);

      const overflow = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);

      const links = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((anchor) => ({
        href: anchor.getAttribute('href'),
        resolved: anchor.href,
      })));
      const checked = new Set();
      for (const link of links) {
        if (!link.href || link.href.startsWith('mailto:') || link.href.startsWith('tel:')) continue;
        const target = new URL(link.resolved);
        if (target.origin !== new URL(page.url()).origin) continue;

        if (target.hash && target.pathname === new URL(page.url()).pathname) {
          const id = decodeURIComponent(target.hash.slice(1));
          const targetExists = await page.evaluate((targetId) => Boolean(document.getElementById(targetId)), id);
          expect(targetExists, `Sprungziel ${link.href}`).toBe(true);
        }

        target.hash = '';
        if (checked.has(target.href)) continue;
        checked.add(target.href);
        const linkResponse = await request.get(target.href);
        expect(linkResponse.status(), `Interner Link ${link.href}`).toBeLessThan(400);
      }
    });

    test('hat keine schweren automatisiert erkennbaren Barrieren', async ({ page }) => {
      await page.goto(route.path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const major = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
      expect(major, JSON.stringify(major, null, 2)).toEqual([]);
    });
  });
}

for (const [source, target] of languagePairs) {
  test(`Sprachlink führt von ${source} nach ${target}`, async ({ page }, testInfo) => {
    await page.goto(source);
    await openMobileMenuIfNeeded(page, testInfo.project.name);
    await page.locator('.lang-link').click();
    await expect(page).toHaveURL(new RegExp(`${target.replaceAll('/', '\\/')}$`));
  });
}

test('mobiles Menü öffnet, schließt und gibt Fokus zurück', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobil', 'Nur für den mobilen Viewport relevant.');
  await page.goto('/');
  const menu = page.locator('.menu-button');
  const navigation = page.locator('#site-nav');

  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation).toBeHidden();
  await expect(menu).toBeFocused();
});

for (const path of ['/', '/en/']) {
  test(`FAQ und Produkttabs funktionieren auf ${path}`, async ({ page }) => {
    await page.goto(path);
    const firstFaq = page.locator('.faq details').first();
    await firstFaq.locator('summary').click();
    await expect(firstFaq).toHaveAttribute('open', '');

    const selectedTab = page.locator('[role="tab"][aria-selected="true"]');
    await selectedTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[role="tab"]').nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('[role="tabpanel"]').nth(1)).toBeVisible();
  });
}

test('Tastaturfokus ist sichtbar und Sprunglink funktioniert', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.locator('.skip-link');
  await expect(skipLink).toBeFocused();
  const outline = await skipLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return { style: style.outlineStyle, width: style.outlineWidth };
  });
  expect(outline.style).toBe('solid');
  expect(Number.parseFloat(outline.width)).toBeGreaterThanOrEqual(3);
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test('reduzierte Bewegung deaktiviert Scrollen und Übergänge', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const styles = await page.locator('.button.primary').first().evaluate((element) => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    transitionDuration: getComputedStyle(element).transitionDuration,
  }));
  expect(styles.scrollBehavior).toBe('auto');
  expect(styles.transitionDuration).toBe('0s');
  await page.locator('.button.primary').first().hover();
  await expect(page.locator('.button.primary').first()).toHaveCSS('transform', 'none');
});

test.describe('@visual stabile Komponentenreferenzen', () => {
  for (const [locale, path] of [['de', '/'], ['en', '/en/']]) {
    test(`${locale.toUpperCase()}-Startseite`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('.site-header')).toHaveScreenshot(`${locale}-header.png`);
      await expect(page.locator('.hero')).toHaveScreenshot(`${locale}-hero.png`);
      await expect(page.locator('.product-tour')).toHaveScreenshot(`${locale}-produktvorschau.png`);
      await expect(page.locator('.final-cta')).toHaveScreenshot(`${locale}-cta.png`);
      await expect(page.locator('.site-footer')).toHaveScreenshot(`${locale}-footer.png`);
    });
  }
});
