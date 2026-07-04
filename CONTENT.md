# راهنمای محتوا — mostafa-effati-book

این پروژه یک **کتابخانه مارک‌داون** است. همه محتوا در پوشه `content/` زندگی می‌کند.

## ساختار پوشه‌ها

```
content/
  site.json                 # متادیتای سایت (دوزبانه)
  ads.json                  # تنظیمات تبلیغات (ببین ADS.md)
  books/
    {book-slug}/
      book.json             # عنوان، توضیح، ترتیب، featured
      chapters/             # کتاب تخت (بدون بخش)
        my-chapter.md
        my-chapter.fa.md    # بدنه فارسی (اختیاری)
      parts/                # کتاب با بخش‌ها
        {part-slug}/
          part.json
          chapter-a.md
          chapter-a.fa.md
```

## افزودن کتاب جدید

1. پوشه بساز: `content/books/my-new-book/`
2. `book.json` بنویس:

```json
{
  "title": {
    "en": "My New Book",
    "fa": "کتاب جدید من"
  },
  "description": {
    "en": "Short description for cards and SEO.",
    "fa": "توضیح کوتاه برای کارت‌ها و سئو."
  },
  "order": 10,
  "featured": false,
  "tags": ["notes"],
  "published": true
}
```

3. فصل‌ها را در `chapters/` یا `parts/{part}/` بگذار.

## افزودن فصل (انگلیسی)

`content/books/my-book/chapters/hello.md`:

```markdown
---
title:
  en: Hello
  fa: سلام
description:
  en: First chapter.
  fa: فصل اول.
order: 1
tags: [intro]
published: true
---

# Hello

متن انگلیسی اینجا…
```

## افزودن ترجمه فارسی فصل

**همان slug** — فایل جدا با پسوند `.fa.md`:

`hello.fa.md` (بدون frontmatter یا با frontmatter کم):

```markdown
# سلام

متن فارسی اینجا…
```

- URL انگلیسی: `/books/my-book/hello`
- URL فارسی: `/fa/books/my-book/hello`
- اگر `.fa.md` نباشد، صفحه فارسی پیام «ترجمه موجود نیست» + لینک نسخه انگلیسی نشان می‌دهد.

## رسانه در مارک‌داون

| نوع | نحوه استفاده |
|-----|----------------|
| تصویر | `public/images/x.jpg` → `![alt](/images/x.jpg)` |
| Mermaid | ` ```mermaid ` بلوک کد |
| تبلیغ درون متن | `<!-- ad:in-content-1 -->` (ببین ADS.md) |

## فیلدهای frontmatter

| فیلد | الزامی | توضیح |
|------|--------|--------|
| `title` | بله | رشته یا `{ en, fa }` |
| `description` | بله | برای SEO و کارت‌ها |
| `order` | بله | ترتیب نمایش |
| `tags` | خیر | آرایه رشته |
| `published` | خیر | پیش‌فرض `true` |

## بعد از افزودن محتوا

```bash
pnpm dev    # تست محلی
pnpm build  # اطمینان از SSG
```

مسیرها به‌صورت خودکار از `generateStaticParams` ساخته می‌شوند.

## نمونه فارسی موجود

- کتاب: `mostafa-effati`
- فصل: `introduction` → `introduction.fa.md` (شامل Mermaid و placeholder تبلیغ)

برای سئو و زبان‌ها → `I18N-AND-SEO.md`  
برای تبلیغات → `ADS.md`
