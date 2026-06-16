import { User, LogOut, Bell, Shield, CreditCard, HelpCircle, ExternalLink } from 'lucide-react'

interface Props {
  tgUser: { first_name: string; id: number } | null
}

export function Settings({ tgUser }: Props) {
  return (
    <div className="pt-2 space-y-3">
      {/* Profile */}
      <div className="glass-tide rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-tide-400 to-tide-500 flex items-center justify-center text-ocean-900 font-bold text-lg">
            {tgUser?.first_name?.[0] || '👤'}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">{tgUser?.first_name || 'Гость'}</div>
            <div className="text-[10px] text-white/50">Telegram ID: {tgUser?.id || '—'}</div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <Section title="Подписка">
        <Item icon={<CreditCard className="h-4 w-4" />} label="Текущий тариф" value="Старт · 5 000 ₽" />
        <Item icon={<CreditCard className="h-4 w-4" />} label="Следующий платёж" value="01.07.2026" />
        <Item icon={<CreditCard className="h-4 w-4" />} label="Способ оплаты" value="Telegram Stars" />
      </Section>

      <Section title="Уведомления">
        <Item icon={<Bell className="h-4 w-4" />} label="Push в Telegram" value="Вкл" toggle />
        <Item icon={<Bell className="h-4 w-4" />} label="Еженедельный отчёт" value="Вкл" toggle />
        <Item icon={<Bell className="h-4 w-4" />} label="Новые лиды" value="Вкл" toggle />
      </Section>

      <Section title="Безопасность">
        <Item icon={<Shield className="h-4 w-4" />} label="2FA для админки" value="Вкл" />
        <Item icon={<Shield className="h-4 w-4" />} label="Серверы данных" value="РФ · Tier-3" />
      </Section>

      <Section title="Поддержка">
        <Item icon={<HelpCircle className="h-4 w-4" />} label="Чат с командой" link />
        <Item icon={<HelpCircle className="h-4 w-4" />} label="Документация" link />
        <Item icon={<HelpCircle className="h-4 w-4" />} label="Политика конфиденциальности" link />
      </Section>

      <button className="w-full glass rounded-2xl p-3 flex items-center justify-center gap-2 text-coral-500 text-sm font-medium active:scale-95 transition-transform">
        <LogOut className="h-4 w-4" />
        Сбросить сессию
      </button>

      <div className="text-center text-[10px] text-white/30 pt-2">
        Buildo v1.0 · {new Date().getFullYear()}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-white/40 px-2 mb-1.5">{title}</div>
      <div className="glass rounded-2xl divide-y divide-white/5 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function Item({ icon, label, value, link, toggle }: { icon: React.ReactNode; label: string; value?: string; link?: boolean; toggle?: boolean }) {
  return (
    <button className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-white/[0.04] transition-colors">
      <div className="text-tide-300">{icon}</div>
      <div className="text-xs flex-1 text-left">{label}</div>
      {value && <div className="text-[10px] text-white/50">{value}</div>}
      {link && <ExternalLink className="h-3 w-3 text-white/30" />}
      {toggle && <Toggle />}
    </button>
  )
}

function Toggle() {
  return (
    <div className="h-5 w-9 rounded-full bg-tide-400/80 relative">
      <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
    </div>
  )
}
