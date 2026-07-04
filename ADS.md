# راهنمای تبلیغات

تبلیغات از فایل **`content/ads.json`** کنترل می‌شوند — بدون تغییر کد.

## دو جایگاه (slot)

| Slot | کجا دیده می‌شود | دستگاه |
|------|-----------------|--------|
| `sidebar` | پایین سایدبار (صفحه overview کتاب) | دسکتاپ: ستون کناری؛ موبایل: داخل sheet |
| `book-section` | جایگاه ثابت در صفحه overview کتاب | هر دو (بنر inline) |
| `in-content` | داخل متن مارک‌داون (فصل یا پیش‌گفتار) | هر دو (بنر واکنش‌گرا) |

## صفحه overview کتاب (`book-section`)

بدون مارکر در مارک‌داون — فقط در `ads.json` مشخص می‌کنی:

| `section` | محل نمایش |
|-----------|-----------|
| `after-intro` | بعد از هدر کتاب (عنوان + دکمه شروع) |
| `after-foreword` | بعد از پیش‌گفتار |
| `before-contents` | قبل از فهرست فصل‌ها |

```json
{
  "id": "book-before-contents",
  "slot": "book-section",
  "section": "before-contents",
  "creative": "placeholder-in-content",
  "enabled": true,
  "pages": ["book"],
  "locales": ["en", "fa"]
}
```

برای تبلیغ **داخل متن پیش‌گفتار** همان مارکر `<!-- ad:in-content-1 -->` را در `foreword.md` بگذار و در placement مقدار `"pages": ["book"]` را اضافه کن (بعد از باز کردن «ادامه پیش‌گفتار» نمایش داده می‌شود).

## تبلیغ درون محتوا (فصل و پیش‌گفتار)

در فایل `.md` یا `.fa.md` بنویس:

```markdown
متن پاراگراف اول…

<!-- ad:in-content-1 -->

متن بعد از تبلیغ…
```

سپس در `ads.json` مطمئن شو placement با `"marker": "in-content-1"` وجود دارد.

**چرا این روش؟**
- کنترل دقیق محل در هر فصل
- برای محتوای طولانی طبیعی‌تر از inject خودکار
- استاندارد در بلاگ‌های مارک‌داون

## تبلیغ سایدبار (متنیابی صفحه)

```json
{
  "id": "sidebar-reading",
  "slot": "sidebar",
  "creative": "my-banner",
  "enabled": true,
  "pages": ["book", "chapter"],
  "locales": ["en", "fa"]
}
```

| `pages` | معنی |
|---------|------|
| `book` | صفحه نمای کلی کتاب (+ `book-section` و مارکر در پیش‌گفتار) |
| `chapter` | صفحه فصل |
| `home` | صفحه کتابخانه (در صورت نیاز اضافه کن) |

## فعال/غیرفعال کردن

در `ads.json` → `placements[].enabled: true/false`

## انواع creative

### بنر سفارشی (محصول/سایت خودت)

```json
"my-banner": {
  "type": "custom",
  "label": { "en": "Sponsored", "fa": "تبلیغ" },
  "desktop": {
    "title": { "en": "Title", "fa": "عنوان" },
    "description": { "en": "Short text", "fa": "متن کوتاه" },
    "href": "https://mostafaeffati.com/product",
    "image": "/images/ads/banner-300x250.jpg"
  },
  "mobile": {
    "title": { "en": "Mobile title", "fa": "عنوان موبایل" },
    "description": { "en": "…", "fa": "…" },
    "href": "https://…",
    "image": "/images/ads/banner-mobile.jpg"
  }
}
```

تصاویر را در `public/images/ads/` بگذار.

### Google AdSense

```json
"adsense-sidebar": {
  "type": "adsense",
  "label": { "en": "Ad", "fa": "تبلیغ" },
  "adsenseClient": "ca-pub-XXXXXXXX",
  "adsenseSlot": "1234567890",
  "desktop": { "title": "", "description": "", "href": "#", "image": null },
  "mobile": { "title": "", "description": "", "href": "#", "image": null }
}
```

برای AdSense باید اسکریپت را در `app/layout.tsx` یا یک کامپوننت `AdSenseScript` اضافه کنی (یک‌بار):

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXX" crossorigin="anonymous"></script>
```

## روش‌های پیشرفته‌تر (آینده)

| روش | مزیت | پیچیدگی |
|-----|------|---------|
| **Marker در md** (فعلی) | کنترل نویسنده | کم |
| **قوانین per-book** در ads.json | تبلیغ متفاوت per کتاب | متوسط |
| **GPT / Prebid header bidding** | درآمد بالاتر | زیاد |
| **Affiliate blocks** (Amazon, etc.) | مرتبط با محتوا | متوسط |
| **Native ads** (شبیه کارت فصل) | CTR بهتر، UX تمیزتر | نیاز به طراحی |

**پیشنهاد برای شروع:** بنرهای سفارشی سایت‌های خودت (`mostafaeffati.com`, محصولات) + ۱–۲ جایگاه in-content در فصل‌های بلند. بعد AdSense یا affiliate.

## موبایل vs دسکتاپ

هر creative دو variant دارد: `desktop` و `mobile`.
- Sidebar روی موبایل داخل sheet فصل‌هاست (نه ستون جدا)
- In-content هر دو variant را با CSS `lg:hidden` / `hidden lg:block` جدا می‌کند
- Toast در موبایل بالاست تا با نوار پایین تداخل نکند

## رعایت قوانین

- برچسب «Sponsored» / «تبلیغ» نمایش داده می‌شود
- لینک‌ها `rel="sponsored noopener noreferrer"`
- `data-ad-placement` روی DOM برای دیباگ در DevTools

## دیباگ

در DevTools عناصر با `data-ad-placement="sidebar-reading"` یا `data-ad-variant="mobile"` را جستجو کن.
