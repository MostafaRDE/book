# چندزبانگی و سئو — استراتژی پیشنهادی

## تصمیم معماری (پیاده‌شده)

| زبان | URL | محتوا |
|------|-----|--------|
| انگلیسی (پیش‌فرض) | `/`, `/books/...` | فایل `.md` اصلی |
| فارسی | `/fa`, `/fa/books/...` | فایل `.{slug}.fa.md` |

این الگو **استاندارد Google** برای چندزبانگی است:
- هر زبان URL جدا دارد
- `hreflang` و `canonical` در metadata
- `sitemap.xml` هر دو نسخه را لیست می‌کند
- JSON-LD با `inLanguage` مناسب

## آیا `/fa/...` منقضی یا مشکل‌دار است؟

**خیر.** پیشوند زبان در URL (`/fa/`, `/en/`, `/de/`…) همچنان الگوی توصیه‌شده Google است و منقضی نشده.

آنچه گوگل نمی‌پسندد:
- همان محتوا روی دو URL بدون `hreflang` (duplicate content)
- صفحه `/fa/` با متن انگلیسی (زبان اشتباه)
- `canonical` اشتباه یا نبودن نسخه متناظر

آنچه این پروژه انجام می‌دهد:
- `/fa/...` فقط وقتی `.fa.md` دارد محتوای فارسی نشان می‌دهد
- هر صفحه `canonical` خودش + `hreflang` en/fa + `x-default` → انگلیسی
- `sitemap.xml` هر دو نسخه را لیست می‌کند
- `middleware` برای SSR مقدار `lang="fa"` و `dir="rtl"` روی `<html>` می‌گذارد (مهم برای خزنده‌ها)
- `og:locale` / `alternateLocale` برای اشتراک‌گذاری

## آیا انگلیسی را در حالت فارسی نشان دهیم؟

**خیر — توصیه قطعی: نه.**

دلایل:
1. **سئو**: گوگل صفحه `/fa/...` را فارسی ایندکس می‌کند؛ اگر بدنه انگلیسی باشد = thin/duplicate/misleading content.
2. **تجربه کاربر**: کاربر فارسی انتظار متن فارسی دارد.
3. **E-E-A-T**: ناسازگاری زبان اعتماد را کم می‌کند.

**رفتار فعلی سایت:**
- فصل بدون `.fa.md` → پیام «ترجمه آماده نیست» + دکمه «خواندن نسخه انگلیسی»
- UI (منو، دکمه‌ها) فارسی است؛ بدنه محتوا خالی نمی‌ماند اما انگلیسی مخفی نمی‌شود پشت UI فارسی

## آیا `/fa/...` درست است یا `/en/...` هم لازم است؟

**الگوی فعلی (پیشنهاد ما):**
- انگلیسی **بدون پیشوند** (`/books/...`) — زبان پیش‌فرض بین‌المللی
- فارسی **با پیشوند** (`/fa/books/...`)

جایگزین سخت‌گیرانه‌تر (در صورت رشد بزرگ):
- `/en/books/...` و `/fa/books/...` با redirect از `/` به `/en`
- الان لازم نیست مگر بخواهی همه زبان‌ها کاملاً متقارن باشند

## چک‌لیست سئو برای هر فصل فارسی جدید

- [ ] `title` و `description` فارسی در frontmatter فایل `.md` اصلی
- [ ] فایل `chapter-slug.fa.md` با بدنه کامل فارسی
- [ ] تست `/fa/books/{book}/{chapter}` در مرورگر
- [ ] `pnpm build` بدون خطا
- [ ] View Source: `hreflang` en/fa، `canonical` درست
- [ ] (اختیاری) `og:image` اختصاصی فارسی

## UI در مقابل محتوا

| لایه | منبع |
|------|------|
| دکمه‌ها، منو، برچسب‌ها | `lib/i18n/messages.ts` |
| عنوان کتاب/فصل در کارت‌ها | `book.json` / frontmatter `{ en, fa }` |
| بدنه فصل | `.md` / `.fa.md` |
| metadata صفحه | `generateMetadata` + locale |

## وقتی محتوای فارسی زیاد شد

1. اول فصل‌های پربازدید را ترجمه کن
2. در Search Console هر دو property یا یک property با hreflang مانیتور کن
3. لینک داخلی بین نسخه‌ها از طریق سوییچ زبان (خودکار) + breadcrumb

## منابع

- [Google: Managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
