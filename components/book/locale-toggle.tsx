"use client"

import { Languages } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale, useTranslations } from "@/hooks/use-translations"
import { localeLabels, locales, type Locale } from "@/lib/i18n/messages"
import { swapLocalePath } from "@/lib/i18n/routing"
import { useLocaleStore } from "@/stores/locale-store"

export function LocaleToggle() {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const setLocale = useLocaleStore((state) => state.setLocale)

  function handleChange(nextLocale: Locale) {
    setLocale(nextLocale)
    router.push(swapLocalePath(pathname, nextLocale))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="sm" className="gap-1.5 px-2">
            <Languages className="size-4" />
            <span className="hidden text-xs font-medium sm:inline">
              {localeLabels[locale]}
            </span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={(value) => handleChange(value as Locale)}
          >
            {locales.map((code) => (
              <DropdownMenuRadioItem key={code} value={code}>
                {localeLabels[code]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
