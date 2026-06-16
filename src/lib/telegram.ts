/**
 * Telegram WebApp integration.
 * Безопасно работает и в Telegram, и в обычном браузере (для разработки).
 */

declare global {
  interface Window {
    Telegram?: {
      WebApp?: any
    }
  }
}

export function initTelegram(): any | null {
  if (typeof window === 'undefined' || !window.Telegram?.WebApp) {
    // Dev mode без Telegram
    return null
  }
  const tg = window.Telegram.WebApp
  try {
    tg.ready()
    tg.expand()
    // Применяем тему Telegram
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#0a1628')
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#ffffff')
  } catch (e) {
    // ignore — вне Telegram
  }
  return tg
}
