export type Locale = "en" | "fa"

export const locales: Locale[] = ["en", "fa"]

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
}

export type Messages = {
  library: string
  search: string
  theme: string
  themeLight: string
  themeDark: string
  themeSystem: string
  chooseTheme: string
  language: string
  browse: string
  inThisBook: string
  currentBook: string
  bookOverview: string
  partsAndChapters: string
  chapters: string
  chapter: string
  parts: string
  part: string
  minRead: string
  min: string
  books: string
  topics: string
  personalLibrary: string
  markdownFirst: string
  livingBook: string
  readBook: string
  browseAllBooks: string
  continueReading: string
  previous: string
  next: string
  onThisPage: string
  flagship: string
  flagshipBook: string
  flatChapters: string
  noParts: string
  openBook: string
  startReading: string
  startWith: string
  bookNotFound: string
  chaptersNotFound: string
  searchPlaceholder: string
  noChaptersFound: string
  searchHint: string
  copyCode: string
  copied: string
  footerTagline: string
  deepDives: string
  booksSectionDesc: string
  personalKb: string
  loadingBooks: string
  couldNotLoadBooks: string
  couldNotLoadChapters: string
  openNavigation: string
  chaptersCount: string
  partsCount: string
  chShort: string
  siteTitle: string
  siteDescription: string
  partLabel: string
  minutesRead: string
  chaptersNav: string
  readingProgress: string
  translationMissingTitle: string
  translationMissingBody: string
  readEnglishVersion: string
  dismissAd: string
  foreword: string
  forewordReadMore: string
}

export const messages: Record<Locale, Messages> = {
  en: {
    library: "Library",
    search: "Search",
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    chooseTheme: "Choose theme",
    language: "Language",
    browse: "Browse",
    inThisBook: "In this book",
    currentBook: "Current book",
    bookOverview: "Book overview",
    partsAndChapters: "Parts & chapters",
    chapters: "Chapters",
    chapter: "Chapter",
    parts: "parts",
    part: "Part",
    minRead: "Min read",
    min: "min",
    books: "Books",
    topics: "Topics",
    personalLibrary: "Personal library",
    markdownFirst: "Markdown-first",
    livingBook: "Living book",
    readBook: "Read",
    browseAllBooks: "Browse all books",
    continueReading: "Continue reading",
    previous: "Previous",
    next: "Next",
    onThisPage: "On this page",
    flagship: "Flagship",
    flagshipBook: "Flagship book",
    flatChapters: "Flat chapters",
    noParts: "No parts — chapters only",
    openBook: "Open book",
    startReading: "Start reading",
    startWith: "Start with",
    bookNotFound: "Book not found",
    chaptersNotFound: "Could not load chapters.",
    searchPlaceholder: "Search books, parts, chapters…",
    noChaptersFound: "No chapters found.",
    searchHint: "↑↓ navigate · ↵ open · esc close",
    copyCode: "Copy code",
    copied: "Copied",
    footerTagline: "A markdown-native personal library.",
    deepDives: "Deep dives, notes, and field reports — updated as markdown files.",
    booksSectionDesc:
      "One flagship collection with parts, plus focused books with flat chapters — all markdown, all yours.",
    personalKb: "Personal knowledge base",
    loadingBooks: "Loading books…",
    couldNotLoadBooks: "Could not load books.",
    couldNotLoadChapters: "Could not load chapters. Try refreshing the page.",
    openNavigation: "Open navigation",
    chaptersCount: "chapters",
    partsCount: "parts",
    chShort: "ch",
    siteTitle: "Mostafa Effati — Library",
    siteDescription:
      "A personal library of books, essays, and field notes — engineering, letters, and quiet reflections.",
    partLabel: "Part:",
    minutesRead: "min read",
    chaptersNav: "Chapters",
    readingProgress: "Reading progress",
    translationMissingTitle: "Persian translation not available yet",
    translationMissingBody:
      "This chapter has not been translated. For SEO and reading quality, the English version is not shown on the Persian URL.",
    readEnglishVersion: "Read English version",
    dismissAd: "Dismiss ad",
    foreword: "Foreword",
    forewordReadMore: "Continue reading",
  },
  fa: {
    library: "کتابخانه",
    search: "جستجو",
    theme: "تم",
    themeLight: "روشن",
    themeDark: "تیره",
    themeSystem: "سیستم",
    chooseTheme: "انتخاب تم",
    language: "زبان",
    browse: "مرور",
    inThisBook: "در این کتاب",
    currentBook: "کتاب فعلی",
    bookOverview: "نمای کلی کتاب",
    partsAndChapters: "بخش‌ها و فصل‌ها",
    chapters: "فصل‌ها",
    chapter: "فصل",
    parts: "بخش",
    part: "بخش",
    minRead: "دقیقه مطالعه",
    min: "دقیقه",
    books: "کتاب‌ها",
    topics: "موضوعات",
    personalLibrary: "کتابخانه شخصی",
    markdownFirst: "مبتنی بر مارک‌داون",
    livingBook: "کتاب زنده",
    readBook: "خواندن",
    browseAllBooks: "همه کتاب‌ها",
    continueReading: "ادامه مطالعه",
    previous: "قبلی",
    next: "بعدی",
    onThisPage: "در این صفحه",
    flagship: "اصلی",
    flagshipBook: "کتاب اصلی",
    flatChapters: "فقط فصل",
    noParts: "بدون بخش — فقط فصل‌ها",
    openBook: "باز کردن کتاب",
    startReading: "شروع مطالعه",
    startWith: "شروع با",
    bookNotFound: "کتاب پیدا نشد",
    chaptersNotFound: "بارگذاری فصل‌ها ممکن نشد.",
    searchPlaceholder: "جستجو در کتاب‌ها، بخش‌ها و فصل‌ها…",
    noChaptersFound: "فصلی پیدا نشد.",
    searchHint: "↑↓ حرکت · ↵ باز کردن · esc بستن",
    copyCode: "کپی کد",
    copied: "کپی شد",
    footerTagline: "کتابخانه شخصی مبتنی بر مارک‌داون.",
    deepDives: "یادداشت‌ها و گزارش‌های میدانی — به‌روزرسانی با فایل‌های مارک‌داون.",
    booksSectionDesc:
      "یک مجموعه اصلی با بخش‌ها، به‌همراه کتاب‌های کوچک‌تر با فصل‌های تخت — همه مارک‌داون، همه مال تو.",
    personalKb: "پایگاه دانش شخصی",
    loadingBooks: "در حال بارگذاری…",
    couldNotLoadBooks: "بارگذاری کتاب‌ها ممکن نشد.",
    couldNotLoadChapters: "بارگذاری فصل‌ها ممکن نشد. صفحه را رفرش کنید.",
    openNavigation: "باز کردن منو",
    chaptersCount: "فصل",
    partsCount: "بخش",
    chShort: "فصل",
    siteTitle: "مصطفی عفتی — کتابخانه",
    siteDescription:
      "کتابخانه شخصی از کتاب‌ها، مقالات و یادداشت‌های میدانی — فنی، عاشقانه و تأملی.",
    partLabel: "بخش:",
    minutesRead: "دقیقه مطالعه",
    chaptersNav: "فصل‌ها",
    readingProgress: "پیشرفت مطالعه",
    translationMissingTitle: "ترجمه فارسی این فصل هنوز آماده نیست",
    translationMissingBody:
      "این فصل هنوز ترجمه نشده. برای سئو و کیفیت خواندن، نسخه انگلیسی روی آدرس فارسی نمایش داده نمی‌شود.",
    readEnglishVersion: "خواندن نسخه انگلیسی",
    dismissAd: "بستن تبلیغ",
    foreword: "پیش‌گفتار",
    forewordReadMore: "ادامه پیش‌گفتار",
  },
}

export function getMessages(locale: Locale): Messages {
  return messages[locale]
}
