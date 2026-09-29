# telega_green

## Требования

- Node.js `^20.19.0` или `>=22.12.0`
- npm

## Локальный запуск

```bash
git clone https://github.com/liveandfunl-dotcom/telega_green.git
cd telega_green
npm ci
npm run dev
```

Приложение откроется по адресу http://localhost:5173.

## Локальная сборка

```bash
npm run build
```

Готовая сборка появится в папке `dist/`. Проверить её локально:

```bash
npm run preview
```

Сборка будет доступна по адресу http://localhost:4173.

## Адрес GREEN-API

Адрес API задаётся переменной `VITE_GREEN_API_URL` в файле `.env`. По умолчанию:

```
VITE_GREEN_API_URL=https://4100.api.green-api.com
```

Если у вашего инстанса другой `apiUrl`, создайте в корне проекта файл `.env.local` и добавьте:

```
VITE_GREEN_API_URL=https://XXXX.api.green-api.com
```

Он имеет приоритет над `.env` и не попадает в git.

Можно также передать переменную прямо в команде, у неё наивысший приоритет:

```bash
VITE_GREEN_API_URL=https://XXXX.api.green-api.com npm run dev
VITE_GREEN_API_URL=https://XXXX.api.green-api.com npm run build
```

Значение подставляется в код во время запуска или сборки, поэтому после изменения перезапустите `npm run dev` или заново выполните `npm run build`.
