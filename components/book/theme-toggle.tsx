"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

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
import { useTranslations } from "@/hooks/use-translations"

type ThemeValue = "light" | "dark" | "system"

function ThemeIcon({ theme }: { theme: ThemeValue | undefined }) {
  if (theme === "light") return <Sun className="size-4" />
  if (theme === "dark") return <Moon className="size-4" />
  return <Monitor className="size-4" />
}

export function ThemeToggle() {
  const t = useTranslations()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const activeTheme = (theme ?? "system") as ThemeValue

  const themeOptions = [
    { value: "light" as const, label: t.themeLight, icon: Sun },
    { value: "dark" as const, label: t.themeDark, icon: Moon },
    { value: "system" as const, label: t.themeSystem, icon: Monitor },
  ]

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label={t.theme} disabled>
        <Monitor className="size-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label={t.chooseTheme}>
            <ThemeIcon theme={activeTheme} />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t.theme}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={activeTheme}
            onValueChange={(value) => setTheme(value as ThemeValue)}
          >
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                <Icon className="size-4 opacity-70" />
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
