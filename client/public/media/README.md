# Локальні CS2-медіа

Складай сюди всі тематичні файли з гри. Папка ігнорується git'ом
(окрім цього README) — нічого з Valve IP у репозиторій не потрапить.

## Структура

```
client/public/media/
├── intro.webm              ← Hero-відео на дашборді
├── weapons/                ← PNG-іконки зброї
│   ├── ak-47.png
│   ├── m4a4.png
│   ├── m4a1-s.png
│   ├── awp.png
│   ├── desert-eagle.png
│   ├── usp-s.png
│   ├── glock-18.png
│   ├── famas.png
│   ├── galil-ar.png
│   ├── p250.png
│   ├── mp9.png
│   └── mac-10.png
└── maps/                   ← PNG-зображення мап
    ├── de_dust2.png
    ├── de_mirage.png
    ├── de_inferno.png
    ├── de_nuke.png
    ├── de_overpass.png
    ├── de_ancient.png
    ├── de_anubis.png
    └── de_vertigo.png
```

## Правила іменування

**Зброя** — назва з UI у нижньому регістрі, пробіли замінюються на `-`:
- `AK-47` → `ak-47.png`
- `M4A1-S` → `m4a1-s.png`
- `Desert Eagle` → `desert-eagle.png`
- `Galil AR` → `galil-ar.png`

**Мапи** — повна назва як у грі: `de_dust2.png`, `de_mirage.png`.

**Відео** — фіксована назва `intro.webm`.

## Де брати

Усі файли беруться з локально встановленої гри:

```
<Steam>/steamapps/common/Counter-Strike Global Offensive/game/csgo/panorama/
├── videos/intro720p.webm           → перейменувати на intro.webm
├── images/icons/equipment/         → іконки зброї
└── images/map_icons/               → іконки/зображення мап
```

## Як це працює

Компоненти `WeaponImage` і `MapThumb` пробують джерела по черзі:

1. **Локальний файл** з цієї папки (твоя гра)
2. **CDN** з `ByMykel/CSGO-API` (онлайн-фолбек)
3. **CSS-картка** з тематичним градієнтом (якщо і CDN недоступний)

Тобто можна додати лише частину файлів — для решти автоматично
використається онлайн-варіант.

## Юридичне

Файли з гри — інтелектуальна власність Valve. Для навчального
проєкту/локального використання — ОК. Для публічного деплою —
треба замінити на легально доступні асети.
