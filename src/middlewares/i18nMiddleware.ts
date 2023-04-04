import i18nextMiddleware, { LanguageDetector } from 'i18next-http-middleware';
import { join } from 'path';
import FsBackend, { FsBackendOptions } from 'i18next-fs-backend';
import i18next from 'i18next';

i18next
  .use(LanguageDetector) // Set language detector
  .use(FsBackend) // Set backend data source
  .init<FsBackendOptions>({
    // Default language is English
    lng: 'en',
    // If the selected language does not exist, return to English
    fallbackLng: 'en',
    // Preloaded language files
    preload: ['en', 'zh-TW'],
    // Namespace
    ns: 'translation',
    // Default namespace
    defaultNS: 'translation',
    // Backend data source
    backend: {
      // Path of language files
      loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
    },
  });

export default i18nextMiddleware.handle(i18next);
