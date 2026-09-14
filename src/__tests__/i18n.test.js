import { i18nInitialized, loadLocaleData } from '../i18n';

describe('i18n locale data', () => {
  test('loads and caches locale data for an app language', async () => {
    await i18nInitialized;

    const firstLoad = loadLocaleData('cs-CZ');

    expect(loadLocaleData('cs-CZ')).toBe(firstLoad);

    await firstLoad;

    expect(Intl.DateTimeFormat.supportedLocalesOf('cs-CZ')).toContain('cs-CZ');
  });
});
