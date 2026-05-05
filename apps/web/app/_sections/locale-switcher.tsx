"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getLocalizedPath, isLocale, locales, stripLocaleFromPath, type Locale } from "./i18n";

const languageLabels: Record<Locale, { label: string; nativeLabel: string }> = {
  en: { label: "English", nativeLabel: "English" },
  "zh-CN": { label: "Simplified Chinese", nativeLabel: "简体中文" }
};

function getCurrentLocale(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return firstSegment && isLocale(firstSegment) ? firstSegment : "en";
}

export function getLocaleSwitcherOptions(pathname: string) {
  const currentLocale = getCurrentLocale(pathname);
  const basePath = stripLocaleFromPath(pathname);

  return locales.map((locale) => ({
    locale,
    label: languageLabels[locale].label,
    nativeLabel: languageLabels[locale].nativeLabel,
    href: getLocalizedPath(locale, basePath),
    current: locale === currentLocale
  }));
}

function LanguageIcon() {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.25 2.45 3.38 5.45 3.38 9S14.25 18.55 12 21" />
      <path d="M12 3c-2.25 2.45-3.38 5.45-3.38 9S9.75 18.55 12 21" />
    </svg>
  );
}

export default function LocaleSwitcher() {
  const pathname = usePathname() || "/";
  const currentLocale = getCurrentLocale(pathname);
  const options = getLocaleSwitcherOptions(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Select language"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--landing-line)] bg-[var(--landing-panel-bg)] text-[var(--landing-muted)] shadow-sm transition hover:text-[var(--landing-foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--landing-mint)]"
      >
        <LanguageIcon />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Language selection"
          className="absolute right-0 z-30 mt-3 w-56 overflow-hidden rounded-2xl border border-[var(--landing-line)] bg-[var(--landing-surface)] p-2 shadow-[0_24px_80px_var(--landing-panel-shadow)]"
        >
          <p className="landing-mono px-3 pb-2 pt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--landing-muted)]">
            Language
          </p>
          {options.map((option) => (
            <Link
              key={option.locale}
              role="menuitemradio"
              aria-checked={option.current}
              href={option.href}
              hrefLang={option.locale}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--landing-foreground)] transition hover:bg-[var(--landing-surface-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--landing-mint)]"
            >
              <span>
                <span className="block">{option.nativeLabel}</span>
                <span className="block text-xs font-medium text-[var(--landing-muted)]">{option.label}</span>
              </span>
              <span className="landing-mono text-xs text-[var(--landing-muted)]">
                {option.current ? "ON" : option.locale.toUpperCase()}
              </span>
            </Link>
          ))}
          <p className="border-t border-[var(--landing-line)] px-3 pb-1 pt-2 text-xs leading-5 text-[var(--landing-muted)]">
            {currentLocale === "zh-CN" ? "当前语言：简体中文" : "Current language: English"}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export const localeSwitcherTestHooks = { getCurrentLocale, stripLocaleFromPath };
