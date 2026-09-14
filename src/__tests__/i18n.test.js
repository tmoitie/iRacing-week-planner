import { i18nInitialized, loadLocaleData } from '../i18n';

describe('i18n locale data', () => {
  test('loads and caches locale data for an app language', async () => {
    await i18nInitialized;

    const firstLoad = loadLocaleData('cs-CZ');

    expect(loadLocaleData('cs-CZ')).toBe(firstLoad);

    await firstLoad;

    expect(Intl.DateTimeFormat.supportedLocalesOf('cs-CZ')).toContain('cs-CZ');
  });

  test('uses English locale data when no language is available', async () => {
    await loadLocaleData();

    expect(Intl.DateTimeFormat.supportedLocalesOf('en-US')).toContain('en-US');
  });
});
