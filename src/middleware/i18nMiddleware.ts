import i18nextMiddleware, { LanguageDetector } from 'i18next-http-middleware';
import { join } from 'path';
import FsBackend, { FsBackendOptions } from 'i18next-fs-backend';
import i18next from 'i18next';

i18next
  .use(LanguageDetector) // 設定語言偵測器
  .use(FsBackend) // 設定後端資料來源
  .init<FsBackendOptions>({
    // 預設語言為英語
    lng: 'en',
    // 如果選擇的語言不存在，則退回到英語
    fallbackLng: 'en',
    // 預先載入的語言檔
    preload: ['en', 'zh-TW'],
    ns: 'translation',
    defaultNS: 'translation',
    // 後端資料來源
    backend: {
      // 語言檔案的路徑
      loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
    },
  });

export default i18nextMiddleware.handle(i18next);
